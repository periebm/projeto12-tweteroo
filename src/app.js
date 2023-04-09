import express from "express"
import cors from "cors"

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [];

let tweets = [];




app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    users.push({ username, avatar });

    res.send("OK")
})



app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    if (!users.find(u => u.username === username)) res.send("UNAUTHORIZED"); //check if user 

    tweets.push({ username, tweet });

    res.send("OK")
})


app.get("/tweets", (req, res) => {
    if (tweets.length === 0) return res.send([])

    let sendLastTweets = []


    for (let i = tweets.length - 1; i >= 0; i--) {
        const av = users.find(e => e.username === tweets[i].username);

        sendLastTweets.push({
            username: tweets[i].username,
            avatar: av.avatar,
            tweet: tweets[i].tweet
        })

        if (sendLastTweets.length >= 10) {
            return res.send(sendLastTweets);
        }
    }


    res.send(sendLastTweets);
})




app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))

/* formato usuario:
{
    username: 'bobesponja', 
    avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png" 
}
 */

/* formato tweet:
{
    username: "bobesponja",
    tweet: "Eu amo hambúrguer de siri!"
}
 */