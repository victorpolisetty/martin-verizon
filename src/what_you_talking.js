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
  const [typedMessage, setTypedMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const typeMessage = (message) => {
    setTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        setTypedMessage((prevTypedMessage) => prevTypedMessage + message[index]);
        index++;
      } else {
        clearInterval(interval);
        setTyping(false);
      }
    }, 25); // You can adjust the speed of typing here
    return interval; // Return interval ID to clear it if needed
  };

  useEffect(() => {
    let currentMessage = "";
    if (!loading) {
      setTypedMessage("");
      switch (step) {
        case 1:
          currentMessage = "Welcome! My name is Martin, and I'm going to ask you some questions to help you decide on a Verizon Unlimited phone plan.";
          break;
      }
    }
    const intervalID = typeMessage(currentMessage);
    return () => {
      clearInterval(intervalID);
    };
  }, [step]);

  useEffect(() => {
    if (!loading && step > 1) {
      setTypedMessage("");
        let currentMessage = "";
        switch (step) {
          case 2:
            currentMessage = "Let's learn more about what you want! How many lines would you like to have on your plan?";
            break;
          case 3:
            currentMessage = "How many of each connected device are you adding to your plan?"
            break;
          case 4:
            currentMessage = "Do you fall under any of the following?"
            break;
          case 5:
            currentMessage = "Do you prefer any of the upgrades in each of these categories below?"
            break;
          case 6:
            currentMessage = "Select all services you are interested in using or currently are subscribed to."
            break;
          case 7:
            currentMessage = "I'm determining the best plans for you!"
            break;
        }
        const intervalID = typeMessage(currentMessage);
        return () => {
            clearInterval(intervalID);
        };
    }
}, [loading]); // Only watch the loading state here

  useEffect(() => {
    if (step > 1) { // Only start the loader from step 3 onwards
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
      setStep(5);
    } else if (step === 5) {
      setStep(6);
    } else if (step === 6) {
      setStep(7);
    } else if (step === 7) {
      setStep(8);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setTypedMessage("");
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
          <p className="chat-message">{typedMessage}</p>
          <button onClick={handleNext} className="small-button">Let's get started</button>
        </div>
      );
    } else if (step === 2) {
      return (
        <div className="chat-box">
          <p className="chat-message">{typedMessage}</p>
          <input
            type="range"
            min="1"
            max="5"
            value={selectedLines}
            onChange={handleSliderChange}
          />
          {selectedLines < 5 && <span>{selectedLines} Line(s)</span>}
          {selectedLines === 5 && <span>{selectedLines}+ Line(s)</span>}
          <button onClick={handleNext} title="Proceed to the next step" className="small-button">
            Next <i className="fas fa-arrow-right"></i></button>
            {step > 1 && (<button onClick={handleBack} 
            title="Go back to the previous step" className="small-button">
            <i className="fas fa-arrow-left"></i> Back 
          </button>)}
        </div>
      );
    } else if (step === 3) {
      return (
        <div className="chat-box">
          <p className="chat-message">{typedMessage}</p>
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
          <button onClick={handleNext} title="Proceed to the next step" className="small-button">
            Next <i className="fas fa-arrow-right"></i></button>
            {step > 1 && (<button onClick={handleBack} 
            title="Go back to the previous step" className="small-button">
            <i className="fas fa-arrow-left"></i> Back 
          </button>)}
        </div>
      );
    } else if (step === 4) {
      return (
        <div className="chat-box">
          <p className="chat-message">{typedMessage}</p>
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
            <button onClick={handleNext} title="Proceed to the next step">
                Next <i className="fas fa-arrow-right"></i></button>
                {step > 1 && <button onClick={handleBack} 
                title="Go back to the previous step">
                <i className="fas fa-arrow-left"></i> Back
            </button>}
        </div>
      );
    } else if (step === 5) {
      return (
        <div className="chat-box">
          <p className="chat-message">{typedMessage}</p>
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
            <button onClick={handleNext} title="Proceed to the next step">
                Next <i className="fas fa-arrow-right"></i></button>
                {step > 1 && <button onClick={handleBack} 
                title="Go back to the previous step">
                <i className="fas fa-arrow-left"></i> Back
            </button>}
        </div>
      );
    } else if (step === 6) {
      return (
        <div className="chat-box">
          <p className="chat-message">{typedMessage}</p>
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
            <button onClick={handleNext} title="Proceed to the next step">
                Next <i className="fas fa-arrow-right"></i></button>
                {step > 1 && step < 7 && <button onClick={handleBack} 
                title="Go back to the previous step">
                <i className="fas fa-arrow-left"></i> Back
            </button>}
        </div>
      );
    } else if (step === 7) {
      return (
        <div className="chat-box">
          <p className="chat-message"><em>{typedMessage}</em></p>
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
        </div>
      </div>
    </div>
  );
}

export default ChatBot;