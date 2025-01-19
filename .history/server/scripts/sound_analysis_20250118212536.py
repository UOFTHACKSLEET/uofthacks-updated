import numpy as np
from pydub import AudioSegment
import matplotlib.pyplot as plt
from scipy.ndimage import uniform_filter1d
from tqdm import tqdm

def detect_pauses_and_talking(file_path, threshold=-70, min_pause_duration=1, plot_smoothed=True):
    """
    Detect pauses and talking intervals in an audio file based on a decibel threshold and minimum duration. SMALLER THE MINIMUM DURATION, THE MORE ACCURATE IT DETECTS PAUSES BUT ALSO PICKS UP FAKE PAUSES WAY MORE. 

    Parameters:
        file_path (str): Path to the audio file.
        threshold (float): Decibel level below which is considered a pause.
        min_pause_duration (float): Minimum duration of a pause in seconds.
        plot_smoothed (bool): Whether to plot smoothed decibels.

    Returns:
        Tuple[List[Tuple[float, float]], List[Tuple[float, float]]]: Pauses and talking intervals.
    """
    # Load the audio file
    audio = AudioSegment.from_mp3(file_path)
    samples = np.array(audio.get_array_of_samples()).astype(np.float32)
    sr = audio.frame_rate  # Sampling rate
    
    # Normalize samples
    max_amplitude = 2 ** (audio.sample_width * 8 - 1)
    samples /= max_amplitude
    
    # Calculate decibels
    decibels = 20 * np.log10(np.abs(samples) + 1e-6)
    
    # Smooth decibel signal
    smoothed_decibels = uniform_filter1d(decibels, size=1000)
    
    # Detect pauses below the threshold
    is_pause = smoothed_decibels < threshold
    time = np.linspace(0, len(samples) / sr, num=len(samples))
    
    print(decibels)
    print(time)
    
    # Initialize pause detection variables
    min_pause_samples = int(min_pause_duration * sr)
    pauses = []
    start_idx = None
    
    # Use tqdm to show progress
    for i in tqdm(range(len(is_pause)), desc="Processing Audio"):
        if is_pause[i]:
            if start_idx is None:
                start_idx = i
        else:
            if start_idx is not None and (i - start_idx) >= min_pause_samples:
                pauses.append((start_idx / sr, i / sr))  # Convert to seconds
                start_idx = None
    
    # Handle case where the last segment is a pause
    if start_idx is not None and (len(is_pause) - start_idx) >= min_pause_samples:
        pauses.append((start_idx / sr, len(is_pause) / sr))
    
    # Calculate talking intervals as the complement of pauses
    talking = []
    last_pause_end = 0
    for pause_start, pause_end in pauses:
        if pause_start > last_pause_end:
            talking.append((last_pause_end, pause_start))
        last_pause_end = pause_end
    if last_pause_end < time[-1]:
        talking.append((last_pause_end, time[-1]))
    
    # Plot the decibels
    # plt.figure(figsize=(10, 4))
    # plt.plot(time, smoothed_decibels, label="Smoothed Decibel Levels", linewidth=0.5)
    # for start, end in pauses:
    #     plt.axvspan(start, end, color='red', alpha=0.3, label="Pause" if 'Pause' not in plt.gca().get_legend_handles_labels()[1] else "")
    # for start, end in talking:
    #     plt.axvspan(start, end, color='green', alpha=0.3, label="Talking" if 'Talking' not in plt.gca().get_legend_handles_labels()[1] else "")
    # plt.axhline(threshold, color='blue', linestyle='--', label=f"Threshold ({threshold} dB)")
    # plt.xlabel("Time (s)")
    # plt.ylabel("Decibels (dB)")
    # plt.title("Smoothed Decibel Levels with Pauses and Talking Intervals")
    # plt.legend()
    # plt.tight_layout()
    # plt.show()
    
    # if plot_smoothed:
    #     # Plot only the smoothed decibels
    #     plt.figure(figsize=(10, 4))
    #     plt.plot(time, smoothed_decibels, label="Smoothed Decibel Levels", linewidth=0.5, color="blue")
    #     plt.axhline(threshold, color='green', linestyle='--', label=f"Threshold ({threshold} dB)")
    #     plt.xlabel("Time (s)")
    #     plt.ylabel("Decibels (dB)")
    #     plt.title("Smoothed Decibel Levels")
    #     plt.legend()
    #     plt.tight_layout()
    #     plt.show()
    
    return pauses, talking

# Example usage
# pauses, talking = detect_pauses_and_talking("output.mp3", threshold=-70, min_pause_duration=0.2, plot_smoothed=False)
# print("Detected pauses:", pauses)
# print("Detected talking intervals:", talking)
