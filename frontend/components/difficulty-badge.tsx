type Difficulty = 'Easy' | 'Medium' | 'Hard'

interface DifficultyBadgeProps {
  difficulty: Difficulty
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const colors = {
    Easy: 'bg-green-500 text-white',
    Medium: 'bg-yellow-500 text-white',
    Hard: 'bg-red-500 text-white'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[difficulty]}`}>
      {difficulty}
    </span>
  )
}

