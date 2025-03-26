const { Client } = require("whatsapp-web.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("SUA_KEY_API_GEMINI"); // Substitua pela sua chave da API Gemini

const client = new Client({
  puppeteer: {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Altere para o caminho correto do Chrome
    headless: false, // Abre o Chrome visivelmente
  },
});

client.on("message", async (msg) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const result = await model.generateContent(msg.body);
    const response = await result.response;
    
    msg.reply(response.text()); // Responde a mensagem no WhatsApp
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    msg.reply("Desculpe, ocorreu um erro ao processar sua solicitação.");
  }
});

client.initialize();
