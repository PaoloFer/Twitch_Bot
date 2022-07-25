
const tmi = require("tmi.js");
const env = require("dotenv").config();
const fs = require("fs");   



let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let channel = process.env.CHANNEL;

const option = {
    options: { debug: true },
    connection: {
        reconncet: true,
        secure: true,
    },
    identity: {
        username,
        password

    },
    channels: [channel]
}

const client = new tmi.Client(option);
client.connect().catch(console.error);

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
  
  async function api_request( after= null) {
    let url = `https://api.twitch.tv/helix/users/follows?to_id=${process.env.CHANNEL_ID}&first=100`;
    if (after != null) {
        url += `&after=${after}`;
        console.log(url);
    };
    
  
    let names = get(url)
    return names
  
  }
  async function UpdateRecentFollower(channel_id, client_id,data_i){
    const users = [];
    let index = 0;
    let first = true;
    let total_follower=0;
    let cursor= null;
  
  
  
    while (index <=total_follower) {
        index+=100;
        let data = await api_request(cursor);
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
  
    return users
  }
  
  function CheckUnfollow(old_data_file,new_data){
    const unfollow = [];
    
    let oldData = JSON.parse(fs.readFileSync("./test.json").toString());
  
    for (let i in oldData.user){
      if (!new_data.includes(oldData.user[i])){
        unfollow.push(oldData.user[i])
      }
    };
  
    if (unfollow.length!= 0){
        let new_json = {};
        const list = [];
        
        for (let element in new_data){
  
            list.push(new_data[element]);
        };
        new_json.user=list;
        let string = JSON.stringify(new_json,null,4);
        fs.writeFileSync("test.json",string);
        console.log(unfollow);
  
        return unfollow
    }else{
      let new_json = {};
        const list = [];
        
        for (let element in new_data){
  
            list.push(new_data[element]);
        };
        new_json.user=list;
        let string = JSON.stringify(new_json,null,4);
        fs.writeFileSync("test.json",string);
        return []
    }
    
  }
  
  
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function main(){
  while(true){
  let new_data = await UpdateRecentFollower(process.env.CHANNEL_ID,process.env.CLIENT_ID)
    const array = CheckUnfollow("test.json",new_data);
    if (array.length != 0){
      let message= "";
      for (let element in array){
        message+=array[element]+","
      }
      
      client.say(channel,`Utenti che si sono unfollowati: ${message}`)
      
    }
    await sleep(30*1000)
  }
  
}

client.on("connected", ()=>{

    main()

} )