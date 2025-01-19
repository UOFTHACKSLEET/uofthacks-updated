import React from "react";
import { useEffect, useState } from "react";
import "./Feedback.css";
import volumeGraph from "../assets/volume_graph.png";

const FeedbackPage = () => {
  const [dataArray, setDataArray] = useState([]);
  const [wpm, setWpm] = useState(0);
  const [tips, setTips] = useState([]);
  const [graph, setGraph] = useState("");
  // const [resume, setResume] = useState("");

  const resume = ["Reference your achievement: 'Achieved 1st place out of 500 teams', this will highlight the success of your efforts.",
        "Mention the technologies used such as 'React/Flask', to link directly to your resume expertise.",
        "Discuss the speech analysis feature or user interface design as part of the actions and results to demonstrate technical skills."]
  const metricsData = {
    "Metrics": {
        "STAR Method Rating": {
            "score": 3
        },
        "Sentence Structure": {
            "score": 3
        },
        "Language Use": {
            "score": 3
        },
        "Verbosity": {
            "score": 4
        }
    },
    "Actionable_Tips": [
        "Expand on the specific actions you took in tackling the full-stack development challenge.",
        "Explain what role you specifically played in achieving first place at U of T Hacks.",
        "Mention any particular skills or tools you learned or used during the hackathon that contributed to success."
    ],
    "Resume_Based_Feedback": [
        "Incorporate the achievement of '1st place out of 500 participating teams' to highlight the success and impact of your contributions.",
        "Discuss the speech analysis feature or user interface design as part of the actions and results to demonstrate technical skills."
    ]
  };

  const metricsArray = Object.keys(metricsData.Metrics).map(metric => ({
    metric,
    score: metricsData.Metrics[metric].score
  }));

  console.log(metricsArray);

  useEffect(() => {
    const fetchData = async () => {
      fetch('http://127.0.0.1:8000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        setDataArray(data.users); // Set the array state with the fetched data
        // setWpm(wpm) = data.wpm; 
        // setTips(tips) = data.tips; 
        // setResume(resume) = data.resume;  
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex-container">
        <div className="flex-item" style={{ border: "none", margin: 0}}>
          <h1 style={{ margin: 0}}>Feedback</h1>
        </div>
        <div className="flex-item" style={{ border: "none", margin: 0}}> 
          <h3 >Words per minute: 68</h3>
        </div>
        <div className="flex-item column-box">
            <div className="column-item">
            <h2>Metrics</h2>
            <ul>
            {metricsArray.map((metric, index) => (
              <li style={{ fontWeight: 'bold' }} key={index}>
                {metric.metric}: {metric.score}/5
              </li>
            ))}
            </ul>
            </div>
            <div className="column-item">
              <h2>Overall</h2>
              <h1>65%</h1>
            </div>
        </div>
        <div className="flex-item bg-item">
            <h2>Tips</h2>
            <p>
              To improve your response, further elaborate on the actions you took and the <span className='green'>results achieved</span>, ensuring they are clearly linked to your <span className='green'>personal contributions</span>. 
              Vary <span className='green'>sentence length</span> and <span className='green'>structure</span> to enhance engagement and clarity, and incorporate more <span className='green'>dynamic language</span> to convey enthusiasm and detail. 
              Additionally, provide specific details to fully capture the <span className='green'>magnitude of your achievement</span>, making your response more impactful and compelling.
            </p>

        </div>
        <div className="flex-item">
          <img src={volumeGraph} className="graph" />
          <p style={{ textAlign: 'center', margin: 0 }}>Longest pause: 1.76s</p>
        </div>
        <div className="flex-item bg-item">
          <h2>Resume-based tips</h2>
          <p><ul className='resume-tips'>
          {resume.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul></p>
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
