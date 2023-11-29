import {Configuration, OpenAIApi} from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config({path: '.env', debug: true})
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
const router = express.Router()
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);
router.get('', (req, res) => {
    res.json('HELLO FROM THE SERVER 🔴')
})
router.get("/ask", async (request, response) => {
    const {message} = request.body;
    if (!message) {
        return response.json({ERR: 'message property is required', code: 400})
    }
    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: message,
            },
        ],
    });

    response.json(
        result.data.choices[0].message,
    );
});
app.use(router)
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
