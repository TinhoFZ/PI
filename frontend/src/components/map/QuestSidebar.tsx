type Props = {
  quests: any[]
  onSelect: (quest: any) => void
}

export default function QuestSidebar({ quests, onSelect }: Props) {
  return (
    <div className="absolute left-0 top-0 h-full w-[260px] bg-snow shadow-lg z-1000 p-4 overflow-y-auto">
      
      <h2 className="font-bold text-lg mb-3">Missões</h2>

      <div className="space-y-3">
        {quests.map(q => (
          <div 
            key={q.id}
            onClick={() => onSelect(q)}
            className="cursor-pointer border rounded-xl p-3 hover:bg-gray-100 transition"
          >
            <p className="font-semibold">{q.name}</p>
            <p className="text-xs text-gray-500">
              {q.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}