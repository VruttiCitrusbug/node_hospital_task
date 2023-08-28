const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userschema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            trim:true,
            index:{
                unique:true
            },
            unique:true,
            validate(val){
                if(!validator.isEmail(val)){
                    throw new Error('Not valid')
                }
            }
        },
        username:{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            index:{
                unique:true
            },
            unique:true,
        },
        password:{
            type:String,
            required:true,
            minlength: 2,
            trim:true,
            index:{
                unique:true
            },
            unique:true
        },
        firstname:{
            type:String,
            required:true,
            minlength: 2,
            trim:true
        },
        lastname:{
            type:String,
            required:true,
            minlength: 2,
            trim:true
        },
        tokens:[{
            token:{
                type:String,
                require:true
            }
        }]
    }
)

userschema.pre('save',async function(next) {
    const user = this
    console.log(user.isModified('password'))
    if(user.isModified('password'))
    {user.password=await bcrypt.hash(user.password,8)}
    next()
})

const User = mongoose.model('User',userschema)
module.exports=User