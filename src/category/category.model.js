import { Schema, model } from "mongoose"
 
const categorySchema = Schema ({
    name:{
        type: String,
        required: [true, "Name for the category is required"],
        maxLength: [20, "Category name can't be longer than 20 characters"],
    },
    status:{
        type: Boolean,
        default: true
    },
})
 
export default model("Category", categorySchema)