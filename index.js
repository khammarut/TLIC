const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
var otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(function (req,res,next){
    res.setHeader('Access-Control-Allow-Origin' , '*')
    res.setHeader('Access-Control-Allow-Methods' , 'GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers' , 'content-type , x-access-token')
    res.setHeader('Access-Control-Allow-Credentials' , true)
    next()
})
require('./db')
const dataTypeModel = require('./dataTypeSchema')
const submitTypeModel = require('./submitTypeSchema')

var token = ''

app.get('/oauthcallback' , (req , res)=>{
    token = req.query.code

    var param = new URLSearchParams();
    param.append('code' , token);
    param.append('redirect_uri' , 'https://tlic.cmu.ac.th/abc-screening/oauthcallback');
    param.append('client_id' , 'HU1BKrRNeMjjrAtuUdq1JpaqpgQagxeTMnECsPP8');
    param.append('client_secret' , '2GC2BqfK7uKHDmjvTNpCMQETFBHd51cfBr9bWjZ9');
    param.append('grant_type' , 'authorization_code');

    axios.post('https://oauth.cmu.ac.th/v1/GetToken.aspx?' , param , {headers : {"Content-Type" : "application/x-www-form-urlencoded"}})
    .then((result)=>{
        axios.get('https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo' , {
            headers : {
                'Authorization' : 'Bearer ' + result.data.access_token
            }
        }).then((data)=>{
            console.log(data.data);
            res.json({"data" : data.data , 'token' : result.data.access_token})
        }).catch(err =>{
            console.log(err);
        })
    })
})

app.post('/insertdatatype' , (req , res) =>{    
    dataTypeModel.create(req.body , (err , doc) => {
        if(err) res.json({"result" : "failed"})

        res.json({"result" : "success"})
    })
})

app.get('/getdatatype/:cmuaccount' , (req , res) =>{       
    dataTypeModel.find({CMUAccount : req.params.cmuaccount} ,  (err , doc) => {
        if(err) res.json({"result" : "failed"})

        res.json({"data" : doc})
    })
})

app.get('/getdatatype' , (req , res) =>{       
    dataTypeModel.find( (err , doc) => {
        if(err) res.json({"result" : "failed"})

        res.json({"data" : doc})
    })
})

app.put('/datatype/:id' , (req,res)=>{
    dataTypeModel.updateOne({_id : req.body._id} ,{$set : req.body},(err , doc)=>{
        if (err) {
            res.json({"result" : err});
        }
        res.json({"result" : "success" });
    });
});

app.post('/submittype' , (req , res) =>{
    console.log(req.body);
    
    submitTypeModel.create(req.body , (err , doc) => {
        if(err) res.json({"result" : "failed" , "err" : err})

        res.json({"result" : "success"})
    })
})

app.delete('/deletedata' , (req,res)=>{
    dataTypeModel.remove( (err , doc)=>{
        
    })
})

app.get('/getotp' , (req,res)=>{
    res.json(otpGenerator.generate(6, { upperCase: false, specialChars: false }));
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tlicitsc@gmail.com', // your email
      pass: 'Tlic43866' // your email password
    }
  });

app.post('/sendemail' , (req , res)=>{
    console.log(req.body.otp);
    
    let mailOptions = {
        from: 'sender@hotmail.com',                // sender
        to: req.body.mail,                // list of receivers
        subject: 'OTP Code from TLIC CMU',              // Mail subject
        html: '<b>OTP Code : </b>' + req.body.otp   // HTML body
      };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
})

app.get('/getsubmittype' , (req , res) =>{       
    submitTypeModel.find( (err , doc) => {
        if(err) res.json({"result" : "failed"})

        res.json({"data" : doc})
    })
})

const port = process.env.PORT || 3000
app.listen(port , ()=>{
    console.log(port);
})