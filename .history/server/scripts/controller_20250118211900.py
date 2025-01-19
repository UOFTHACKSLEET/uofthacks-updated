from transcribe import convert_mp4_to_mp3, transcribe_audio
from sound_analysis import detect_pauses_and_talking
from pdf_extract import extract_text_from_pdf
import openai

prompt_1 = '''
    I have a paragraph which is missing some spaces. Can you add them where it is necessary, such that it's easier for chatgpt to understand it? 

    {resume_text}
    '''
    
def main(): 
    video = 'example.mp4'
    audio = convert_mp4_to_mp3(video, video.replace('.mp4', '.mp3'))
    transcription = transcribe_audio(audio)
    paused_periods, talking_periods = detect_pauses_and_talking(audio)
    
    wpm = len(transcription.split()) / (talking_periods[-1][1] - talking_periods[0][0])
    
    
    
    # Provide the path to your PDF file
    # pdf_path = "Zachary_Tianyi_Tang_resume.pdf"

    # # Extract text and process it with OpenAI
    # resume_text = extract_text_from_pdf(pdf_path)
    # print(resume_text)

    # prompt_1 = f'''
    # I have a paragraph which is missing some spaces. Can you add them where it is necessary, such that it's easier for chatgpt to understand it? 

    # {resume_text}
    # '''



if __name__ == "controller.py": 
    main()