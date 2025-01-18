import cv2
import numpy as np

'''
At the moment, draws bounding boxes around detected faces and displays the width and height ratios of the faces in relation to the camera output height and width, and calculates average for as long as the user is recognized. Need to just output this average and tell user to be larger / smaller. 
'''

# Load the pre-trained Haar Cascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Start video capture (0 is the default camera)
cap = cv2.VideoCapture(0)

# Arrays to store width and height ratios
width_ratios = []
height_ratios = []

while True:
    # Read each frame from the webcam
    ret, frame = cap.read()
    
    if not ret:
        break

    # Get the dimensions of the camera frame (height and width)
    frame_height, frame_width = frame.shape[:2]

    # Convert the frame to grayscale (Haar Cascade works on grayscale images)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Detect faces in the image
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    # Draw bounding boxes around the detected faces and show ratio text
    for (x, y, w, h) in faces:
        # Draw the bounding box
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Calculate the ratio of the face's width and height relative to the frame size
        width_ratio = w / frame_width
        height_ratio = h / frame_height

        # Add the ratios to the respective arrays
        width_ratios.append(width_ratio)
        height_ratios.append(height_ratio)

        # Create text with the ratios
        text = f"Width: {width_ratio:.2f}, Height: {height_ratio:.2f}"

        # Display the text next to the bounding box
        cv2.putText(frame, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Display the frame with bounding boxes and text
    cv2.imshow('Face Detection with Ratios', frame)
    
    # Press 'q' to quit the program
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture object and close any open windows
cap.release()
cv2.destroyAllWindows()

# Calculate and print the averages of width and height ratios
if len(width_ratios) > 0:
    avg_width_ratio = np.mean(width_ratios)
    avg_height_ratio = np.mean(height_ratios)
    print(f"Average Width Ratio: {avg_width_ratio:.2f}")
    print(f"Average Height Ratio: {avg_height_ratio:.2f}")
else:
    print("No faces detected during the session.")
