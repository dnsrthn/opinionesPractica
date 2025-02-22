import { Schema, model } from "mongoose"

const comentsSchema = Schema({
    text:{
        type: String,
        required: [true, "The text is required"],
        maxLength: [100, "  The text must be less than 100 characters"]
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

export default model("Comments", comentsSchema)