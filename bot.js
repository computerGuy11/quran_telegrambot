const { Telegraf } = require('telegraf');
const axios = require("axios");



const bot = new Telegraf('5461014958:AAGb1I84x2_9nzipl4KUPa3AgJv1BBn5Rhw');
bot.start(async(ctx) => {
    await bot.telegram.sendMessage(ctx.chat.id, 'To my mom  , to my aunt and my dear grandpa and grandma who passed away ALLAH YRHMHOUM')
    await bot.telegram.sendMessage(ctx.chat.id, 'This bot was devloped by @dashauptfigur for any issue contact me')
    await bot.telegram.sendMessage(ctx.chat.id, 'BIG THANKS TO AI-QURAN API')

    await bot.telegram.sendMessage(ctx.chat.id, 'Welcome dear please choose something', {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "Search for a word",
                        callback_data: 'aya'
                    },
                    {
                        text: "Entire Surah",
                        callback_data: 'alpha'
                    },
                    {
                        text: "Translate aya",
                        callback_data: 'ta'
                    }
                ],

            ]
        }
    })
})




//method for requesting user's location


bot.hears('menu', ctx => {
    let message = `Welcome dear please choose something`;

    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "aya",
                        callback_data: 'aya'
                    },
                    {
                        text: "Surah",
                        callback_data: 'Surah'
                    },
                    {
                        text: "Translate aya",
                        callback_data: 'ta'
                    }
                ],

            ]
        }
    })

})
bot.action('Surah', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'please enter number of surah?');
    bot.on('text', ctx => {
        let surah = ctx.update.message.text;
        const options = {
            method: 'GET',
            url: `https://al-quran1.p.rapidapi.com/${surah}`,
            headers: {
                'X-RapidAPI-Key': 'ab7728f25cmsh9d8df901e84078cp110683jsn661d868faec0',
                'X-RapidAPI-Host': 'al-quran1.p.rapidapi.com'
            }
        };

        axios.request(options).then(async function(response) {

            getC(response.data.total_verses, response.data.verses, ctx)


        }).catch(function(error) {
            console.error(error);
        });
    })
})
bot.action('aya', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'please enter the word?');
    bot.on('text', ctx => {
        let surah = ctx.update.message.text;
        const options = {
            method: 'GET',
            url: `https://al-quran1.p.rapidapi.com/corpus/${surah}`,
            headers: {
                'X-RapidAPI-Key': 'ab7728f25cmsh9d8df901e84078cp110683jsn661d868faec0',
                'X-RapidAPI-Host': 'al-quran1.p.rapidapi.com'
            }
        };

        axios.request(options).then(async function(response) {
            console.log(response.data[0]["total_matches "])
            if (response.data[0]["total_matches "] === 0) {
                bot.telegram.sendMessage(ctx.chat.id, 'Sorry would you type the word carefuly');

            } else {
                getC(response.data[0]["total_matches "], response.data, ctx)

            }


        }).catch(function(error) {
            console.error(error);
        });
    })
})
bot.action('ta', ctx => {
    var surah = '';
    bot.telegram.sendMessage(ctx.chat.id, 'please enter the surah?');
    bot.on('text', ctx => {
        if (surah === '') {
            surah = ctx.update.message.text;
            bot.telegram.sendMessage(ctx.chat.id, 'please enter the aya?');


        } else {
            var aya1 = ctx.update.message.text;
            const options = {
                method: 'GET',
                url: `https://al-quran1.p.rapidapi.com/${surah}/${aya1}`,
                headers: {
                    'X-RapidAPI-Key': 'ab7728f25cmsh9d8df901e84078cp110683jsn661d868faec0',
                    'X-RapidAPI-Host': 'al-quran1.p.rapidapi.com'
                }
            };
            axios.request(options).then(async function(response) {
                let ayaz = [];
                var $size = 0;
                var aya = '';
                let li = 0;
                console.log(parseInt(aya1), aya1)
                getaya(1, response.data.translation_eng, ctx, 1, ayaz, $size, aya, li)
                ayaz = [];
                $size = 0;
                aya = '';
                li = 0;
                getaya(1, response.data.content, ctx, 1, ayaz, $size, aya, li)




            }).catch(function(error) {
                console.error(error);
            });




        }

    })


})


function getC(total, content, ctx) {
    var size = total;
    let ayaz = [];
    var $size = 0;
    var aya = '';
    let li = 0;
    for (let i = 1; i < size + 1; i++) {
        getaya(size, content[i].content, ctx, i, ayaz, $size, aya, li)

    }
}
async function getaya(size, content, ctx, i, ayaz, $size, aya, li) {

    var ayasize = content % 2500;

    if (ayasize == content) {
        ayaz.push(content)

    } else {
        for (var f = 0; f < Math.floor(content.length / 2500) + 1; f++) {
            let aya2 = content.slice(f * 2500, (f + 1) * 2500);
            ayaz.push(aya2)

        }
    }
    if (i == size) {
        for (var j = 0; j < size; j++) {
            aya += ayaz[j] + `  - ${j+1} -  `;

            $size = aya.length;
            console.log(aya.length)
            if ($size >= 2500 && li < j) {
                console.log(aya)
                await bot.telegram.sendMessage(ctx.chat.id, aya)
                aya = '';
                $size = 0;
                li = j;
            } else if (j == size - 1) {
                await bot.telegram.sendMessage(ctx.chat.id, aya)

            }
        }

    }



}

bot.telegram.setMyCommands([
    { command: "start", description: "Start over" },

]);

bot.launch();