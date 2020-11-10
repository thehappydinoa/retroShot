let axios = require("axios");

const postsPerRequest = 100;

async function fetchPosts(){

    let responseShots = {"shots": []}
    
    axios.get(`https://www.reddit.com/r/oldschoolcool.json?limit=${postsPerRequest}`).then(function (response) {
        const posts = response.data.data.children
        const after = response.data.data.after
        
        posts.forEach(function(post){
            let data = post.data;
            
            // Exclude video and NSFW posts
            if (data.is_video || data.over_18){
                return;
            }
            
            // Match exact years or decades
            let regex = /\d{4}([’']?s)?/g
            let title = data.title;
            let matches = title.match(regex)
            
            // Accept only a single match per title
            if(!matches || matches.length > 1){ 
                return; 
            }
            
            // Extract year/ decade int from match
            let year = null;
            let decade = null;
            if(matches[0].slice(-1) === 's'){
                decade = parseInt( matches[0].slice(0,4), 10);
            }
            else {
                year = parseInt( matches[0], 10);
            }
            
            // Build shot JSON object and push to responseShots
            let shot = {
                "postId": data.id,
                "user": data.author,
                "postUrl": `https://www.reddit.com${data.permalink}`,
                "imgUrl": data.url,
                "year": year,
                "decade": decade,
            }
            responseShots.shots.push(shot);
            
        })
        
        console.log("responseShots:");
        console.log(responseShots)
        
	}).catch(function (error) {
        console.log(error)
        return;
    });
    
}

fetchPosts()