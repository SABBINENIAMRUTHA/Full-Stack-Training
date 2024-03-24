// const exp=require('express')
// const authorApp=exp.Router()
// const bcryptjs=require('bcryptjs')
// const jwt=require('jsonwebtoken')
// //const verifyToken=('../MiddleWares/verifyToken')
// let authorsCollection;
// let articlesCollection;
// authorApp.use((req,res,next)=>{
//     authorsCollection=req.app.get('authorsCollection')
//     articlesCollection=req.app.get('articlesCollection')
//     next()
// })
// authorApp.get('/test-author',(req,res)=>{
//    res.send('from author api')
// })
// //create author
// authorApp.post('/register',async(req,res)=>{
//     let newAuthor=req.body
//     //Check for dupilcate user by username
//     let dbAuthor=await authorsCollection.findOne({username:newAuthor.username})
//     //if author already existed
//     if(dbAuthor!=null){
//         res.send({message:"User already existed"})
//     }
//     //hash the password
//     let hashedPassword=await bcryptjs.hash(newAuthor.password,6)
//     //replace
//     newAuthor.password=hashedPassword
//     //save to db
//     await authorsCollection.insertOne(newAuthor)
//     //send res
//     res.send({message:"Author Created"})
//     //res.send('from author api')
// })

// //login author
// authorApp.post('/login',async(req,res)=>{
//     //get author credobj
//     const credobj=req.body;
//     //verify username
//     let dbAuthor=await authorsCollection.findOne({username:credobj.username})
//     //if uer not found
//     if(dbAuthor===null){
//         res.send({message:"Invalid Username"})
//     } else{
//         let result=await bcryptjs.compare(credobj.password,dbAuthor.password)
//         //if passwords not matched
//         if(result===false){
//             res.send({message:"Invalid Password"})
//         }else{
//             //create token
//             let signedToken=jwt.sign({username:dbAuthor.username},'abcdef',{expiresIn:30})
//             //send token as req
//             res.send({message:"Author Login Success",token:signedToken,author:dbAuthor})
//         }
//     }
// })

// //add article
// authorApp.post('/article',async(req,res)=>{
//     //get new article from req
//     const newArticle=req.body;
//     //save to article collection
//     await articlesCollection.insertOne(newArticle)
//     //send res
//     res.send({message:"New Article added"})

// })

// //read articles
// authorApp.get('/articles/:username',async(req,res)=>{
//     //get author's username from url
//     let authorUsername=req.params.username;
//     //get articlesof current author
//     let articlesList=await articlesCollection.find({username:authorUsername}).toArray();
//     //send res
//     res.send({message:"Articles",payload:articlesList})
// })

// //delete or restore articles
// authorApp.put('/articles/:username/:articleId',async(req,res)=>{
//     //get article id  from url
//   let articleIdOfUrl=req.params.articleId
//     let currentStatus=req.body.status
// if(currentStatus===true)
// {
//     let removedArticle=await articlesCollection.findOneAndUpdate({articleId:articleIdOfUrl},{$set:{status:true}},{returnDocument:"after"})
//     res.send({message:"Article removed",payload:removedArticle})
// }
// if(currentStatus===false)
// {
//     let restoredArticle=await articlesCollection.findOneAndUpdate({articleId:articleIdOfUrl},{$set:{status:false}},{returnDocument:"after"})
//     res.send({message:"Article removed",payload:restoredArticle})
// }

// })
    



// //edit articles
// authorApp.put('/articles',async(req,res)=>{
//     //get modified article from req
//     let modifiedArticle=req.body;
//     //update article by its id
//     let articleAfterModification=await articlesCollection.findOneAndUpdate(
//         {articleId:modifiedArticle.articleId},
//         {$set:{...modifiedArticle}},
//         {returnDocument:"after"});
//     //send res
//     res.send({message:"Author Article Updated",payload:modifiedArticle});

//     });

// module.exports=authorApp










const exp=require('express')
const authorApp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

let authorsCollection;
let articlesCollection;
authorApp.use((req,res,next)=>{
    authorsCollection=req.app.get('authorsCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
})
// authorApp.get('/test-author',(req,res)=>{
//     res.send('from author api')
// })
authorApp.post('/login',async(req,res)=>{
    const credObj=req.body;
    let dbAuthor= await authorsCollection.findOne({username:credObj.username})
   if(dbAuthor ===null){
   return res.send({message:"invalid username"})
   }else{
  let result= await bcryptjs.compare(credObj.password,dbAuthor.password)
   //if passwords not matched
     if(result===false){
    res.send({message:"invalid password"})
      }else{
        //create token
        let signedToken=jwt.sign({username:dbAuthor.username},'abcdef',{expiresIn:30})
        res.send({message:"Author login success",token:signedToken,author:dbAuthor})

      }
   }
})
authorApp.post('/register',async(req,res)=>{
    let newAuthor=req.body
    //check for duplicate user
   let dbAuthor= await authorsCollection.findOne({username:newAuthor.username})
   if(dbAuthor !=null){
   return res.send({message:"author already existed"})
   }
    //hash the password
    let hashedPassword=await bcryptjs.hash(newAuthor.password,6)
    //replace
    newAuthor.password=hashedPassword
    await authorsCollection.insertOne(newAuthor)
    res.send({message:"Author Created"});
    //res.send('from author api')
})
//article creating
authorApp.post('/article',async(req,res)=>{
    //get new article
    const newArticle=req.body;
    //save to article collection
    await articlesCollection.insertOne(newArticle)
res.send({message:" new article added "})
const verifyToken=require('../Middlewares/verifyToken')

})
//
authorApp.get('/articles/:username',async(req,res)=>{
    let authorUsername=req.params.username;
    let articlesList=await articlesCollection.find({username:authorUsername}).toArray()
    res.send({message:"articles",payload:articlesList})
})
//delete
authorApp.put('/articles/:username/:articleId',async(req,res)=>{
    let articleIdOfUrl=req.params.articleId;
    // get status from req
    let currentStatus=req.body.status;
    if(currentStatus===true){
    let removedArticle=await articlesCollection.findOneAndUpdate(
        {articleId:articleIdOfUrl},
        {$set:{status:true}},
        {returnDocument:"after"});
        res.send({message:"aricle removed",payload:removedArticle})}

    if(currentStatus===false){
        let restoredArticle=await articlesCollection.findOneAndUpdate(
            {articleId:articleIdOfUrl},
            {$set:{status:true}},
            {returnDocument:"after"});
        res.send({message:"aricle restored",payload:restoredArticle})}
    })
    // edit article
    authorApp.put('/article',async(req,res)=>{
        let modifiedArticle=req.body;
        let articleAftermodification=await articlesCollection.findOneAndUpdate(
            {articleId:modifiedArticle.articleId},
            {$set:{...modifiedArticle}},
            {returnDocument:"after"});
        
    //send res
    res.send({message:"article updated",payload:articleAftermodification})
        })

    module.exports=authorApp;