import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answer, question, feedback } = body;
    const prompt = `
      You are an expert technical interviewer with years of experience evaluating candidates.
      Your task is to assess the following interview response with careful consideration.

      INTERVIEW QUESTION:
      ${question}

      CANDIDATE'S ANSWER:
      ${answer}

      EVALUATION CRITERIA:
      ${feedback.join('\n')}

      Provide a comprehensive evaluation including:
      1. A numerical score (0-100) based on:
         - Technical accuracy
         - Clarity of explanation
         - Completeness of response
         - Understanding of core concepts
      2. Detailed feedback explaining the score, highlighting both strengths and areas for improvement
      3. Actionable suggestions for how the candidate could enhance their response

      REQUIRED: Format your response strictly as a JSON object:
      {
        "score": number (0-100),
        "feedback": "Detailed evaluation of the response, including justification for the score",
        "suggestions": "Specific, actionable recommendations for improvement"
      }

      Be thorough but concise. Focus on constructive criticism that helps the candidate improve.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || '');
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate answer' },
      { status: 500 }
    );
  }
}