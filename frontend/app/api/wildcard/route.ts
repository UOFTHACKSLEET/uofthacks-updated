import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
  try {
    // Get the difficulty level from the URL params
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level') || 'Easy';

    const prompt = `
      Generate a behavioral interview question for a software engineering position.
      The difficulty level should be: ${level}

      Follow these guidelines:
      - For Easy level: Focus on common scenarios and basic professional experiences
      - For Medium level: Include more complex team dynamics or technical decision-making
      - For Hard level: Focus on leadership, strategic thinking, and challenging situations

      Return it in this exact JSON format:
      {
        "id": A random number between 1-1000,
        "question": "The behavioral interview question",
        "level": "${level}",
        "feedback": [
          "Exactly 5 specific feedback points that evaluate the key aspects of a good answer",
          "Each point should be actionable and clear",
          "Include points about communication clarity",
          "Include points about problem-solving approach",
          "Include points about outcome and lessons learned"
        ]
      }

      Make the feedback points specific to evaluating the particular question you generate.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || '');
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate wildcard question' },
      { status: 500 }
    );
  }
}
