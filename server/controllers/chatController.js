import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatWithTutor = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
          You are a German language tutor helping a beginner.

          When the user sends a message:
          1. Correct their sentence.
          2. Give a short, simple explantion in English.
          3. Respond naturally in German.

          Format your reponse EXACTLY like this:

          Correct: <correct sentence>
          Explanation: <short explanation>
          Response: <continue discusion in German>

          Keep everything simple and encouraging!
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
