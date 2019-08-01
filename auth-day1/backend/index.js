const express = require ('express');
const app= express();
const PORT = process.env.PORT || 5000;
const models= require("./models")();
models.init();
const md5 = require("md5");
//md5 is a package and an encryption hashing package
const cryptoRandomString = require("crypto-random-string");
const bcrypt= require ("bcrypt");
const cors= require("cors");
//tells express to use cors
app.use(cors());



const bodyparser= require("body-parser");
app.use(bodyparser.json());
app.get("/", (req,res)=>{
    res.send({message:"Hello World!"});
    
})
// app.post("/test", (req, res)=>{
//     console.log(req.body.hello);
//     res.send({world:"hello World!"});
// })
app.post("/createAccount", async (req,res)=>{
    if (!req.body.username || !req.body.password) {
        res.status(401).send({ hackers: "you get nothing" });
    }else{
        const generatedPassword= await (bcrypt.hash(req.body.password, 10));
    models.User.create({
        //req is information being sent to the server 
        //createAccount fetch method in app.js is passing the following information 
        username: req.body.username,
        password: generatedPassword,
    })
    }
    res.send({message:"user created"});
})
app.post("/login", async (req,res)=>{
    const userDB=
    await models.User.findOne({
        where: {username: req.body.username}
    })
    //res.send make sure to always return something
    if (!userDB) {
		res.send({ error: "Can't sign in" });
	} else {
        const match = await (bcrypt.compare(req.body.password, userDB.password));
		if (match) {
			res.send({ message: "user is signed in" });
		} else {
			res.send({ error: "Can't sign in" });
		}
	}
});
app.listen(PORT, 
    console.log(`server is running! On port 5000${PORT}`)
);

