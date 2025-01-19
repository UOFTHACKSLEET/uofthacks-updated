from transcribe import convert_mp4_to_mp3, transcribe_audio
from sound_analysis import detect_pauses_and_talking
from pdf_extract import extract_text_from_pdf
from openai import OpenAI


    
def main(): 
    client = OpenAI()
    
    video = 'example.mp4'
    pdf_path = "Zachary_Tianyi_Tang_resume.pdf"
    
    resume_text = extract_text_from_pdf(pdf_path)
    
    prompt_1 = f'''
    I have a paragraph which is missing some spaces. Can you add them where it is necessary, such that it's easier for chatgpt to understand it? 

    {resume_text}
    '''
    
    
    audio = convert_mp4_to_mp3(video, video.replace('.mp4', '.mp3'))
    transcription = transcribe_audio(audio)
    paused_periods, talking_periods = detect_pauses_and_talking(audio)
    
    wpm = len(transcription.split()) / (talking_periods[-1][1] - talking_periods[0][0])

    
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": prompt_1
            }
        ]
    )

    print(completion.choices[0].message)



if __name__ == '__main__': 
    main()