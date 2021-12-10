const express = require('express')
const request = require('request')
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const port = 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs');

const url = 'https://api.wazirx.com/api/v2/tickers';

mongoose.connect("mongodb://localhost:27017/quaddb" , { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  name : [String],
  last : [Number],
  Buy :  [Number],
  Sell : [Number],
  volume : [Number],
  base_unit : [String]
})
  

const wiki = mongoose.model("wiki", userSchema);


app.get('/', (req, res) => {
  request({ url: url }, (error, response) => {
    // Parse the response body from JSON string into JavaScript object
    const data = JSON.parse(response.body)
     let keys = Object.keys(data);
    // keys.forEach((a) => {
    //   console.log(a);
   // })
   // keys.forEach((a) => {
    //   console.log(data[a].base_unit)
    // })
    var p = [ ];
    var l = [ ];
    var b = [ ];
    var s = [ ];
    var v = [ ];
    var bu = [ ];
    for (let i = 0; i < 10; i++) {
      p.push(keys[i]);
      l.push(data[keys[i]].last);
      b.push(data[keys[i]].buy);
      s.push(data[keys[i]].sell);
      v.push(data[keys[i]].volume);
      bu.push(data[keys[i]].base_unit);
    }

    const wikidata = new wiki({
      name : p,
      last : l,
      Buy :  b,
      Sell : s,
      volume : v,
      base_unit : bu
    });
    
    wikidata.save();

    res.render('list',{t1: p, t2: l, t3: b, t6: s, t4: v, t5: bu});
})
})

app.get('/connect', (req, res) => {
  res.render('tele');
})


app.listen(port, () => {
  console.log(`You are at port ${port}!`)
});