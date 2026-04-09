export default function Features() {
  return (
    <section className="bg-primary text-snow py-16 px-6 text-center">
      
      <h2 className="text-3xl font-bold mb-8">
        Uma nova forma de viajar
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

        <div>
          <h3 className="font-semibold mb-2">🌍 Exploração real</h3>
          <p className="text-sm text-snow/70">
            Descubra lugares reais com um propósito.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">🎮 Gamificação</h3>
          <p className="text-sm text-snow/70">
            Missões, progresso e recompensas.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">🏆 Competição</h3>
          <p className="text-sm text-snow/70">
            Compare seu progresso com outros jogadores.
          </p>
        </div>

      </div>
    </section>
  )
}