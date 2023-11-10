import React, { useState } from "react";
import "./App.css";
import { BeatLoader } from "react-spinners";
import { FiCopy } from "react-icons/fi";
import { HiSpeakerWave } from "react-icons/hi2"; // Added import for HiSpeakerWave
import { RxCross2 } from "react-icons/rx";
import Languages from "./Languages";
import axios from "axios";
const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Create an audio context

const App = () => {
  const [language, setLanguage] = useState("Afrikaans");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [translation, setTranslation] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setLanguage(e.target.value);
    setError("");
  };

  const translate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/get-translation?language=${language}&message=${message}`
      );

      const translatedText =
        response.data?.translation ||
        response.data ||
        "Translation not available";

      const correctedText = response.data?.corrected_sentence;

      setTranslation(translatedText);
      setCorrectedText(correctedText);
    } catch (error) {
      console.error("Error translating:", error);
      setError("Error occurred while translating. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      setError("Please enter the message.");
      return;
    }
    translate();
  };

  const handleCopy = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => displayNotification())
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const displayNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const speakTranslation = async (textToSpeak) => {
    console.log("Speaking translation:", textToSpeak);
    try {
      const response = await axios.get(
        `/get-translation-speech?translation=${teaxtToSpeak}`,
        {
          responseType: "arraybuffer", // Tell Axios to expect an ArrayBuffer response
        }
      );

      // const audioContext = new (window.AudioContext ||
      //   window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(response.data); // Decode the audio data

      const source = audioContext.createBufferSource(); // Create a new buffer source
      source.buffer = audioBuffer; // Set the buffer to the decoded audio data
      source.connect(audioContext.destination); // Connect the source to the speakers
      source.start(0);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <div className="container">
      <h1>Translation</h1>
      <p>Powered by OpenAI</p>

      <Languages handleInputChange={handleInputChange} />

      <form onSubmit={handleOnSubmit} className="translation-text-form">
        {message && (
          <RxCross2
            className="translation-text-removal-icon"
            onClick={() => setMessage("")}
          />
        )}
        <textarea
          name="message"
          placeholder="Type your message here.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        {error && <div className="error">{error}</div>}

        <button type="submit">Translate</button>
      </form>

      <div className="translation">
        {isLoading ? <BeatLoader size={12} color={"red"} /> : translation}
        {translation ? (
          <div className="translation-handle-buttons">
            <HiSpeakerWave
              className="speaker-button"
              onClick={() => speakTranslation(translation)}
            />
            <FiCopy
              className="copy-button"
              onClick={() => handleCopy(translation)}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {correctedText ? (
        <div className="corrected_text">
          <p>
            Correction:{" "}
            <span className="corrected-sentence">{correctedText}</span>
          </p>
          <div className="translation-handle-buttons">
            <HiSpeakerWave
              className="speaker-button"
              onClick={() => speakTranslation(correctedText)}
            />
            <FiCopy
              className="copy-button"
              onClick={() => handleCopy(correctedText)}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={`notification ${showNotification ? "active" : ""}`}>
        Copied to clipboard!
      </div>
    </div>
  );
};

export default App;
