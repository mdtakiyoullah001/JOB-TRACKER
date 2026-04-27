require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test(modelName) {
  try {
    const key = process.env.GEMINI_API_KEY;
    console.log(`Testing model: ${modelName}`);
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      generationConfig: { responseMimeType: "application/json" }
    });
    const result = await model.generateContent("Return exactly: { \"test\": true }");
    console.log(`SUCCESS [${modelName}]:`, result.response.text());
  } catch (e) {
    console.log(`FAILED [${modelName}]:`, e.status, e.message.split('\n')[0]);
  }
}

async function run() {
  await test('gemini-1.5-flash');
  await test('gemini-1.5-flash-latest');
  await test('gemini-1.5-pro');
  await test('gemini-pro');
}
run();
