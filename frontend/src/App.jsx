import React, { useState } from "react";
import "./App.css";
import { BeatLoader } from "react-spinners";
import Languages from "./Languages";
import axios from "axios";

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

  const handleCopy = () => {
    navigator.clipboard
      .writeText(translation)
      .then(() => displayNotification())
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const displayNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="container">
      <h1>Translation</h1>
      <p>Powered by OpenAI</p>

      <Languages handleInputChange={handleInputChange} />

      <form onSubmit={handleOnSubmit}>
        <textarea
          name="message"
          placeholder="Type your message here.."
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        {error && <div className="error">{error}</div>}

        <button type="submit">Translate</button>
      </form>

      <div className="translation">
        <div className="copy-btn" onClick={handleCopy}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            />
          </svg>
        </div>
        {isLoading ? <BeatLoader size={12} color={"red"} /> : translation}
      </div>
      {correctedText ? (
        <div className="corrected_text">
          <p>
            Correction:{" "}
            <span className="corrected-sentence">{correctedText}</span>
          </p>
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
