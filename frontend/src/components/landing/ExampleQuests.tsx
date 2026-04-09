import { quests } from '../../data/quests'

export default function ExampleQuests() {
  return (
    <section className="bg-snow py-16 px-6 text-center">
      
      <h2 className="text-3xl font-bold text-dark mb-8">
        Missões disponíveis
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        {quests.map(q => (
          <div 
            key={q.id}
            className="border rounded-xl p-4 text-left hover:shadow-md transition"
          >
            <h3 className="font-semibold mb-1">{q.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {q.description}
            </p>

            <p className="text-xs text-accent font-semibold">
              {q.treasureCount} tesouros escondidos
            </p>
          </div>
        ))}

      </div>
    </section>
  )
}