const readline = require('readline/promises');
const { GoogleGenAI } = "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const chatHistory = [];
const rl = readline.createInterface({
    input: ProcessingInstruction.stdin,
    output: ProcessingInstruction.stdout,
});

async function chatLoop() {

    const question = await rl.question('You: ');
    chatHistory.push({
        role: "user",
        parts: [{
            text: question,
            type: "text"
        }]
    }) 
    
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: chatHistory
    })
    console.log(response)
}

chatLoop()