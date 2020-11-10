let axios = require("axios");

const subreddit = "oldschoolcool";
const postsPerRequest = 1;

async function fetchPosts(){

    let responseShots = {"shots": []}
    
    axios.get(`https://www.reddit.com/r/${subreddit}.json?limit=${postsPerRequest}`).then(function (response) {
        const posts = response.data.data.children
        const after = response.data.data.after
        
        posts.forEach(function(post){
            let data = post.data;
            
            if (data.is_video || data.over_18){ //exclude video and NSFW posts
                return;
            }
            
            let shot = {
                "postId": data.id,
                "user": data.author,
                "postUrl": `https://www.reddit.com${data.permalink}`,
                "imgUrl": data.url,
                "year": '',
                "decade": '',
            }
            
            //TODO: regex magic
            //Criteria:
            //- 4 digit number, with OR without 's' at end. ir ''s'
            //-- if ends in 's', set as decade.
            let title = data.title;
            console.log(title)
            
            responseShots.shots.push(shot);
            
        })
        
        console.log("responseShots:");
        //console.log(responseShots)
        
	}).catch(function (error) {
        console.log(error)
        return;
    });
    
    
    
    
    
}
//let shot = {
//  postId: 123,
//  user: "user123",
//  url: "https://...", //img URL
//  year: 2019, //regex'd year
//  // If year is none decade will be used, if neither an error will be thrown
//  decade: "2010s",
//}

fetchPosts()