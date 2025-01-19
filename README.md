# **Refyne**  

Refyne is an innovative application designed to help users prepare for behavioral interviews. By leveraging AI-assisted camera analysis, audio-visual feedback, and real-time metrics, Refyne provides actionable insights to improve interview performance.

---

## **Features**

- **AI-Assisted Camera Analysis**:  
  - Uses image recognition to guide camera positioning for optimal visibility.  

- **Audio-Visual Analysis**:  
  - Detects pauses in speech via a sound graph.  
  - Tracks key metrics, including speaking pace, filler word usage, and tone.  

- **Real-Time Feedback**:  
  - Offers live tips and suggestions based on analysis results.  

- **Resume-Integrated Tips**:  
  - Upload your resume to receive personalized guidance tailored to your background.  

- **Video Recording and Metrics**:  
  - Records practice sessions and visualizes performance data for review.

---

## **Technologies Used**

### Frontend:
- **Vite**: A fast build tool and development environment with hot module replacement.  
- **React**: For creating a responsive and dynamic user interface.  
- **JavaScript**: Powers the core functionality of the frontend.  

### Backend:
- **Flask**: A lightweight framework for API development and server-side processing.  
- **Python**: Handles backend logic and integration with AI-assisted analysis.

---

## **Installation and Setup**

Follow these steps to set up the project on your local machine.

### Prerequisites:
- **Node.js** (LTS version recommended)  
- **Python 3.7+**  
- **npm** (bundled with Node.js)  

### Steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repository/refine.git
   cd refine
   ```

2. **Set Up the Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   - This will start the Vite development server.  
   - Access the frontend at `http://localhost:5173`.  

3. **Set Up the Backend**:
   ```bash
   cd server
   pip install -r requirements.txt
   python3 main.py
   ```
   - This starts the Flask server, which will run on `http://127.0.0.1:5000`.

---

## **Usage**

1. **Start Both Servers**:
   - Run `npm run dev` in the `client` folder for the frontend.  
   - Run `python3 main.py` in the `server` folder for the backend.  

2. **Access the Application**:
   - Open the frontend in your browser at `http://localhost:5173`.  

3. **Explore Key Features**:
   - Upload your resume to receive personalized tips.  
   - Practice answering behavioral interview questions with video recording and analysis.  
   - Review real-time metrics, including filler word counts, speaking pace, and tone analysis.  
   - Adjust camera positioning with AI-guided recommendations.  

---

## **Project Architecture**

- **Frontend (Client)**:
  - Built with React and Vite for fast, modern UI development.
  - Communicates with the backend via RESTful API calls.  

- **Backend (Server)**:
  - Flask manages the API endpoints and handles analysis tasks, including audio-visual feedback and resume-based tips.

---

## **Contributing**

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.  
2. Create a new branch for your feature or bug fix:  
   ```bash
   git checkout -b feature-name
   ```  
3. Commit and push your changes:  
   ```bash
   git commit -m "Add feature-name"
   git push origin feature-name
   ```  
4. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Acknowledgments**

- Thanks to the development team for their efforts and creativity.  
- Special thanks to the creators of Flask, React, and Vite for the tools and frameworks that made this project possible.
```
