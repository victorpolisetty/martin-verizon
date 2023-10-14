import React, { useState } from 'react';
import './what_you_talking.css'; // Import your CSS file
import PulseLoader from 'react-spinners/PulseLoader';
import avatar from './avatar.png'; // Import the avatar image

function ChatBot() {
  const [selectedLines, setSelectedLines] = useState(1);
  const [step, setStep] = useState(1);
  const [smartWatch, setSmartWatch] = useState(0);
  const [jetpackHotspot, setJetpackHotspot] = useState(0);
  const [cellularTablet, setCellularTablet] = useState(0);
  const [userClassification, setUserClassification] = useState(null);

  const handleSliderChange = (event) => {
    setSelectedLines(parseInt(event.target.value));
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      // Handle the transition to the next step (step 5)
      setStep(5);
    } else if (step === 5) {
      // Handle the transition to the next step (step 6)
      setStep(6);
    } else if (step === 6) {
      // Handle the transition to the next step (step 7)
      setStep(7);
    } else if (step === 7) {
      // Handle the transition to the next step (step 8)
      setStep(8);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleUserClassification = (classification) => {
    setUserClassification(classification);
  };

  const getScreen = () => {
    if (step === 1) {
      return (
        <div>
          <div className="chat-container">
            <div className="avatar-container">
              <img src={avatar} alt="Avatar" className="avatar" />
            </div>
            <div className="chat-box">
              <h1 className="chat-message">Welcome! I am your personal Verizon agent Martin here to help you find the plan to match your needs.</h1>
              <button onClick={handleNext}>Let's get started</button>
            </div>
          </div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <div className="chat-container">
            <div className="avatar-container">
              <img src={avatar} alt="Avatar" className="avatar" />
            </div>
            <div className="chat-box">
              <p className="chat-message">Let's learn more about what you want! How many lines would you like to have on your plan?</p>
              <input
                type="range"
                min="1"
                max="5"
                value={selectedLines}
                onChange={handleSliderChange}
              />
              <span>{selectedLines} Line(s)</span>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        </div>
      );
    } else if (step === 3) {
      return (
        <div>
          <div className="chat-container">
            <div className="avatar-container">
              <img src={avatar} alt="Avatar" className="avatar" />
            </div>
            <div className="chat-box">
              <p className="chat-message">How many of each connected device are you including in your plan?</p>
              <div>
                <p>Smart Watch</p>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={smartWatch}
                  onChange={(e) => setSmartWatch(parseInt(e.target.value))}
                />
                <span>{smartWatch}</span>
              </div>
              <div>
                <p>Jetpack Hotspot</p>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={jetpackHotspot}
                  onChange={(e) => setJetpackHotspot(parseInt(e.target.value))}
                />
                <span>{jetpackHotspot}</span>
              </div>
              <div>
                <p>Cellular Tablet</p>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={cellularTablet}
                  onChange={(e) => setCellularTablet(parseInt(e.target.value))}
                />
                <span>{cellularTablet}</span>
              </div>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        </div>
      );
    } else if (step === 4) {
      return (
        <div>
          <div className="chat-container">
            <div className="avatar-container">
              <img src={avatar} alt="Avatar" className="avatar" />
            </div>
            <div className="chat-box">
              <p className="chat-message">Do you fall under any of the following?</p>
              <ul className="no-bullet-points">
                <li>
                  <label>
                    <input
                      type="radio"
                      name="classification"
                      value="teacherNurseMilitary"
                      checked={userClassification === 'teacherNurseMilitary'}
                      onChange={() => handleUserClassification('teacherNurseMilitary')}
                    />
                    Teacher, Nurse, Military, First Responder
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="classification"
                      value="collegeStudent"
                      checked={userClassification === 'collegeStudent'}
                      onChange={() => handleUserClassification('collegeStudent')}
                    />
                    College Student
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="classification"
                      value="no"
                      checked={userClassification === 'no'}
                      onChange={() => handleUserClassification('no')}
                    />
                    No
                  </label>
                </li>
              </ul>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        </div>
      );
    }
    // Add similar blocks for other steps
    else if (step === 7) {
      return (
        <div>
          <div className="chat-container">
            <div className="avatar-container">
              <img src={avatar} alt="Avatar" className="avatar" />
            </div>
            <div className="chat-box">
              <h1 className="chat-message">Calculating the best plan fit for you!</h1>
              <PulseLoader color="red" loading={true} size={15} />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="ChatBot">
      <div className="chat-content">{getScreen()}</div>
      {step > 1 && <button onClick={handleBack}>Back</button>}
    </div>
  );
}

export default ChatBot;
