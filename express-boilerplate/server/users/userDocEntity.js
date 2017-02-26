const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema ({

});
const educationSchema = new mongoose.Schema ({
 primary: String,
 highSchool: String,
 university: String
});
const listSchema = new mongoose.Schema ({
 heading: String,
 category: String,
 statement: String,
 image: String,
 addedOn: String,
 upVote: Number,
 postedBy: String,
 acceptedCount: Number,
 downVote: Number
});
const profileSchema = new mongoose.Schema ({

});
const watchlistSchema = new mongoose.Schema({
 heading: String,
 category: String,
 statement: String,
 postedBy: String,
 addedOn: String,
 noofans: Number,
 upVotes: Number,
 downVotes: Number,
 acceptedCount: Number
});
const reportSchema = new mongoose.Schema({
 type: String,
 count: Number
});
const commentsSchema = new mongoose.Schema({
 commentText: String,
 commentedBy: String,
 commentedOn: String
});
const answersSchema = new mongoose.Schema({
 statement: String,
 addedOn: String,
 image: String,
 upVote: Number,
 downVote: Number
});
const schema = new mongoose.Schema({
   emailId: {
     type: String,
     required: true
   },
   profile: {
     picture: String,
     description: String,
     dob: String,
     gender: String,
     address: {
       Line1: String,
       Line2: String,
       country: String,
       region: String,
       city: String,
       postalCode: String
     },
     education: {
       type: mongoose.Schema.Types.ObjectId,
       ref: educationSchema
     },
     phone: String
   },
   lists: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: listSchema
   }],
   answers: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: answersSchema
   }],
   watchingList: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: watchlistSchema
   }],
   watchingTopic: [{
     type: String
   }],
   interestCategory: [{
     type: String
   }],
   reputation: {
     type: Number
   },
   followingUser: [{
     type: Number
   }],
   followerCount: {
     type: Number
   },
   report: {
     type: mongoose.Schema.Types.ObjectId,
     ref: reportSchema
   },
   comments: {
     type: mongoose.Schema.Types.ObjectId,
     ref: commentsSchema
   }
});
const model = mongoose.model('userDoc', schema);
module.exports = {
  model
};
