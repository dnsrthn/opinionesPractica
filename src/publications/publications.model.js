import { Schema, model } from "mongoose"
 
const publicationsSchema = Schema({
    title:{
        type: String,
        required: [true, " A title is required"],
        maxLength: [25, "The title can't be longer than 25 characters"]
    },
    category:{
        type: Schema.ObjectId,
        ref: 'Category',
        required: true,
    },
    text:{
        type: String,
        required: [true, "Text is required"],
        maxLength: [100, "Text can't be longer than 100 characters"]
    },
    status:{
        type: Boolean,
        default: true
    },
    comments:[{
        type: Schema.ObjectId,
        ref: 'Comments'
    }],
    user:{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
})

export default model("Publications", publicationsSchema)