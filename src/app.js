import express from "express"
import cors from "cors"

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [{
    username: 'bobesponja',
    avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png"
},
{
    username: 'aaaaaa',
    avatar: "https://epipoca.com.br/wp-content/uploads/2021/08/my-hero-academia-1200x900.jpg"
},
{
    username: 'todoroki',
    avatar: "https://18854.cdn.simplo7.net/static/18854/sku/quadros-animes-boku-no-hero-Quadro-My-Hero-Academia-Midoriya-Copia-1-copia-1-1620176430497.jpg"
}];

let tweets = [{
    username: "todoroki",
    tweet: "SAIKO NO HEROO!"
},
{
    username: "aaaaaa",
    tweet: "BBBBBBBBBBBB"
},
{
    username: "bobesponja",
    tweet: "Eu amo hambúrguer de siri!"
},{
    username: "todoroki",
    tweet: "4!"
},
{
    username: "aaaaaa",
    tweet: "5"
},
{
    username: "bobesponja",
    tweet: "6"
},{
    username: "todoroki",
    tweet: "7"
},
{
    username: "aaaaaa",
    tweet: "8"
},
{
    username: "bobesponja",
    tweet: "9!"
},
{
    username: "bobesponja",
    tweet: "10!"
},
{
    username: "bobesponja",
    tweet: "11!"
}
]




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

            if(sendLastTweets.length >= 10){
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