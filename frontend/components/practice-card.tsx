import Link from 'next/link'
import { DifficultyBadge } from './difficulty-badge'

interface PracticeCardProps {
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  description: string
  questionCount: number
  href: string
}

export function PracticeCard({
  title,
  difficulty,
  description,
  questionCount,
  href
}: PracticeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <DifficultyBadge difficulty={difficulty} />
      </div>
      <p className="text-gray-600 flex-grow">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">{questionCount} questions</span>
        <Link
          href={href}
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-800 transition-colors"
        >
          Start Practice
        </Link>
      </div>
    </div>
  )
}

