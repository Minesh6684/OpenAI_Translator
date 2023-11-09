const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv").config();
const colors = require("colors");
const OpenAI = require("openai");
const path = require("path");

PORT = process.env.PORT || 5001;

const app = express();

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_KEY,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/get-translation", async (req, res) => {
  const language = req.query.language;
  const message = req.query.message;
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You will be provided with statements or word/s in a specific language. 
                  1. take your time and detect the specific language. 
                  2. Correct the input sentence/word structure gramatically and spelling 
                    if there is any mistake, in that language and tranfer it to that language letters. 
                  3. provide the translation to ${language}. 
                  4.If there is any offensive input is passed on, you can distribute the warning to 
                    the user about that in the output format i mentioned in the 5th point according to 
                    your intelligence but strictly follow the output format mentioned in the 5th point.   
                  5. Strictly Use json format as an output as {corrected_sentence: "input language: your corrected and 
                    transfered sentence structure/word into input language", translation: "your answer"}`,
      },
      {
        role: "user",
        content: `${message}`,
      },
    ],
    temperature: 0,
    max_tokens: 100,
  });

  let responseContent;
  try {
    responseContent = JSON.parse(response.choices[0].message.content);
  } catch (error) {
    // Handle parsing error, or fallback to the content as it is
    console.error("Error parsing JSON content:", error);
    responseContent = response.choices[0].message.content;
  }

  res.status(200).json(responseContent);
});

const speechFile = path.resolve("./speech.mp3");

app.use("/get-translation-speech", async (req, res) => {
  const translation = req.query.translation;
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: translation,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    res.status(200).send(buffer);
  } catch (error) {
    console.error("Error generating audio:", error);
    res.status(500).send("Error generating audio.");
  }
});

// Frontend;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please Activate Production"));
}

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
