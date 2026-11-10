
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { services } from '../data/services'

// Props que recibe el componente desde App.tsx
interface ServicesProps {
  onSelectService: (id: string) => void
}

export default function Services({
  onSelectService
}: ServicesProps) {
  return (
    <section id="servicios" className="services-section">
      <div className="services-heading">
        <span className="section-label">
          NUESTROS SERVICIOS
        </span>

        <h2>Experiencias diseñadas para ti</h2>

        <p>
          Descubre nuestros tratamientos de belleza
          y bienestar, pensados para resaltar
          tu esencia natural.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <div className="service-image">
              <img
                src={service.image}
                alt={service.name}
                loading="lazy"
              />
            </div>

            <div className="service-content">
              <span className="service-category">
                {service.category}
              </span>

              <h3>{service.name}</h3>
              <p>{service.description}</p>

              <div className="service-meta">
                <span>
                  <Clock3 size={15} />
                  {service.duration} min
                </span>

                <strong>
                  Desde S/ {service.price}
                </strong>
              </div>

              {/* Selecciona el servicio y abre reservas */}
              <a
                href="#reservas"
                className="service-link"
                onClick={() =>
                  onSelectService(String(service.id))
                }
              >
                Reservar servicio
                <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
