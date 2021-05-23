const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile:{
        type:String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    imageURL: {
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const UserModel = mongoose.model('customerData', UserSchema)



module.exports = {
    UserModel
}