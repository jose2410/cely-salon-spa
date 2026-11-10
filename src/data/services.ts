
import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 1,
    name: 'Corte & Estilizado',
    description: 'Un corte personalizado para realzar tu estilo.',
    price: 65,
    duration: 60,
    category: 'Cabello',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800'
  },
  {
    id: 2,
    name: 'Coloración Premium',
    description: 'Color, brillo y luminosidad para tu cabello.',
    price: 150,
    duration: 120,
    category: 'Coloración',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'
  },
  {
    id: 3,
    name: 'Tratamiento Capilar',
    description: 'Hidratación y nutrición para un cabello saludable.',
    price: 110,
    duration: 90,
    category: 'Tratamientos',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800'
  },
  {
    id: 4,
    name: 'Spa Facial',
    description: 'Un ritual de relajación y cuidado para tu piel.',
    price: 130,
    duration: 75,
    category: 'Spa',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
  }
]
