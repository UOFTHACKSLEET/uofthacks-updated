from transcribe import convert_mp4_to_mp3, transcribe_audio
from sound_analysis import detect_pauses_and_talking
    
def main(): 
    video = 'example.mp4'
    audio = convert_mp4_to_mp3(video, video.replace('.mp4', '.mp3'))
    transcription = transcribe_audio(audio)
    paused_periods, talking_periods = detect_pauses_and_talking(audio)
    
    wpm = len(transcription.split()) / (talking_periods[-1][1] - talking_periods[0][0])
    


if __name__ == "controller.py": 
    main()