import OpenAI from "openai";
import User from "../models/User.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatWithTutor = async (req, res) => {
  try {
    const { message } = req.body;

    let user = await User.findOne();
    if (!user) {
      user = await User.create({});
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
          You are a German language tutor helping a beginner.

          Student weaknesses:${user.weaknesses.join(", ")}

          When the user sends a message:
          1. Correct their sentence.
          2. Give a short, simple explanation in English.
          3. Respond naturally in German.

          Format your response EXACTLY like this:

          Correct: <correct sentence>
          Explanation: <short explanation>
          Response: <continue disscusion in German>

          Keep everything simple and encouraging!
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const aiReply = response.choices[0].message.content;
    const correct = aiReply.split("Correct:")[1]?.split("Explanation:")[0];
    const explanation = aiReply.split("Explanation:")[1]?.split("Response:")[0];

    if (correct && correct !== message) {
      user.commonMistakes.push({
        original: message,
        correction: correct,
      });
      if (!user.weaknesses.includes("grammar")) {
        user.weaknesses.push("grammar");
      }

      await user.save();
    }

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
