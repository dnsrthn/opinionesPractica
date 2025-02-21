import { Schema, model } from "mongoose"
 
const categorySchema = Schema ({
    name:{
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        maxLength: [20, "Category name must be less than 20 characters"],
    },
    status:{
        type: Boolean,
        default: true
    },
})
 
export default model("Category", categorySchema)