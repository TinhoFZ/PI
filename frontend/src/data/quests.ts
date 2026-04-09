import marcoZero from '../assets/images/marco-zero.jpg'
import pacoFrevo from '../assets/images/paco-frevo.jpg'
import bomJesus from '../assets/images/bom-jesus.jpg'
import casteloPrincipal from '../assets/images/castelo-principal.jpg'
import galeriaArmas from '../assets/images/galeria-armas.jpg'
import jardinsInstituto from '../assets/images/jardins-instituto.jpg'

export const quests = [
  {
    id: 1,
    name: "Recife Antigo",
    description: "Descubra o coração histórico do Recife, com cultura, arte e história em cada esquina.",
    lore: "Dizem que antigas riquezas culturais foram deixadas por viajantes e artistas ao longo dos séculos. Apenas exploradores atentos conseguem encontrá-las.",
    treasureCount: 3,
    zone: [
      [-8.0631, -34.8710],
      [-8.0620, -34.8735],
      [-8.0650, -34.8745],
      [-8.0665, -34.8720],
    ],
    attractions: [
      {
        id: 1,
        name: "Marco Zero",
        description: "O ponto inicial da cidade do Recife, com vista para o mar e eventos culturais frequentes.",
        image: marcoZero,
        position: [-8.0632, -34.8711],
      },
      {
        id: 2,
        name: "Paço do Frevo",
        description: "Museu interativo dedicado ao frevo, patrimônio cultural de Pernambuco.",
        image: pacoFrevo,
        position: [-8.0627, -34.8725],
      },
      {
        id: 3,
        name: "Rua do Bom Jesus",
        description: "Uma das ruas mais bonitas do mundo, cheia de história e arquitetura colorida.",
        image: bomJesus,
        position: [-8.0638, -34.8738],
      }
    ]
  },

  {
    id: 2,
    name: "Instituto Ricardo Brennand",
    description: "Explore um dos museus mais impressionantes do Brasil, cercado por jardins e história medieval.",
    lore: "Entre muros que lembram castelos europeus, histórias de conquistas, batalhas e arte foram preservadas ao longo do tempo. Dizem que apenas exploradores curiosos conseguem revelar todos os segredos escondidos neste lugar.",
    treasureCount: 3,
    zone: [
      [-8.0625, -34.9580],
      [-8.0610, -34.9605],
      [-8.0640, -34.9615],
      [-8.0655, -34.9590],
    ],
    attractions: [
      {
        id: 4,
        name: "Castelo Principal",
        description: "Inspirado em castelos europeus, abriga coleções históricas e obras de arte raras.",
        image: casteloPrincipal,
        position: [-8.0635, -34.9600],
      },
      {
        id: 5,
        name: "Galeria de Armas",
        description: "Uma das maiores coleções de armas brancas do mundo.",
        image: galeriaArmas,
        position: [-8.0630, -34.9595],
      },
      {
        id: 6,
        name: "Jardins do Instituto",
        description: "Área verde tranquila com esculturas e caminhos perfeitos para explorar.",
        image: jardinsInstituto,
        position: [-8.0628, -34.9608],
      }
    ]
  }
]