/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
// Replace the require statements with import statements
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB3cvgarJHu8L4O-p38SZ2G4JVCIZp_lkU");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  // const result = await chatSession.sendMessage(prompt);
  // console.log(result.response.text());
  // return response.text();
  try {
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text); // Log the response text
    return result.response.text; // Return the correct response text
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Propagate the error
  }
}

export default run;
