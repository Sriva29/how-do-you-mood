const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // To manage environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle image generation requests
app.post('/generate-image', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: prompt,
            n: 1, // Number of images to generate
            // Add other parameters as per OpenAI's documentation
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        // Respond with the generated image data
        res.json(response.data);
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Error generating image');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
