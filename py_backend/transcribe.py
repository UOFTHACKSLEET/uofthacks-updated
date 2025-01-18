from openai import OpenAI
import subprocess

def convert_mp4_to_mp3(mp4_file, mp3_file):
    '''
    Converts local mp4 file to mp3 file. MP4 file should be in same directory, mp3 file is the filename (e.g. 'output.mp3')
    '''
    command = ['ffmpeg', '-i', mp4_file, '-q:a', '0', '-map', 'a', mp3_file]
    subprocess.run(command, check=True)
    
def transcribe_audio(wav_file):
    client = OpenAI()
    audio_file = open(wav_file, "rb")
    transcription = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
    )
    
    return transcription.text