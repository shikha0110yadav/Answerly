const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const UserCounter = require('./models/userCounter');
const Question = require('./models/question');
const QuestionCounter = require('./models/questionCounter');
const AnswerCounter = require('./models/answerCounter');
const QuestionCommentCounter = require('./models/questionCommentCounter');
const AnswerCommentCounter = require('./models/answerCommentCounter');
const Blog = require('./models/blog');
const BlogCounter = require('./models/blogCounter');
const BlogCommentCounter = require('./models/blogCommentCounter');
//const router = require('./routes/path.js');
const DB = require('./database');
const app = express();

const fn = async () => {
    await DB();
    app.listen(process.env.PORT, process.env.HOSTNAME, () => {
        console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);
    });
}

fn();
app.use(express.json());

app.post('/signup', async(req, res)=>{
    const {curr_id} = await UserCounter.findOne({counter: "id"});
    const user_id =curr_id;
    const {user_name, Name, email, password} = req.body;
    const alreadyUser = await User.findOne({email:email});
    var name = Name;
    if(alreadyUser){
        res.json("Email Already Registered");
    }
    else{
        try{
            const user = await User.create({user_id, user_name, name, email, password});
            const usercounter = await UserCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
            res.status(200).json("User Registered Successfully");
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }   
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const CheckUser = await User.findOne({email:email});
    if(CheckUser){
        const user = CheckUser.toJSON();
        if(password == user.password){
            res.json(user);
        }
        else{
            res.json("Incorrect Password");
        }
    }
    else{
        res.json("Email is not Registered");
    }
});

app.post("/question", async(req, res)  => {
    // Here Request comes when user uploads Question 
    const {curr_id} = await QuestionCounter.findOne({counter: "id"});
    const question_id =curr_id;
    const {question_title, question, posted_by_id, posted_by} = req.body;
    const time = new Date();
    try{
        const ques = await Question.create({question_id, question_title, question, time, posted_by, posted_by_id});
        const questioncounter = await QuestionCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
        const rating = await User.findOneAndUpdate({user_id:posted_by_id},{"$inc":{"rating":10}});
        res.status(200).json(ques);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});

app.post("/edit-question", async(req, res) => {
    const {question, question_title, question_id} = req.body;
    try{
        const questionupdatetitle = await Question.findOneAndUpdate({question_id:question_id},{"$set":{"question_title":question_title}});
        const questionupdate = await Question.findOneAndUpdate({question_id:question_id},{"$set":{"question":question}});
        const checkquestion = await Question.findOne({question_id: question_id});
        console.log(checkquestion);
        res.status(200).json(checkquestion);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});

app.get("/show-all-question", async(req, res) => {
    // Display all Question and also search the question
    const questions = await Question.find({});
    res.status(200).json(questions);
});

app.get("/specific-question", async(req, res) => {
    const question_id = req.query.question_id;
    const question = await Question.findOne({question_id : question_id});
    console.log(question);
    res.status(200).json(question);
});

app.get("/specific-answer", async(req, res) => {
    const answer_id = req.query.answer_id;
    const question_id = req.query.question_id;
    const question = await Question.findOne({question_id : question_id, "answer.answer_id": answer_id});
    console.log("-------------------------------------------------------------------------------");
    console.log(question.answer);
    res.status(200).json(question.answer);
})

app.post("/upload-answer", async(req, res) => {
    const {curr_id} = await AnswerCounter.findOne({counter: "id"});
    const answer_id = curr_id;
    const {ans, question_id, posted_by, posted_by_id} = req.body;
    console.log(req.body);
    const time = new Date();
    console.log(ans);
    console.log(question_id);
    console.log(posted_by);
    const answer = await Question.findOneAndUpdate({question_id: question_id},{"$push":{"answer":{answer_id, ans, posted_by, posted_by_id, time}}});
    const checkanswer = await Question.findOne({question_id: question_id});
    //console.log(checkanswer.answer);
    const answercounter = await AnswerCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
    const rating = await User.findOneAndUpdate({user_id:posted_by_id},{"$inc":{"rating":10}});
    return res.status(200).json(checkanswer);
});

app.post("/edit-answer", async(req, res) => {
    const {ans, answer_id, question_id} = req.body; 
    try{
        const answerupdatetitle = await Question.findOneAndUpdate({question_id:question_id, "answer.answer_id":answer_id},{"$set":{"answer.$.ans":ans}});
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});

app.post("/comment-on-question", async(req, res) => {
    const {curr_id} = await QuestionCommentCounter.findOne({counter: "id"});
    const comment_id =curr_id;
    const {message, question_id, by, by_id} = req.body;
    const time = new Date();
    const comment = await Question.findOneAndUpdate({question_id: question_id},{"$push":{"comments":{comment_id, message, by, by_id, time}}});
    const checkcomment = await Question.findOne({question_id: question_id});
    const rating = await User.findOneAndUpdate({user_id:by_id},{"$inc":{"rating":2}});
    const questioncommentcounter = await QuestionCommentCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
    return res.status(200).json(checkcomment);
});

app.post("/comment-on-answer", async(req, res) => {
    const {curr_id} = await AnswerCommentCounter.findOne({counter: "id"});
    const comment_id =curr_id;
    const {message, question_id, answer_id, by, by_id} = req.body;
    const time = new Date();
    const comment = await Question.findOneAndUpdate({question_id: question_id, "answer.answer_id":answer_id},{"$push":{"answer.$.comments":{comment_id, message, by, by_id, time}}});
    const checkcomment = await Question.findOne({question_id: question_id});
    const rating = await User.findOneAndUpdate({user_id:by_id},{"$inc":{"rating":2}});
    const answercommentcounter = await AnswerCommentCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
    return res.status(200).json(checkcomment);
});

app.post("/share-viva-experience", async(req, res) => {
    // Here Request comes when user uploads Blog 
    const {curr_id} = await BlogCounter.findOne({counter: "id"});
    const blog_id =curr_id;
    const {blog_title, blog, posted_by, posted_by_id} = req.body;
    const time = new Date();
    try{
        const blg = await Blog.create({blog_id, blog_title, blog, posted_by, posted_by_id, time});
        const blogcounter = await BlogCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
        const rating = await User.findOneAndUpdate({user_id:posted_by_id},{"$inc":{"rating":20}});
        res.status(200).json(blg);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});

app.post("/edit-viva-experience", async(req, res) => {
    const {blog, blog_title, blog_id} = req.body;
    try{
        const blogupdatetitle = await Blog.findOneAndUpdate({blog_id:blog_id},{"$set":{"blog_title":blog_title}});
        const blogupdate = await Blog.findOneAndUpdate({blog_id:blog_id},{"$set":{"blog":blog}});
        const checkblog = await Blog.findOne({blog_id: blog_id});
        res.status(200).json(checkblog);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});

app.post("/comment-on-blog", async(req, res) => {
    const {curr_id} = await BlogCommentCounter.findOne({counter: "id"});
    const comment_id = curr_id;
    const {message, blog_id, by, by_id} = req.body;
    const time = new Date();
    try{
        const comment = await Blog.findOneAndUpdate({blog_id:blog_id},{"$push":{"comments":{comment_id, message, by, by_id, time}}});
        const checkcomment = await Blog.findOne({blog_id:blog_id});
        const rating = await User.findOneAndUpdate({user_id:by_id},{"$inc":{"rating":2}});
        const blogcommentcounter = await BlogCommentCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
        return res.status(200).json(checkcomment);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});

app.get("/show-all-blog", async(req, res) => {
    // Display all Question and also search the question
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
});

app.get("/specific-blog", async(req, res) => {
    // Display all Question and also search the question
    const blog_id = req.query.blog_id;
    const blog = await Blog.findOne({blog_id : blog_id});
    res.status(200).json(blog);
});

app.get("/top-user", async(req, res) => {
    try{
        const user_list = await User.find({}).sort({"rating" : -1});
        res.status(200).json(user_list);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
});

app.post("/like-blog", async(req, res) => {
    const {blog_id, liked_by_id} = req.body;
    const userHasVotedAlready = await Blog.findOne({blog_id : blog_id, "likes_by.liked_by_id":liked_by_id});
    if(userHasVotedAlready){
        console.log(userHasVotedAlready);
        try{
            const addvote = await Blog.findOneAndUpdate({blog_id : blog_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : 1}});
            console.log(addvote);
            const addtotalvote = await Blog.findOneAndUpdate({blog_id : blog_id}, {"$inc" : {"likes" : 1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    else{
        try{
            const value = 1;
            console.log("else");
            const addvote = await Blog.findOneAndUpdate({blog_id : blog_id}, {"$push": {"likes_by" : {liked_by_id: liked_by_id,value: value}}});
            const checkblog = await Blog.findOne({blog_id: blog_id});
            const addtotalvote = await Blog.findOneAndUpdate({blog_id : blog_id}, {"$inc" : {"likes" : 1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    return res.status(200).json("Likes Updated");
})

app.post("/remove-like-blog" , async(req, res) => {
    const {blog_id, liked_by_id} = req.body;
    try{
        const removevote = await Blog.findOneAndUpdate({blog_id : blog_id},{$pull: { likes_by: { liked_by_id: liked_by_id}}});
        const addtotalvote = await Blog.findOneAndUpdate({blog_id : blog_id}, {"$inc" : {"likes" : -1}});
        res.status(200).json("Like Removed");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

app.post("/convert-dislike-to-like-blog", async(req, res) => {
    const {blog_id, liked_by_id} = req.body;
    try{
        const addvote = await Blog.findOneAndUpdate({blog_id : blog_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : 1}});
        const addtotalvote = await Blog.findOneAndUpdate({blog_id : blog_id}, {"$inc" : {"likes" : 2}});
        res.status(200).json("Like Added");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

app.post("/convert-like-to-dislike-blog", async(req, res) => {
    const {blog_id, liked_by_id} = req.body;
    try{
        const addvote = await Blog.findOneAndUpdate({blog_id : blog_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : -1}});
        const addtotalvote = await Blog.findOneAndUpdate({blog_id : blog_id}, {"$inc" : {"likes" : -2}});
        res.status(200).json("Like Added");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

app.post("/remove-dislike-blog" , async(req, res) => {
    const {blog_id, liked_by_id} = req.body;
    try{
        const removevote = await Blog.findOneAndUpdate({blog_id : blog_id},{$pull: { likes_by: { liked_by_id: liked_by_id}}});
        const addtotalvote = await Blog.findOneAndUpdate({blog_id : blog_id}, {"$inc" : {"likes" : 1}});
        res.status(200).json("Like Removed");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

app.post("/dislike-blog", async(req, res) => {
    const {blog_id, liked_by_id} = req.body;
    const userHasVotedAlready = await Blog.findOne({blog_id : blog_id, "likes_by.liked_by_id":liked_by_id});
    if(userHasVotedAlready){
        console.log(userHasVotedAlready);
        try{
            const addvote = await Blog.findOneAndUpdate({blog_id : blog_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : -1}});
            console.log(addvote);
            const addtotalvote = await Blog.findOneAndUpdate({blog_id : blog_id}, {"$inc" : {"likes" : -1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    else{
        try{
            const value = -1;
            console.log("else");
            const addvote = await Blog.findOneAndUpdate({blog_id : blog_id}, {"$push": {"likes_by" : {liked_by_id: liked_by_id,value: value}}});
            const checkblog = await Blog.findOne({blog_id: blog_id});
            const addtotalvote = await Blog.findOneAndUpdate({blog_id : blog_id}, {"$inc" : {"likes" : -1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    return res.status(200).json("Likes Updated");
})


app.post("/like-question", async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    const userHasVotedAlready = await Question.findOne({question_id : question_id, "likes_by.liked_by_id":liked_by_id});
    if(userHasVotedAlready){
        console.log(userHasVotedAlready);
        try{
            const addvote = await Question.findOneAndUpdate({question_id : question_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : 1}});
            console.log(addvote);
            const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : 1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    else{
        try{
            const value = 1;
            console.log("else");
            const addvote = await Question.findOneAndUpdate({question_id : question_id}, {"$push": {"likes_by" : {liked_by_id: liked_by_id,value: value}}});
            const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : 1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    return res.status(200).json("Likes Updated");
})

app.post("/remove-like-question" , async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    try{
        const removevote = await Question.findOneAndUpdate({question_id : question_id},{$pull: { likes_by: { liked_by_id: liked_by_id}}});
        const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : -1}});
        res.status(200).json("Like Removed");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

app.post("/convert-dislike-to-like-question", async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    try{
        const addvote = await Question.findOneAndUpdate({question_id : question_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : 1}});
        const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : 2}});
        console.log("Dislike to Like");

        res.status(200).json("Like Added");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

app.post("/convert-like-to-dislike-question", async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    try{
        const addvote = await Question.findOneAndUpdate({question_id : question_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : -1}});
        const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : -2}});
        console.log("Like to Dislike");
        res.status(200).json("Dislike Added");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

app.post("/remove-dislike-question" , async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    try{
        const removevote = await Question.findOneAndUpdate({question_id : question_id},{$pull: { likes_by: { liked_by_id: liked_by_id}}});
        const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : 1}});
        res.status(200).json("Like Removed");
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
})

app.post("/dislike-question", async(req, res) => {
    const {question_id, liked_by_id} = req.body;
    const userHasVotedAlready = await Question.findOne({question_id : question_id, "likes_by.liked_by_id":liked_by_id});
    if(userHasVotedAlready){
        console.log(userHasVotedAlready);
        try{
            const addvote = await Question.findOneAndUpdate({question_id : question_id, "likes_by.liked_by_id":liked_by_id}, {"$set": {"likes_by.$.value" : -1}});
            console.log(addvote);
            const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : -1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    else{
        try{
            const value = -1;
            console.log("else");
            const addvote = await Question.findOneAndUpdate({question_id : question_id}, {"$push": {"likes_by" : {liked_by_id: liked_by_id,value: value}}});
            const addtotalvote = await Question.findOneAndUpdate({question_id : question_id}, {"$inc" : {"likes" : -1}});
            console.log(addtotalvote);
        }
        catch(err){
            res.status(400).json({error:err.message});
        }
    }
    return res.status(200).json("Likes Updated");
})

//Profile Section 
app.get("/profile/info", async(req, res) => {
    const user_id = req.query.user_id;
    const user = await User.find({user_id:user_id});
    //console.log(user);
    res.status(200).json(user);
})

app.get("/profile/myques", async(req, res) => {
    const user_id = req.query.user_id;
    const questions = await Question.find({posted_by_id : user_id});
    res.status(200).json(questions);
})

app.get("/profile/myblog", async(req, res) => {
    const user_id = req.query.user_id;
    const blogs = await Blog.find({posted_by_id : user_id});
    res.status(200).json(blogs);
})

app.get("/profile/myanswers", async(req, res) => {
    const user_id = req.query.user_id;
    const answers = await Question.find({"answer": {$elemMatch: {"posted_by_id": user_id}}});
    res.status(200).json(answers);
})

// app.post("/reply-comment-on-question", async(req, res) => {
//      // question_id will come along with request
//      // question_id will come along with request
//     const question_id = 2;
//     const comment_id = 1;
//     const {message} = req.body;
//     const time = new Date();
//     const by = "Kashyap";
//     const reply = await Question.findOneAndUpdate({question_id: question_id, "comments.comment_id": comment_id},{"$push":{"comments.$.reply":{message, by, time}}});
//     const checkreply = await Question.findOne({question_id: question_id});
//     return res.status(200).json(checkreply);
// });


// app.post("/reply-comment-on-answer", async(req, res) => {
//     // question_id will come along with request
//     // question_id will come along with request
//    const question_id = 2;
//    const answer_id = 4;
//    const comment_id = 2;
//    const {message} = req.body;
//    const time = new Date();
//    const by = "Kashyap";
//    const reply = await Question.findOneAndUpdate(
//             {question_id: question_id, "answer.answer_id": answer_id, "answer.comments.comment_id":comment_id},
//             {"$push":{"answer.$.comments.$[comment].reply":{message, by, time}}}, 
//             {arrayFilters: [{'comment.comment_id': comment_id}]
//   });   
//    const checkreply = await Question.findOne({question_id: question_id});
//    return res.status(200).json(checkreply);
// });

// app.post("/reply-comment-on-blog", async(req, res) => {
//     // blog_id will come along with request
//     // comment_id will come along with request
//     const blog_id = 1;
//     const comment_id = 3;
//     const {message} = req.body;
//     const time = new Date();
//     const by = "Kashyap";
//     try{
//         const reply = await Blog.findOneAndUpdate({blog_id: blog_id, "comments.comment_id": comment_id},{"$push":{"comments.$.reply":{message, by, time}}});
//         const checkreply = await Blog.findOne({blog_id: blog_id});
//         return res.status(200).json(checkreply);
//     }
//     catch(err){
//         res.status(400).json({error:err.message});
//     }
// });

// app.post("/edit-question-title", async(req, res) => {
//     const {question_title} = req.body;
//     // const time = new Date();
//     // question id comes along with request
//     const question_id = 1;
//     try{
        
//         const checkquestion = await Question.findOne({question_id: question_id});
//         res.status(200).json(checkquestion);
//     }
//     catch(err){
//         res.status(400).json({error:err.message});
//     }
// });

// app.post("/edit-viva-experience-title", async(req, res) => {
//     const {blog_title} = req.body;
//     // const time = new Date();
//     // blog id comes along with request
//     const blog_id = 1;
//     try{
        
//         const checkblog = await Blog.findOne({blog_id: blog_id});
//         res.status(200).json(checkblog);
//     }
//     catch(err){
//         res.status(400).json({error:err.message});
//     }
// });