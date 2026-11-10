
import { useState } from 'react'
import Stylists from './components/Stylists'
import BookingForm from './components/BookingForm'
import Services from './components/Services'
import { CalendarDays, Sparkles, Menu, X } from 'lucide-react'
import './App.css'

function App() {
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [selectedStylistId, setSelectedStylistId] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)
  return (
    <>
      
      {/* HEADER */}
      <header className="header">
        <a
          href="#inicio"
          className="brand"
          onClick={closeMenu}
        >
          CELY
          <span>SALON SPA</span>
        </a>

        {/* Navegación para escritorio */}
        <nav className="navigation" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#estilistas">Estilistas</a>
          <a href="#reservas">Reservas</a>
        </nav>

        <a href="#reservas" className="header-button">
          Reservar cita
        </a>

        {/* Botón de menú móvil */}
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        {/* Navegación para móviles */}
        <nav
          id="mobile-navigation"
          className={`mobile-navigation ${isMenuOpen ? 'is-open' : ''}`}
          aria-label="Navegación móvil"
          inert={!isMenuOpen}
        >
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#estilistas" onClick={closeMenu}>Estilistas</a>
          <a href="#reservas" onClick={closeMenu}>Reservas</a>
        </nav>
      </header>


      <main>
        {/* SECCIÓN 1: INICIO */}
        <section id="inicio" className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <Sparkles size={16} />
              BELLEZA Y BIENESTAR
            </div>

            <h1>
              Donde tu belleza
              <em> encuentra su esencia.</em>
            </h1>

            <p>
              Descubre un espacio dedicado a realzar tu
              belleza natural. En Cely Salon Spa, cada
              visita es una experiencia única de cuidado,
              elegancia y bienestar.
            </p>

            <a href="#reservas" className="primary-button">
              <CalendarDays size={18} />
              Reserva tu experiencia
            </a>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200"
              alt="Salón de belleza elegante"
            />
          </div>
        </section>

        {/* SECCIÓN 2: BIENVENIDA */}
        <section className="welcome">
          <span className="section-label">
            BIENVENIDA A CELY SALON SPA
          </span>

          <h2>La belleza está en cada detalle</h2>

          <p>
            Un refugio de tranquilidad y elegancia,
            creado para que disfrutes de un momento
            dedicado exclusivamente a ti.
          </p>
        </section>

        {/* SECCIÓN 3: SERVICIOS */}
        <Services onSelectService={setSelectedServiceId} />

        {/* SECCIÓN 4: ESTILISTAS */}
        <Stylists onSelectStylist={setSelectedStylistId} />

        {/* SECCIÓN 5: RESERVAS */}
        <BookingForm
        selectedServiceId={selectedServiceId}
        selectedStylistId={selectedStylistId}
        onServiceChange={setSelectedServiceId}
        onStylistChange={setSelectedStylistId}
        />
      </main>

      {/* FOOTER */}
      <footer>
        <p>
          © 2026 Cely Salon Spa.
          Todos los derechos reservados.
        </p>
      </footer>
    </>
  )
}

export default App
