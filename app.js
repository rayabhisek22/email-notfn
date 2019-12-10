
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

var express = require('express'),
	mongoose = require('mongoose'),
	bodyparser = require('body-parser');

var app = express();
var User = require('./models/user');

//Database connection
/*mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true,useUnifiedTopology: true},err=>{
	if(err) console.log(err);
	else
		console.log("connected");
});*/
var url = 'mongodb+srv://admin:Abcabcabv34@cluster0-l7gwx.mongodb.net/test5?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true, useFindAndModify:false, useUnifiedTopology: true}, err=>{
	if(err) console.log(err);
	else
		console.log("connected");
});


//Mail API connection
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'rayabhisek22@gmail.com',
  from: 'test@example.com',
  subject: 'Thanks for registering',
  text: 'The process will soon be integrated. Dev:@rayabhisek22',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};


//App configuration
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));

//Routes
app.get("/",(req,res)=>{
	res.render("home");

})

app.get("/new",(req,res)=>{
	res.render("new");
})

app.post("/",(req,res)=>{
	User.create(req.body.user, (err,newuser)=>{
		var s=0;
		if(err) {
			s=0;
			console.log(err);
			res.render("status",{status:s});
		}
		else
		{
			s=1;
			msg.to = newuser.email;
			sgMail.send(msg);
			res.render("status",{status:s,Nuser:newuser});
		}
		
	})
})

var Port = 8000 | process.env.port;
app.listen(Port,(err)=>{
	if(err) console.log(err);
	else console.log("Started");
})