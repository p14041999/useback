const mongo = require('mongoose');

const userSchema =new mongo.Schema({
    email:{
        type:String,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    emailPhrase:{
        type:String,
    },
    forgotPasswordPhrase:{
        type:String,
        default:'NA'
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    },
    refURI:{
        type:String,
        required:true,
    },
    reffered:{
        type:Number,
        default:0,
    },
    validRef:{
        type:Number,
        default:0
    },
    parent:{
        name:{
            type:String,
            default:"None",
        },
        id:{
            type:String,
            deafult:'NA'
        }
    }
})

module.exports = mongo.model('User',userSchema);