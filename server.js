const express = require("express");
const cors = require('cors');
const axios = require("axios")
require("dotenv").config({path:"./.env"});

const App = express();
const PORT = process.env.PORT || 7011;

App.use(cors());
App.use(express.json())

App.get('/api/suivi/:num', async(req,res)=>{

    Num = req.params.num
    console.log(Num)
    try {
        let response = await axios.get(`http://www.rapidposte.poste.tn/fr/Item_Events.asp?ItemId=${Num}&submit22.x=21&submit22.y=8`)
        res.json(response.data)
    } catch (error) {
        console.log(error)
    }
})

App.listen(PORT, (err)=>{
    if(err){
    console.log(err) }else {
     console.log(`server is running on ${PORT}`)
}})