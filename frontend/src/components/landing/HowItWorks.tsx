export default function HowItWorks() {
  return (
    <section className="bg-snow py-16 px-6 text-center">
      
      <h2 className="text-3xl font-bold text-dark mb-8">
        Como funciona
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

        <div>
          <h3 className="font-semibold text-lg mb-2">1. Escolha uma missão</h3>
          <p className="text-gray-600 text-sm">
            Explore o mapa e encontre zonas com tesouros escondidos.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">2. Explore o local</h3>
          <p className="text-gray-600 text-sm">
            Visite pontos turísticos reais e descubra pistas.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">3. Colete tesouros</h3>
          <p className="text-gray-600 text-sm">
            Complete objetivos e desbloqueie recompensas.
          </p>
        </div>

      </div>
    </section>
  )
}