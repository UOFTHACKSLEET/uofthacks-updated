from transcribe import convert_mp4_to_mp3, transcribe_audio
from sound_analysis import detect_pauses_and_talking
from pdf_extract import extract_text_from_pdf
from openai import OpenAI
from pprint import pprint
    
def main(): 
    client = OpenAI()
    
    # video = 'example.mp4'
    # pdf_path = "Zachary_Tianyi_Tang_resume.pdf"
    
    interview_text = "At UofT Hacks 12 our team tackled full-stack development for the first time with very limited experience."
    
    resume_text = ''' 
    U OF T Hacks (Refyne) - 2025
    Developed a React/Flask web app to assist job seekers in preparing for behavioral interviews.
    Implemented speech analysis features to provide tailored, resume-specific and industry-relevant feedback for practice interviews.
    Designed an intuitive user interface to streamline user interaction and improve accessibility.
    Collaborated in a cross-functional team to deliver a fully functional prototype within 36 hours.
    Achieved 1st place out of 500 participating teams at U of T Hacks 12.

    '''
    
    # prompt_1 = f'''
    # I have a paragraph which is missing some spaces. Can you add them where it is necessary, such that it's easier for chatgpt to understand it? 

    # {resume_text}
    # '''
    
    prompt_1 = '''
    Analyze the provided behavioral interview response using the STAR Method Coverage, Sentence Structure, Language Use, and Verbosity metrics. Use the resume excerpt to strengthen the response by incorporating measurable achievements and relevant metrics where applicable. PROVIDE DIRECT QUOTATIONS FROM THE RESUME. Provide the output in the specified JSON format with scores between 1 and 5 for each metric.

    Behavioral Interview Response:
    "string"

    Resume Excerpt:
    ["string"]

    Output Format:

    {
    "Metrics": {
        "STAR_Method_Coverage": {
        "score": "integer (1 to 5)",
        "strengths": ["string"],
        "improvements": ["string"]
        },
        "Sentence_Structure": {
        "score": "integer (1 to 5)",
        "strengths": ["string"],
        "improvements": ["string"]
        },
        "Language_Use": {
        "score": "integer (1 to 5)",
        "strengths": ["string"],
        "improvements": ["string"]
        },
        "Verbosity": {
        "score": "integer (1 to 5)",
        "strengths": ["string"],
        "improvements": ["string"]
        }
    },
    "Actionable_Tips": [
        "string"
    ],
    "Resume_Based_Feedback": [
        "string"
    ]
    ''' + f'\n THIS IS THE TEXT EXTRACTED FROM MY RESUME: {resume_text} \n \n THIS IS THE TEXT FROM MY PRACTICE INTERVIEW: {interview_text}'
    
    
    
    # audio = convert_mp4_to_mp3(video, video.replace('.mp4', '.mp3'))
    # transcription = transcribe_audio(audio)
    # paused_periods, talking_periods = detect_pauses_and_talking(audio)
    
    # wpm = len(transcription.split()) / (talking_periods[-1][1] - talking_periods[0][0])

    
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": prompt_1
            }
        ]
    )

    pprint(completion.choices[0].message)



if __name__ == '__main__': 
    main()