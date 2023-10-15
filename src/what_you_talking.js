import React, { useState, useEffect } from 'react';
import './what_you_talking.css'; // Import your CSS file
import PulseLoader from 'react-spinners/PulseLoader';
import avatar from './avatar.png'; // Import the avatar image
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function ChatBot() {
  const [selectedLines, setSelectedLines] = useState(1);
  const [smartWatch, setSmartWatch] = useState(0);
  const [jetpackHotspot, setJetpackHotspot] = useState(0);
  const [cellularTablet, setCellularTablet] = useState(0);
  const [userClassification, setUserClassification] = useState(null);
  const [mobileHotspot, setMobileHotspot] = useState("No Preference");
  const [cloudBackup, setCloudBackup] = useState("No Preference");
  const [connectivity, setConnectivity] = useState("No Preference");
  const [videoStreamingQuality, setVideoStreamingQuality] = useState("No Preference");
  const [selectedServices, setSelectedServices] = useState({
    "Verizon Fios Internet": false,
    "Apple Music": false,
    "Apple Arcade": false,
    "Google Play Pass": false,
    "Disney+": false,
    "Hulu": false,
    "ESPN+": false,
    "Apple TV+": false,
  });
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
  const [step, setStep] = useState(1);
  const [response, setResponse] = useState(null);


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
    if (step > 1 && step < 7) { // Only start the loader from step 3 onwards
      setLoading(true);
      const randomDelay = Math.random() * 1500 + 500;
      const timeout = setTimeout(() => {
        setLoading(false);
      }, randomDelay); // 1.5 seconds
      return () => clearTimeout(timeout); // Clear the timeout when component unmounts or when step changes
    }
    if (step === 7) {
      const getPlansAndProceed = async () => {
          try {
            console.log("chatgpt called")
              await fetchPlans(); // Assuming fetchPlans returns a Promise
              setStep(8);  // Move to the next step after fetchPlans completes
          } catch (error) {
              console.error('Error fetching plans:', error);
              // Handle error as needed
          }
      };
      getPlansAndProceed();
  }
  }, [step]);

  const handleSliderChange = (event) => {
    setSelectedLines(parseInt(event.target.value));
  };

  const handleNext = () => {
    if (step === 1) {
      console.log("STEP 1")
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

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setSelectedServices(prevServices => ({
      ...prevServices,
      [value]: checked
    }));
  };
  

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          numLines: selectedLines,
          numSmartWatches: smartWatch,  // Example values, adjust as needed
          numJetpackHotspots: jetpackHotspot,  // Example values, adjust as needed
          numCellularTablets: cellularTablet,  // Example values, adjust as needed
          qualifyingGroup: userClassification,  // Adjusted based on user input
          hotspotAmt: mobileHotspot,  // Example values, adjust as needed
          cloudBackup: cloudBackup,  // Example values, adjust as needed
          connectivity: connectivity,  // Example values, adjust as needed
          videoStreaming: videoStreamingQuality,  // Example values, adjust as needed
          serviceFios: selectedServices["Verizon Fios Internet"],  // Example values, adjust as needed
          serviceAppleMusic: selectedServices["Apple Music"],  // Example values, adjust as needed
          serviceAppleArcade: selectedServices["Apple Arcade"],  // Example values, adjust as needed
          serviceGooglePlayPass: selectedServices["Google Play Pass"],  // Example values, adjust as needed
          serviceDisney: selectedServices["Disney+"],  // Example values, adjust as needed
          streamingHulu: selectedServices["Hulu"],  // Example values, adjust as needed
          streamingESPN: selectedServices["ESPN+"],  // Example values, adjust as needed
          streamingAppleTV: selectedServices["Apple TV+"]  // Example values, adjust as needed
        })
      });


      const data = await response.json();
      const { message } = data;
      console.log(message)
      setResponse(message);

      // You might want to set the fetched data in the state if needed.
      // setPlans(data); 

    } catch (error) {
      console.error('There was an error fetching the plans:', error);
    } finally {
      setLoading(false);
      setStep(8);
    }
  };


  const getScreen = () => {
    if (loading && step !== 7) {
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
            {step > 1 && !loading && (<button onClick={handleBack} 
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
  <br />
    <input
      type="radio"
      name="classification"
      value="teacherNurseMilitary"
      checked={userClassification === 'teacherNurseMilitary'}
      onChange={() => handleUserClassification('teacherNurseMilitary')}
    />
    Teacher, Nurse, Military, First Responder
  </label>
  <br />
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
  <br />
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
  <br />
    <button onClick={handleNext} title="Proceed to the next step" className="small-button">
        Next <i className="fas fa-arrow-right"></i></button>
        {step > 1 && (<button onClick={handleBack} 
        title="Go back to the previous step" className="small-button">
        <i className="fas fa-arrow-left"></i> Back 
    </button>)}
</div>

      );
    } else if (step === 5) {
      return (
        <div className="chat-box">
          <p className="chat-message">{typedMessage}</p>
          <div>
            <p>Mobile Hotspot</p>
            <select value={mobileHotspot} onChange={e => setMobileHotspot(e.target.value)}>
              <option value="5GB">5GB</option>
              <option value="25GB">25GB</option>
              <option value="50GB">50GB</option>
              <option value="No Preference">No Preference / I do not know what this is</option>
            </select>
          </div>
          <div>
            <p>Cloud Backup</p>
            <select value={cloudBackup} onChange={e => setCloudBackup(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No Preference">No Preference / I do not know what this is</option>
            </select>
          </div>
          <div>
            <p>Connectivity</p>
            <select value={connectivity} onChange={e => setConnectivity(e.target.value)}>
              <option value="Yes">Yes (5G Ultra Wideband and Premium Network Access)</option>
              <option value="No">No (regular Unlimited 4G LTE / 5G)</option>
              <option value="No Preference">No Preference / I do not know what this is</option>
            </select>
          </div>
          <div>
            <p>Video Streaming Quality</p>
            <select value={videoStreamingQuality} onChange={e => setVideoStreamingQuality(e.target.value)}>
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="No Preference">No Preference / I do not know what this is</option>
            </select>
          </div>
            <button onClick={handleNext} title="Proceed to the next step" className="small-button">
                Next <i className="fas fa-arrow-right"></i></button>
                {step > 1 && (<button onClick={handleBack} 
                title="Go back to the previous step" className="small-button">
                <i className="fas fa-arrow-left"></i> Back 
            </button>)}
        </div>
      );
    } else if (step === 6) {
      return (
        <div className="chat-box">
          <p className="chat-message">Select all services you are interested in using or currently are subscribed to.</p>
          <label>
            <input
              type="checkbox"
              value="Verizon Fios Internet"
              checked={selectedServices["Verizon Fios Internet"]}
              onChange={handleServiceChange}
            />
            Verizon Fios Internet
          </label>

          <label>
            <input
              type="checkbox"
              value="Apple Music"
              checked={selectedServices["Apple Music"]}
              onChange={handleServiceChange}
            />
            Apple Music
          </label>

          <label>
            <input
              type="checkbox"
              value="Apple Arcade"
              checked={selectedServices["Apple Arcade"]}
              onChange={handleServiceChange}
            />
            Apple Arcade
          </label>

          <label>
            <input
              type="checkbox"
              value="Google Play Pass"
              checked={selectedServices["Google Play Pass"]}
              onChange={handleServiceChange}
            />
            Google Play Pass
          </label>

          <label>
            <input
              type="checkbox"
              value="Disney+"
              checked={selectedServices["Disney+"]}
              onChange={handleServiceChange}
            />
            Disney+
          </label>

          <label>
            <input
              type="checkbox"
              value="Hulu"
              checked={selectedServices["Hulu"]}
              onChange={handleServiceChange}
            />
            Hulu
          </label>

          <label>
            <input
              type="checkbox"
              value="ESPN+"
              checked={selectedServices["ESPN+"]}
              onChange={handleServiceChange}
            />
            ESPN+
          </label>

          <label>
            <input
              type="checkbox"
              value="Apple TV+"
              checked={selectedServices["Apple TV+"]}
              onChange={handleServiceChange}
            />
            Apple TV+
          </label>

          <button onClick={handleNext}>Next</button>
        </div>
      );
    } else if (step === 7) {
      return (
        <div className="chat-box">
          <p className="chat-message"><em>{typedMessage}</em></p>
          <PulseLoader color="red" loading={true} size={15} />
        </div>
      );
    } else if (step === 8) {
      return (
        <div className="chat-box">
            <h1>Martin's Recommendation</h1>
            <div className="chat-message" dangerouslySetInnerHTML={{ __html: response }} />
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