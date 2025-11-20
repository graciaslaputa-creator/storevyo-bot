const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const botName = process.env.BOT_NAME || 'store vyo';

const bot = new TelegramBot(token, { polling: true });
const app = express();
const PORT = process.env.PORT || 3000;

console.log(`🤖 ${botName} Bot Started...`);

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.first_name;
  
  bot.sendMessage(chatId, 
    `🛍️ Welcome to ${botName}! 👋\n\n` +
    `Hello ${username}! I'm your store assistant bot.\n\n` +
    `📋 **Available Commands:**\n` +
    `/start - Start the bot\n` +
    `/products - View products\n` +
    `/orders - Check orders\n` +
    `/support - Contact support\n` +
    `/help - Show all commands`
  );
});

// Products command
bot.onText(/\/products/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    `🛍️ **Available Products:**\n\n` +
    `1. Electronics 📱\n` +
    `2. Fashion 👕\n` +
    `3. Home Items 🏠\n` +
    `4. Books 📚\n\n` +
    `Which category interests you?`
  );
});

// Orders command
bot.onText(/\/orders/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.first_name;
  bot.sendMessage(chatId,
    `�� **Order Status for ${username}**\n\n` +
    `✅ Order #VYO001 - Shipped\n` +
    `⏳ Order #VYO002 - Processing\n` +
    `🎉 Order #VYO003 - Delivered`
  );
});

// Support command
bot.onText(/\/support/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    `📞 **Customer Support**\n\n` +
    `Email: support@storevyo.com\n` +
    `Hours: 24/7\n` +
    `We're here to help!`
  );
});

// Help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    `🆘 **Help Menu**\n\n` +
    `/start - Start bot\n` +
    `/products - View products\n` +
    `/orders - Check orders\n` +
    `/support - Contact support\n` +
    `/help - This menu`
  );
});

// Handle regular messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const username = msg.from.first_name;

  if (text.startsWith('/')) return;

  const responses = {
    'hi': `Hello ${username}! 👋 Welcome to ${botName}!`,
    'hello': `Hi ${username}! 🛍️ Ready to shop?`,
    'product': `Check /products for available items!`,
    'price': `For pricing, check /products or contact /support`,
    'thanks': `You're welcome ${username}! 😊`,
    'bye': `Goodbye ${username}! 👋`
  };

  const response = responses[text.toLowerCase()] || 
    `Thanks for your message, ${username}! Use /help for commands.`;

  bot.sendMessage(chatId, response);
});

// Web server
app.get('/', (req, res) => {
  res.json({
    message: `🤖 ${botName} Bot is running!`,
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

console.log('✅ Bot initialized! Send /start on Telegram!');

// Error handling
bot.on('error', (error) => {
  console.log('❌ Bot error:', error);
});
