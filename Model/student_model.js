const mongoose =require('mongoose');

const studentSchema = mongoose.Schema({
    nom:String,
    dateDeNaissance:Date,
    classe:String,
    email: String,
    sexe: String,
});

var studentdata=mongoose.model('Students',studentSchema);
module.exports= studentdata;