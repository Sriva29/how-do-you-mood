const OpenAI = require('openai');

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// Initialize the OpenAI API with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});




const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Route to handle image generation requests
app.post('/generate-image', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        // Use the OpenAI library to generate an image
        const response = await openai.images.generate({
            model: "dall-e-3", // Specify the model you want to use
            prompt: prompt,
            n: 1, // Number of images to generate
            size: "1024x1024", // Image size
        });

        // Extract the URL of the generated image
        const imageUrl = response.data[0].url;
        res.json({ imageUrl: imageUrl });
        console.log('Image generated:', imageUrl);
    } catch (error) {
        console.error('Error generating image with OpenAI:', error);
        res.status(500).send('Error generating image');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
