import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);

  // Inside ChatBot component:
  useEffect(() => {
    if (step > 2) { // Only start the loader from step 3 onwards
      setLoading(true);
      const randomDelay = Math.random() * 1500 + 500;
      const timeout = setTimeout(() => {
        setLoading(false);
      }, randomDelay); // 1.5 seconds
      return () => clearTimeout(timeout); // Clear the timeout when component unmounts or when step changes
    }
  }, [step]);

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
    if (loading) {
      return (
        <div className="chat-box">
          <p className="chat-message"><em>I'm processing something... please wait.</em></p>
          <PulseLoader color="red" loading={true} size={15} />
        </div>
      );
    } else if (step === 1) {
      return (
        <div className="chat-box">
          <p className="chat-message">Welcome! My name is Martin, and I'm going to ask you some questions to help you decide on a Verizon Unlimited phone plan.</p>
          <button onClick={handleNext}>Let's get started</button>
        </div>
      );
    } else if (step === 2) {
      return (
        <div className="chat-box">
          <p className="chat-message">Let's learn more about what you want! How many lines would you like to have on your plan?</p>
          <input
            type="range"
            min="1"
            max="5"
            value={selectedLines}
            onChange={handleSliderChange}
          />
          {selectedLines < 5 && <span>{selectedLines} Line(s)</span>}
          {selectedLines === 5 && <span>{selectedLines}+ Line(s)</span>}
          <button onClick={handleNext}>Next</button>
        </div>
      );
    } else if (step === 3) {
      return (
        <div className="chat-box">
          <p className="chat-message">How many of each connected device are you adding to your plan?</p>
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
      );
    } else if (step === 4) {
      return (
        <div className="chat-box">
          <p className="chat-message">Do you fall under any of the following?</p>
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
          <button onClick={handleNext}>Next</button>
        </div>
      );
    } else if (step === 5) {
      return (
        <div className="chat-box">
          <p className="chat-message">Do you prefer any of the upgrades in each of these categories below?</p>
          <div>
            <p>Mobile Hotspot</p>
            <select>
              <option value="5GB">5GB</option>
              <option value="25GB">25GB</option>
              <option value="50GB">50GB</option>
              <option value="No Preference">No Preference / I do not know what this is</option>
            </select>
          </div>
          <div>
            <p>Cloud Backup</p>
            <select>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No Preference">No Preference / I do not know what this is</option>
            </select>
          </div>
          <div>
            <p>Connectivity</p>
            <select>
              <option value="Yes">Yes (5G Ultra Wideband and Premium Network Access)</option>
              <option value="No">No (regular Unlimited 4G LTE / 5G)</option>
              <option value="No Preference">No Preference / I do not know what this is</option>
            </select>
          </div>
          <div>
            <p>Video Streaming Quality</p>
            <select>
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="No Preference">No Preference / I do not know what this is</option>
            </select>
          </div>
          <button onClick={handleNext}>Next</button>
        </div>
      );
    } else if (step === 6) {
      return (
        <div className="chat-box">
          <p className="chat-message">Select all services you are interested in using or currently are subscribed to.</p>
            <label>
              <input type="checkbox" value="Verizon Fios Internet" />
              Verizon Fios Internet
            </label>
            <label>
              <input type="checkbox" value="Apple Music" />
              Apple Music
            </label>
            <label>
              <input type="checkbox" value="Apple Arcade" />
              Apple Arcade
            </label>
            <label>
              <input type="checkbox" value="Google Play Pass" />
              Google Play Pass
            </label>
            <label>
              <input type="checkbox" value="Disney+" />
              Disney+
            </label>
            <label>
              <input type="checkbox" value="Hulu" />
              Hulu
            </label>
            <label>
              <input type="checkbox" value="ESPN+" />
              ESPN+
            </label>
            <label>
              <input type="checkbox" value="Apple TV+" />
              Apple TV+
            </label>
          <button onClick={handleNext}>Next</button>
        </div>
      );
    } else if (step === 7) {
      return (
        <div className="chat-box">
          <p className="chat-message"><em>I'm determining the best plans for you!</em></p>
          <PulseLoader color="red" loading={true} size={15} />
        </div>
      );
    }
  };

  return (
    <div className="ChatBot">
      <div className="chat-content">
        <div className="chat-container">
          <div className="avatar-container">
            <img src={avatar} alt="Avatar" className="avatar" />
          </div>
          {getScreen()}
          {step > 1 && <button onClick={handleBack}>Back</button>}
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
