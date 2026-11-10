
import { ArrowUpRight } from 'lucide-react'
import { stylists } from '../data/stylists'

interface StylistsProps {
  onSelectStylist: (id: string) => void
}

export default function Stylists({
  onSelectStylist
}: StylistsProps) {
  return (
    <section id="estilistas" className="stylists-section">
      <div className="stylists-heading">
        <span className="section-label">NUESTRO EQUIPO</span>
        <h2>Las manos detrás de tu belleza</h2>
        <p>
          Conoce a nuestras especialistas, dedicadas a
          ofrecerte una experiencia única.
        </p>
      </div>

      <div className="stylists-grid">
        {stylists.map((stylist) => (
          <article className="stylist-card" key={stylist.id}>
            <div className="stylist-image">
              <img
                src={stylist.image}
                alt={`Retrato ilustrativo de ${stylist.name}`}
                loading="lazy"
              />
            </div>

            <div className="stylist-info">
              <h3>{stylist.name}</h3>
              <span>{stylist.specialty}</span>
              <p>{stylist.experience}</p>

              <a
                href="#reservas"
                onClick={() => onSelectStylist(String(stylist.id))}
              >
                Reservar con {stylist.name}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
