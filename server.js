const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const _ = require("lodash")
const dotenv = require("dotenv")
dotenv.config()

app.set( "view engine", "ejs")
app.get("/", (req,res) => {
    res.render('Home',{title : "Home"})
})

app.get("/projects", (req,res)=>{
    res.render("projects",{title : "Projects"})
})

app.use(express.static(path.join(__dirname, 'public'))) 


// database connection
mongoose.connect(process.env.DATABASE_KEY,{useNewUrlParser : true,useUnifiedTopology: true })
console.log(process.env.DATABASE_KEY)


const postSchema = {
    date: {
        type : String,
        required: true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String, 
        required : true
    }
}

// convert date to url friendly

function convertDate(date){
    return _.kebabCase(date)
}

// ----------------------------

const Post = mongoose.model("Post", postSchema)

app.get("/blog", (req,res)=>{
    Post.find({}, (err, foundPosts)=>{
        if(!err){
            if(foundPosts){
                res.render("blog", {posts: foundPosts, urlDate: convertDate ,title:"Blog"})
            }else{
                console.log("we did not find any posts")
            }
        }else{
            console.log("there is an error")
            console.log(err)
        }
    })
})

function deKebab(date){
    return date.substring(0,2) + " " +  _.capitalize(date.substring(3, date.length-5)) + ", " + date.substring(date.length-4)
}

app.route("/blog/:blogDate")

    .get((req,res)=>{
        Post.findOne( {date:deKebab(req.params.blogDate)} , (err, foundPost)=>{
            if(!err){
                if(foundPost){
                    res.render("blogPost", {post : foundPost, title: req.params.blogDate})
                }
            }
        })
    })

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000")
})
