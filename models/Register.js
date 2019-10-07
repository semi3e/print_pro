var mongoose = require("mongoose");


//schema
var userSchema = mongoose.Schema({
    student_id:{type:String, required:true},
    password:{type:String, required:true},
    confirmpassword:{type:String, required:true},
    email:{type:String,required:true}
})


// model export

var Register =mongoose.model("register",registerSchema);
module.exports = Register;