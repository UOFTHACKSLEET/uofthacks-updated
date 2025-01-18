import { PracticeCard } from '@/components/practice-card'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 sm:text-5xl">
          Master Your Interview Skills
        </h1>
        <p className="text-xl text-gray-600">
          Practice behavioral interview questions and get instant feedback to improve your responses.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <PracticeCard
          title="Entry Level"
          difficulty="Easy"
          description="Perfect for beginners. Basic behavioral questions to build confidence."
          questionCount={20}
          href="/practice/entry-level"
        />
        <PracticeCard
          title="Professional"
          difficulty="Medium"
          description="Intermediate questions for experienced professionals."
          questionCount={30}
          href="/practice/professional"
        />
        <PracticeCard
          title="Leadership"
          difficulty="Hard"
          description="Advanced scenarios for management and leadership roles."
          questionCount={25}
          href="/practice/leadership"
        />
      </div>
    </div>
  )
}

