const mongoose =require('mongoose');

const studentSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    dateDeNaissance: {
        type: Date,
        required: true,
    },
    classe: {
        type: String,
        required: true,    
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    sexe: {
        type: String,
        required:true,
    }

})

var studentdata=mongoose.model('Students',studentSchema);
module.exports= studentdata;