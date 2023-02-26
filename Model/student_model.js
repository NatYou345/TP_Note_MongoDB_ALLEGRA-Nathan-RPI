const mongoose =require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    class: {
        type: String,
        required: true,    
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    boy_or_girl: {
        type: String,
        required:true,
    }

})

var studentdata=mongoose.model('Students',studentSchema);
module.exports= studentdata;