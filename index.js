require("dotenv").config();
const express=require("express");
const ejs =require("ejs");
const bodyParser=require("body-parser");
const mongoose =require("mongoose");



const app = express();
mongoose.connect('mongodb+srv://admin:'+process.env.PASSWORD+'@simongame.2lbn0.mongodb.net/SimonGame?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

const simonSchema = mongoose.Schema({
    name: String,
    score: Number 
});

const Score = mongoose.model('User',simonSchema);

app.get('/',(req,res)=>{

        // Find First 10 News Items
    Score.find({}).sort("-score").limit(25).exec(function(err,scores){
        if(err){
            console.log(err);
        }else{
            let i=1
            scores.forEach(function(score){
                score.index=i;
                i=i+1;
            })
            // res.sendFile(__dirname+"/index.ejs");
            res.render("game",{users:scores});
        }
    });
    
})

app.post('/',(req,res)=>{
    console.log(req.body.score);
    console.log(req.body.name);
    Score.find({name:req.body.name},function(err,user){
        console.log(user);
        if(user.length!=0){
            if(req.body.score>user[0].score){
                Score.updateOne({name:req.body.name},{$set: {score:req.body.score}},function(err,result){
                    if(err){
                        
                    }else{
                        console.log("Successfully updated ");
                        res.redirect("/");
                    }
                })
                }else{
                    res.redirect("/");
                }
        }else{
            const score1 = new Score({
                name:req.body.name,
                score:req.body.score
            });
            score1.save().then(function(){
                
                    console.log("New record succesfully added");
                    res.redirect("/");
                
            });
        }
        
        
    })
    
})


app.listen(process.env.PORT||3000,function(){
    console.log("Server is up and running");
})