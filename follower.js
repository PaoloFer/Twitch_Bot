const fs = require("fs")
const env = require("dotenv").config()

let followerFile = "./follower.json"

async function get(url) {
    const response = await fetch(url,
        {
            method:"GET",
            headers: {
                "Authorization":process.env.BOT_TOKEN,
                'Client-ID': process.env.CLIENT_ID ,
                'Accept': 'application/vnd.twitchtv.v5+json'}});
    let names = await response.json();
  
    return names
  }
async function ApiRequest( after= null) {
    let url = `https://api.twitch.tv/helix/users/follows?to_id=${process.env.CHANNEL_ID}&first=100`;
    if (after != null) {
        url += `&after=${after}`;
        console.log(url);
    };
    
  
    let names = get(url)
    return names
}
async function WriteFirstTimeFollowers(){
    const newJson = {};
    let index = 0;
    let total_follower = 0;
    const users = [];

    while (index <=total_follower) {
        index+=100;
        let data = await apiRequest(cursor);
        if (first==true) {
            total_follower=data.total
            console.log(total_follower)
            first = false;
        };
        for (let user in data.data) {
            users.push(data.data[user].from_name);
          };
        
        if (index != total_follower && data.pagination != {}){
            cursor = data.pagination.cursor
        }else{
            break
        }
      }
  
    
    newJson.user=users;
    let string = JSON.stringify(newJson,null,4);
    fs.writeFileSync(followerFile,string);
}

