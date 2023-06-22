const express = require("express");
const cors = require('cors');
const cheerio = require('cheerio');
const axios = require("axios")
require("dotenv").config({path:"./.env"});

const App = express();
const PORT = process.env.PORT || 7011;

App.use(cors());
App.use(express.json())

App.get('/api/suivi/:num', async(req,res)=>{

    try {
      Num = req.params.num

        let response = await axios.get(`http://www.rapidposte.poste.tn/fr/Item_Events.asp?ItemId=${Num}&submit22.x=21&submit22.y=8`)
      
        const $ = cheerio.load(response.data);

        const desiredTable = $('#200'); // table id = 200 in the html response 
        
    if(desiredTable.length === 0){
            res.status(400).send('Veuillez vérifier l`identifiant saisi !')
        }else{
          const tableData = [];
      desiredTable.find('tbody tr').each((index, row) => {
          const rowData = {};
          // Find the cells within the current row
        $(row).find('td').each((index, cell) => {
          // Get the text content of the cell
          const cellData = $(cell).text().trim();
          // Assign the cell data to the corresponding property of the rowData object
          rowData[`column${index + 1}`] = cellData;
              });
          tableData.push(rowData);
      });
          // console.log(response)
          // Send the JSON response
          res.status(200).json(tableData);
    }

    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

App.listen(PORT, (err)=>{
    if(err){
    console.log(err) }else {
     console.log(`server is running on ${PORT}`)
}})