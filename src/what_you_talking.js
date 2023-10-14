import React, { useState } from 'react';
import './what_you_talking.css'; // Import your CSS file

function ChatBot() {
  const [selectedLines, setSelectedLines] = useState(1);
  const [step, setStep] = useState(1);
  const [smartWatch, setSmartWatch] = useState(0);
  const [jetpackHotspot, setJetpackHotspot] = useState(0);
  const [cellularTablet, setCellularTablet] = useState(0);

  const handleSliderChange = (event) => {
    setSelectedLines(parseInt(event.target.value));
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getScreen = () => {
    if (step === 1) {
      return (
        <div>
          <h1>Welcome! I am your personal Verizon agent Martin here to help you find the plan to match your needs.</h1>
          <button onClick={handleNext}>Let's get started</button>
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <p>How many lines would you like to have on your plan?</p>
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
      );
    } else if (step === 3) {
      return (
        <div>
          <p>How many of each connected device are you including in your plan?</p>
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
    }
  };

  return (
    <div className="ChatBot">
      <div className="chat-content">
        {getScreen()}
        {step > 1 && (
          <button onClick={handleBack}>Back</button>
        )}
      </div>
    </div>
  );
}

export default ChatBot;
