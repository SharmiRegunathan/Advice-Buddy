import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))

app.get("/", async (req, res) => {
    try{
        const response = await axios.get("https://api.adviceslip.com/advice")
        const result = response.data.slip;
        //console.log(response)
        res.render("index.ejs", {data : result})
    }catch(error){
        console.log("Failed to make request: ", error.message)
    }
})

app.post("/", async (req, res) => {
    try{
        const ans = req.body.answer;
        const response = await axios.get(`https://api.adviceslip.com/advice/search/${ans}`)
        const result = response.data.slips;
        var random = Math.floor(Math.random() * result.length)
        res.render("index.ejs", {data : result[random]})
    }catch(error){
        console.log("Failed to make request: ", error.message)
        res.render("index.ejs")
    }
})

app.listen(3000, () => {
    console.log(`Server connected to port ${port}`)
})