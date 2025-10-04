// index.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const NASA_API_KEY = "FcXNtjSSRI4yMeT2nlOvbb5AP6dGguVPnSGehoMP";

// Handle Dialogflow webhook requests
app.post("/webhook", async (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  let responseText = "";

  if (intent === "Astronomy Picture of the Day") {
    const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    const data = await fetch(apiURL).then((r) => r.json());
    responseText = `${data.title}: ${data.explanation}\nImage: ${data.url}`;
  }

  // You can add more intents for other NASA APIs

  return res.json({
    fulfillmentMessages: [{ text: { text: [responseText] } }],
  });
});

app.listen(3000, () => console.log("🚀 NASA Webhook running on port 3000"));
