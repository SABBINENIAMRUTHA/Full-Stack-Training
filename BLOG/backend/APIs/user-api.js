// const exp=require('express')
// const userApp=exp.Router()
// const bcryptjs=require('bcryptjs')
// const jwt=require('jsonwebtoken')
// const verifyToken=('../MiddleWares/verifyToken')

// let usersCollection;
// let articlesCollection;

// userApp.use((req,res,next)=>{
//     usersCollection=req.app.get('usersCollection')
//     articlesCollection=req.app.get('articlesCollection')
//     next()
// })
// userApp.get('/test-user',(req,res)=>{
//    res.send('from user api')
// })
// userApp.post('/register',async(req,res)=>{
//     let newUser=req.body
//     //Check for dupilcate user by username
//     let dbUser=await usersCollection.findOne({username:newUser.username})
//     //if author already existed
//     if(dbUser!=null){
//         res.send({message:"User already existed"})
//     }
//     //hash the password
//     let hashedPassword=await bcryptjs.hash(newUser.password,6)
//     //replace
//     newUser.password=hashedPassword
//     //save to db
//     await usersCollection.insertOne(newUser)
//     //send res
//     res.send({message:"User Created"})
//     //res.send('from author api')
// })

// userApp.post('/login',async(req,res)=>{
//     //get author credobj
//     const credobj=req.body;
//     //verify username
//     let dbUser=await usersCollection.findOne({username:credobj.username})
//     //if uer not found
//     if(dbUser===null){
//         res.send({message:"Invalid Username"})
//     } else{
//         let result=await bcryptjs.compare(credobj.password,dbUser.password)
//         //if passwords not matched
//         if(result===false){
//             res.send({message:"Invalid Password"})
//         }else{
//             //create token
//             let signedToken=jwt.sign({username:dbUser.username},'abcdef',{expiresIn:120})
//             //send token as req
//             res.send({message:"User Login Success",token:signedToken,author:dbUser})
//         }
//     }
// })


// // add article
// userApp.post('/article',async(req,res)=>{
//     //get new article from req
//     const newArticle=req.body;
//     //save to article collection
//     await articlesCollection.insertOne(newArticle)
//     //send res
//     res.send({message:"New Article added"})

// })

// //read articles
// userApp.get('/articles/:username',async(req,res)=>{
//     //get author's username from url
//     let userUsername=req.params.username;
//     //get articlesof current author
//     let articlesList=await articlesCollection.find({username:userUsername}).toArray();
//     //send res
//     res.send({message:"Articles",payload:articlesList})
// })


// //delete or restore articles
// userApp.put("/articles/:username/:articleId",async(req,res)=>{
//     //get articleId from url
//     let articleIdOfUrl=req.params.articleId;
//     let removedArticle=await articlesCollection.findOneAndUpdate({articleId:articleIdOfUrl},{$set:{status:false}},{returnDocument:"after"});
//     res.send({message:"Article Removed",payload:removedArticle});
// })

// // get user article
// userApp.get("/articles",verifyToken,async(req,res)=>{
//     //get articles of current author
//     let articlesList= await articlesCollection.find({status:false}).toArray()
//     res.send({message:"articles",payload:articlesList})
// })

// //add comment by user
// // userApp.put('/articles/:articleId/comment',async(req,res)=>{
// //     //get comment obj from req
// //     let commentObj=req.body;
// //     //get articleId from url
// //     let articleIdOfUrl=req.params.articleId;
// //     //add commentObj to comment array of article
// //     let articleWithComment= await articlesCollection.findOneAndUpdate(
// //         {articleId:articleIdOfUrl},
// //         {$addToSet:{comments:commentObj}},
// //         {returnDocument:"after"});
// //     //send res
// //     res.send({message:"Comment Posted",payload: articleWithComment});

// // })


// userApp.put('/article/:articleId/comment',async(req,res)=>{
//     let commentObj=req.body.comments
//     let articleIdOfUrl=req.params.articleId
//     console.log(commentObj,articleIdOfUrl)
//    let articleWithComment= await articlesCollection.findOneAndUpdate(
//         {articleId:articleIdOfUrl},
//         {$addToSet:{comments:commentObj}},{returnDocument:"after"})
//    console.log(articleWithComment)
// res.send({message:"comment posted",payload:articleWithComment})
// })
// module.exports=userApp




const exp  = require('express')
const userApp = exp.Router()
const brcyptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken=require('../Middlewares/verifyToken')

let usersCollection;
let articlesCollection;
userApp.use((req,res,next)=>{
    usersCollection = req.app.get('usersCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

userApp.post('/register',async(req,res)=>{
    //get author from request
    let newUser = req.body;
    //console.log(newAuthor)
   let dbUser= await  usersCollection.findOne({username: newUser.username})
   if(dbUser != null){
    return res.send({message:"user already existed"})
   }
    //hash the password
    let hashedPassword = await brcyptjs.hash(newUser.password,6)
    //replace plain pw with hash
    newUser.password = hashedPassword;
    //save to db
    await usersCollection.insertOne(newUser);
    //send res
    res.send({message:"User created"})
})

userApp.post('/login',async(req,res)=>{
    const credObj = req.body;
    let dbUser = await usersCollection.findOne({username: credObj.username})
    //if user not found
    if(dbUser ===  null){
        res.send({message:"Invalid username"})
    }
    else{
       let result = await brcyptjs.compare(credObj.password,dbUser.password)
       //if password not matched
       if(result === false){
        res.send({message:"Invalid password"})
       }
       else{
        //create token 
        let signedtoken = jwt.sign({username:dbUser.username},'abcdef',{expiresIn:130});
        delete dbUser.password;
        //send token
        res.send({message:"login success",token:signedtoken,author:dbUser});
       }
    }
})

userApp.get('/test-user',(req,res)=>{
   res.send('from user api')
})
userApp.get("/articles",verifyToken,async(req,res)=>{
    let articlesList=await articlesCollection
    .find({status:true})
    .toArray();
    res.send({message:"articles",payload:articlesList});
})

//add comment by user
userApp.put('/article/:articleId/comment',async(req,res)=>{
let commentObj=req.body;
//get article id from url
let articleIdOfUrl=req.params.articleId;
//add comment
let articleWithComment=await articlesCollection.findOneAndUpdate(
    {articleId:articleIdOfUrl},
    {$addToSet:{commentObj}},
    {returnDocument:"after"});
 res.send({message:"comment posted",payload:articleWithComment})
})
module.exports = userApp;