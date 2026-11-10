
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { CalendarDays, MessageCircle } from 'lucide-react'
import { services } from '../data/services'
import { stylists } from '../data/stylists'

const WHATSAPP_NUMBER = '+51 945 859 742' // Agregar número real con código 51

export default function BookingForm() {
  const [serviceId, setServiceId] = useState('')
  const [stylistId, setStylistId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const updateStylist = () => {
      setStylistId(sessionStorage.getItem('selectedStylist') || '')
    }

    updateStylist()
    window.addEventListener('stylist-selected', updateStylist)

    return () => {
      window.removeEventListener('stylist-selected', updateStylist)
    }
  }, [])

  const today = new Date()
  const localDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const service = services.find(s => s.id === Number(serviceId))
    const stylist = stylists.find(s => s.id === Number(stylistId))

    if (!service || !stylist || !name.trim() || !date || !time) {
      return
    }

    if (date < localDate) {
      alert('Selecciona una fecha válida.')
      return
    }

    const message = [
      'Hola, Cely Salon Spa. Quisiera solicitar una cita.',
      '',
      `Nombre: ${name.trim()}`,
      `Servicio: ${service.name}`,
      `Estilista: ${stylist.name}`,
      `Fecha: ${date}`,
      `Hora: ${time}`,
      `Precio referencial: S/ ${service.price}`,
      '',
      '¿Podrían confirmarme la disponibilidad?'
    ].join('\n')

    if (!WHATSAPP_NUMBER) {
      navigator.clipboard.writeText(message)
        .then(() => alert('Solicitud copiada. Falta configurar el WhatsApp del salón.'))
        .catch(() => alert('Falta configurar el WhatsApp del salón.'))
      return
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="reservas" className="booking-section">
      <div className="booking-heading">
        <span className="section-label">RESERVA TU MOMENTO</span>
        <h2>Tu experiencia comienza aquí</h2>
        <p>Selecciona tu servicio y solicita una cita.</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label htmlFor="booking-name">Nombre completo</label>
        <input
          id="booking-name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Tu nombre"
          required
        />

        <label htmlFor="booking-service">Servicio</label>
        <select
          id="booking-service"
          value={serviceId}
          onChange={e => setServiceId(e.target.value)}
          required
        >
          <option value="">Selecciona un servicio</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name} — S/ {service.price}
            </option>
          ))}
        </select>

        <label htmlFor="booking-stylist">Estilista</label>
        <select
          id="booking-stylist"
          value={stylistId}
          onChange={e => setStylistId(e.target.value)}
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
              min={localDate}
              value={date}
              onChange={e => setDate(e.target.value)}
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
              {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="booking-submit">
          {WHATSAPP_NUMBER
            ? <MessageCircle size={18} />
            : <CalendarDays size={18} />}
          {WHATSAPP_NUMBER
            ? 'Solicitar cita por WhatsApp'
            : 'Copiar solicitud de cita'}
        </button>

        <p className="booking-note">
          La solicitud no confirma una reserva. Nuestro equipo
          verificará la disponibilidad antes de confirmarla.
        </p>
      </form>
    </section>
  )
}
