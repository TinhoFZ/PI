type Props = {
  quest: any
  onClose: () => void
}

export default function QuestPanel({ quest, onClose }: Props) {
  if (!quest) return null

  return (
    <div className="absolute right-4 top-4 bg-snow p-4 rounded-xl w-[280px] shadow-lg z-1000">
      
      <h2 className="font-bold text-dark text-lg mb-1">
        {quest.name}
      </h2>

      <p className="text-sm text-gray-600 mb-2">
        {quest.description}
      </p>

      <div className="bg-accent/10 border border-accent rounded-lg p-2 mb-3">
        <p className="text-sm font-semibold text-accent">
          🧭 {quest.treasureCount} tesouros escondidos nesta zona
        </p>
      </div>

      <p className="text-xs text-gray-500 italic mb-3">
        {quest.lore}
      </p>

      <h3 className="font-semibold mb-2">O que explorar:</h3>

      <div className="space-y-3 max-h-[250px] overflow-y-auto">
        {quest.attractions.map((a: any) => (
          <div key={a.id} className="border-b pb-2">
            
            <img 
              src={a.image} 
              alt={a.name}
              className="w-full h-[100px] object-cover rounded-md mb-1"
            />

            <p className="font-medium text-sm">{a.name}</p>
            <p className="text-xs text-gray-500">{a.description}</p>

          </div>
        ))}
      </div>

    </div>
  )
}