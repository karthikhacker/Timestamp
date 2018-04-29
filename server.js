const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const cors = require('cors');
const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname + '/public')));

app.get('/:time',(req,res) => {
  //
  unixTimeStamp = (unix) => {
     var date = new Date(unix * 1000);
     var months = ['Jan','Feb','Mar','Apl','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];
     var month = months[date.getMonth()];
     var day = date.getDate();
     var year = date.getFullYear();
     var result = month + ' ' + day + ', ' + year;
     return result;
  }
  if(!isNaN(req.params.time)){
    var result = unixTimeStamp(req.params.time);
    res.json({unix : req.params.time, natural : result});
  }else{
    var natural = new Date(req.params.time);
    if(!isNaN(natural)){
      var unix = natural / 1000;
      res.json({unix : unix, natural : req.params.time});
    }else{
      res.json({unix : null, natural : null});
    }
  }
});

app.listen(port, () => {
   console.log('App running at port ', port);
});
