// In your Express server, perhaps in a new file like src/server/routes/gptRoutes.js
import express from 'express';
import openai from 'openai';

const router = express.Router();

router.post('/gpt-summary', async (req, res) => {
  try {
    const { todos } = req.body;

    if (!todos) {
      return res.status(400).json({ error: 'Todos are required' });
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.9,
      n: 1,
      stream: false,
      messages: [
        {
          role: 'system',
          content: "When responding, welcome the user always as Mr.Akram and say welcome to the PAPAFAM Todo App! Limit the response to 200 characters.",
        },
        {
          role: 'user',
          content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(todos)}`,
        },
      ],
    });

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const message = response.data.choices[0].message;
      return res.json({ content: message.content });
    } else {
      throw new Error('Invalid response from OpenAI');
    }
  } catch (error: any) {
    console.error('Error creating GPT summary:', error.message || error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
