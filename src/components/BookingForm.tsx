
import { useState } from 'react'
import type { FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { services } from '../data/services'
import { stylists } from '../data/stylists'

const WHATSAPP_NUMBER = '51945859742'

const AVAILABLE_HOURS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00'
]

const CLOSING_TIME = 19 * 60

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function isSunday(date: string): boolean {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay() === 0
}

interface BookingFormProps {
  selectedServiceId: string
  selectedStylistId: string
  onServiceChange: (id: string) => void
  onStylistChange: (id: string) => void
}

function getPeruDateTime() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date())

  const value = (type: string) =>
    parts.find(part => part.type === type)?.value ?? ''

  return {
    date: `${value('year')}-${value('month')}-${value('day')}`,
    time: `${value('hour')}:${value('minute')}`
  }
}

export default function BookingForm({
  selectedServiceId,
  selectedStylistId,
  onServiceChange,
  onStylistChange
}: BookingFormProps) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const peruNow = getPeruDateTime()

  const selectedService = services.find(
  service => String(service.id) === selectedServiceId
)

const availableHours = AVAILABLE_HOURS.filter(hour => {
  if (!date || isSunday(date) || date < peruNow.date) {
    return false
  }

  const isFuture =
    date > peruNow.date ||
    (date === peruNow.date && hour > peruNow.time)

  const duration = selectedService?.duration ?? 0

  const finishesBeforeClosing =
    toMinutes(hour) + duration <= CLOSING_TIME

  return isFuture && finishesBeforeClosing
})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const service = services.find(
      item => String(item.id) === selectedServiceId
    )

    const stylist = stylists.find(
      item => String(item.id) === selectedStylistId
    )

    if (!service || !stylist || !name.trim() || !date || !time) {
      setError('Por favor, completa todos los campos.')
      return
    }

    const current = getPeruDateTime()

    if (
      date < current.date ||
      (date === current.date && time <= current.time)
    ) {
      setError('Selecciona una fecha y hora futura.')
      return
    }

    if (isSunday(date)) {
      setError(
        'No atendemos los domingos. Selecciona una fecha de lunes a sábado.'
      )
      return
    }

    if (!availableHours.includes(time)) {
      setError(
        'El horario seleccionado no está disponible para este servicio.'
      )
      return
    }

    if (!AVAILABLE_HOURS.includes(time)) {
      setError('Selecciona un horario válido.')
      return
    }

    const [year, month, day] = date.split('-')
    const formattedDate = `${day}/${month}/${year}`

    const message = [
      'Hola, Cely Salon Spa. Quisiera solicitar una cita.',
      '',
      `Nombre: ${name.trim()}`,
      `Servicio: ${service.name}`,
      `Estilista: ${stylist.name}`,
      `Fecha: ${formattedDate}`,
      `Hora: ${time} (hora de Perú)`,
      `Duración estimada: ${service.duration} minutos`,
      `Precio referencial: Desde S/ ${service.price}`,
      '',
      '¿Podrían confirmarme la disponibilidad?',
      'Entiendo que la cita está pendiente de confirmación.'
    ].join('\n')

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    window.location.assign(url)
  }

  return (
    <section id="reservas" className="booking-section">
      <div className="booking-heading">
        <span className="section-label">
          RESERVA TU MOMENTO
        </span>

        <h2>Tu experiencia comienza aquí</h2>

        <p>
          Completa tus datos y solicita una cita
          por WhatsApp.
        </p>
        <p className="booking-hours">
          Horario de atención: lunes a sábado,
          de 9:00 a. m. a 7:00 p. m.
          <br />
          Domingos cerrado.
        </p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label htmlFor="booking-name">
          Nombre completo
        </label>

        <input
          id="booking-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ingresa tu nombre completo"
          maxLength={100}
          required
        />

        <label htmlFor="booking-service">
          Servicio
        </label>

        <select
          id="booking-service"
          value={selectedServiceId}
          onChange={e => {
          onServiceChange(e.target.value)
          setTime('')
        }}
          required
        >
          <option value="">Selecciona un servicio</option>

          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name} — Desde S/ {service.price}
            </option>
          ))}
        </select>

        <label htmlFor="booking-stylist">
          Estilista
        </label>

        <select
          id="booking-stylist"
          value={selectedStylistId}
          onChange={e => onStylistChange(e.target.value)}
          required
        >
          <option value="">Selecciona una estilista</option>

          {stylists.map(stylist => (
            <option key={stylist.id} value={stylist.id}>
              {stylist.name}
            </option>
          ))}
        </select>

        <div className="booking-fields">
          <div>
            <label htmlFor="booking-date">Fecha</label>

            <input
              id="booking-date"
              type="date"
              min={peruNow.date}
              value={date}
              onChange={e => {
                setDate(e.target.value)
                setTime('')
              }}
              required
            />
          </div>

          <div>
            <label htmlFor="booking-time">Hora</label>

            <select
              id="booking-time"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            >
              <option value="">Selecciona un horario</option>

              {availableHours.map(hour => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="booking-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="booking-submit">
          <MessageCircle size={18} />
          Solicitar cita por WhatsApp
        </button>

        <p className="booking-note">
          Esta solicitud no confirma una reserva.
          Nuestro equipo verificará la disponibilidad
          y te responderá por WhatsApp.
        </p>
      </form>
    </section>
  )
}
