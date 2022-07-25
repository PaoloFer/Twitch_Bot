# Twitch_Bot
This is a simple project built in node.js and using the TWITCH API.

## How does Twitch bot work?
the bot logic is quite simple:
- every 30 seconds the bot does an HTTP request to the API to get the data about the followers of a twtich_channel,
- to see the unfollow, the bot made a paring between the follower of the previus request and return an array of the unfollow nickname,
- then the bot update the follower.json file (file where is stored the list of username) with the new follower list,

## How set up the bot
- clone the repo with:
  ```git clone <Repo URL>```

- install [node.js](https://nodejs.org/):
- install dependencies with :
  ```npm install```
- from the [twitch api](https://dev.twitch.tv/docs/authentication/register-app) (link to the doc to get the token) get the bot token and the client_id
(small tips to get the channel id that you want, this [chrome extention](https://chrome.google.com/webstore/detail/twitch-username-and-user/laonpoebfalkjijglbjbnkfndibbcoon/related) will help you)
- execute the follower.js file that setup the follower.json ```node ./follower.js ```
- than if you want to create an .env file with the bot data you can do it so that you can use my bot without doing a lot of chaning 
(Remember to use the same name that i have use, if you want to use my same structure)

```
#my env structure
CHANNEL_ID =
CLIENT_ID =
BOT_TOKEN =
CHANNEL =
BOT_USERNAME =
PASSWORD =
```

- now you are ready to execute the bot 
```
node index.js
```

### For every bug/problem or new feautures open a new issue  
