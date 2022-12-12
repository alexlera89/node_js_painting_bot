const { Telegraf } = require('telegraf')
const { config } = require('dotenv')
config()

const { generateImage } = require('./controllers/openaiController');

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', (ctx) => ctx.reply('Welcome honey! I\'m NodeJS bot' + 
    ' for you, Valeriya. You can describe painting with words and ' +
    ' I will show you image. Please, don\'t write about porno pictures.'))

bot.on('message', async ctx => {
    try {
        url = await generateImage(ctx.message.text)
        if (url !== 'The image could not be generated')
            await ctx.replyWithPhoto(url)
        else
            await ctx.sendMessage('The image could not be generated')
    } catch(err) {
        console.log(err)
    }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
