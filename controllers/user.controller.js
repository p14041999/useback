const User = require('../models/user');
const bcrypt = require('bcrypt');
const rstring = require('randomstring');
const { sendVerificationMail } = require('./mail.controller');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res)=>{
    try {
        let {name,email,password,ref} = req.body;
        let encryptedPassword = bcrypt.hashSync(password,process.env.SECRET_HASH);
        let refURI = rstring.generate(16);
        let emailVerifier = rstring.generate(64);
        if(ref=="NA"){
            let user = new User({
                email,
                name,
                password:encryptedPassword,
                emailPhrase:emailVerifier,
                refURI,
            })
            await user.save();
            await sendVerificationMail(user);
            let key = jwt.sign(user._id,process.env.SECRET_HASH);
            res.send({
                success:true,
                token:key
            });
        }else{
            let refferer = await User.findOne({refURI:ref});
            if(refferer){
                let user = new User({
                    email,
                    name,
                    password:encryptedPassword,
                    emailPhrase:emailVerifier,
                    refURI,
                    parent:{
                        name: refferer.name,
                        id: refferer.refURI
                    }
                })
                await user.save();
                await sendVerificationMail(user);
                refferer.reffered = refferer.reffered+1;
                await refferer.save();
                let key = jwt.sign(user._id,process.env.SECRET_HASH);
                res.send({
                    success:true,
                    token:key
                });
            }else{
                let user = new User({
                    email,
                    name,
                    password:encryptedPassword,
                    emailPhrase:emailVerifier,
                    refURI,
                })
                await user.save();
                await sendVerificationMail(user);
                let key = jwt.sign(user._id,process.env.SECRET_HASH);
                res.send({
                    success:true,
                    token:key
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong!"
        });
    }
}

exports.signin = async (req,res)=>{
    try {
        let {email,password} = req.body;
        let user = await User.findOne({email});
        if(user){
            if(bcrypt.compareSync(password,user.password)){
                console.log("SIGN IN SUCCESS!");
                let key = jwt.sign(user._id,process.env.SECRET_HASH);
                res.send({
                    success:true,
                    token:key
                });
            }else{
                res.send({
                    success:false,
                    message:"Email or Password is Incorrect!"
                })
            }
        }else{
            res.send({
                success:false,
                message:"Email or Password is Incorrect!"
            })
        }
    } catch (error) {
        console.log("SIGNIN ERROR:",error);
        res.status(500).send({
            success:false,
            message:"SOME ERROR HAPPENED!"
        })
    }
}


exports.verifyMail = async (req,res)=>{
    try {
        let { phrase } = req.body;
        let user = await User.findOne({emailPhrase:phrase});
        if(user){
            if(!user.isEmailVerified){
                user.isEmailVerified = true;
                await user.save();
                let refferer = await User.findOne({refID:user.parent.id});
                refferer.validRef = refferer.validRef + 1;
                await refferer.save();
                let key = jwt.sign(user._id,process.env.SECRET_HASH);
                res.send({
                    success:true,
                    token:key
                });
            }else{
                res.send({
                    success:false,
                    message:"User already verified!"
                });
            }
        }else{
            res.send({
                success:false,
                message:"Some Error Happens!"
            });
        }
    } catch (error) {
        console.log("VerifyMail Catch an Error:",error);
    }
}

exports.forgotPasswordMail = async (req,res)=>{}


exports.forgotPassword = async (req,res)=>{}

exports.getInfo = async (req,res)=>{
    try {
        let id = req.user;
        let user = await User.findById(id);
        if(user){
            user = user.toObject();
            delete user['password'];
            res.send({
                success:true,
                user
            });
        }else{
            res.send({
                success:false,
                message:"Something Went Wrong!"
            })
        }
    } catch (error) {
        console.log("GETINFO ERROR:",error)
        res.status(500).send({
            success:false,
            message:"Something Went Wrong!"
        })
    }
}
