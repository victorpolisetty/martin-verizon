import React, { useState } from 'react';
import './what_you_talking.css'; // Import your CSS file

function ChatBot() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedLines, setSelectedLines] = useState(1); // Store the selected number of lines (default: 1)
  const [step, setStep] = useState(1); // Current step in the process
  const [smartWatch, setSmartWatch] = useState(0); // Number of Smart Watches
  const [jetpackHotspot, setJetpackHotspot] = useState(0); // Number of Jetpack Hotspots
  const [cellularTablet, setCellularTablet] = useState(0); // Number of Cellular Tablets

  const handleClick = () => {
    if (step < 2) {
      if (step === 1) {
        setShowOptions(true);
      }
      setStep(step + 1);
    } else {
      // Handle next step
      // For example, you can submit the data or navigate to the next step in your application
    }
  };

  const handleSliderChange = (event) => {
    setSelectedLines(parseInt(event.target.value));
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="ChatBot">
      <div className="chat-content">
        {step === 1 && showOptions ? (
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
          </div>
        ) : step === 2 ? (
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
          </div>
        ) : (
          <h1>Welcome! I am your personal Verizon agent Martin here to help you find the plan to match your needs.</h1>
        )}
        <button onClick={handleClick}>
          {step === 2 ? 'Submit' : 'Next'}
        </button>
        {step === 2 && (
          <button onClick={handleBack}>Back</button>
        )}
      </div>
    </div>
  );
}

export default ChatBot;
