let axios = require("axios");

const subreddit = "oldschoolcool";
const postsPerRequest = 1;

async function fetchPosts(){
//    await axios.get('https://www.reddit.com/r/oldschoolcool.json')
//        .then(function (response) {
//            return response.json();
//        }).then(function (data) {
//            console.log("client received from server:");
//            console.log(data)
//
//    });
    //const response = await
    
    
    //TODO: Make sure is_video=false, over_18=false
    axios.get(`https://www.reddit.com/r/${subreddit}.json?limit=${postsPerRequest}`).then(function (response) {
        console.log(response.data)
        const posts = response.data.data.children
        const after = response.data.data.after
        
        console.log(posts[0])
        //res.json({"feelsLikeFarenheit": feelsLike});
	});
    
    
    console.log("client received from server:");
    
    
}
// date 
// img
// year
// username
// postID

//let shots = {"shots": [{shot1...}, {shot2...}, {shot3...}]}

let shot = {
  postId: 123,
  user: "user123",
  url: "https://...", //img URL
  year: 2019, //regex'd year
  // If year is none decade will be used, if neither an error will be thrown
  decade: "2010s",
}

fetchPosts()