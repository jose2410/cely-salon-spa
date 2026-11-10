
import { CalendarDays, Sparkles } from 'lucide-react'
import './App.css'

function App() {
  return (
    <>
      <header className="header">
        <a href="#inicio" className="brand">
          CELY
          <span>SALON SPA</span>
        </a>

        <nav className="navigation">
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#estilistas">Estilistas</a>
          <a href="#reservas">Reservas</a>
        </nav>

        <a href="#reservas" className="header-button">
          Reservar cita
        </a>
      </header>

      <main>
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

        <section className="welcome" id="servicios">
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

        <section className="coming-soon" id="estilistas">
          <h2>Conoce a nuestras especialistas</h2>
          <p>Muy pronto podrás conocer a nuestro equipo.</p>
        </section>

        <section className="coming-soon" id="reservas">
          <h2>Reserva tu cita</h2>
          <p>Próximamente podrás seleccionar tu servicio y estilista.</p>
        </section>
      </main>

      <footer>
        <p>© 2026 Cely Salon Spa. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}

export default App
