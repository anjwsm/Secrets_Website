const mongoose =require('mongoose');
// user model
//schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true
    }
},
{
    timestamps:true
}
);
const User = mongoose.model('users' ,userSchema);

//secretmodel
const secretSchema = new mongoose.Schema({
    title: String,
    secret:String,
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId for referencing users
        ref: 'users', // Reference the 'users' model
        required: true
    }
},
{
    timestamps:true
});
const Secret = mongoose.model('secrets',secretSchema);

module.exports={User,Secret};