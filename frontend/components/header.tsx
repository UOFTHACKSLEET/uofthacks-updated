import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-bold text-purple-700 hover:text-purple-800 transition-colors"
        >
          InterviewPro
        </Link>
        <nav className="flex gap-6">
          <Link 
            href="/progress" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            My Progress
          </Link>
          <Link 
            href="/profile" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  )
}

