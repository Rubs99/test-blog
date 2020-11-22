const mongoose= require ('mongoose');
const {Schema} =mongoose;

const postSchema= new Schema({

    idUser:{type: Schema.ObjectId, ref: "User"},
    userName:{type:String},
    description:{type:String},
    image: { type: String, required: false },
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    created_at: { type: Date, default: Date.now(), required: true }

});

module.exports= mongoose.model('Post',postSchema);