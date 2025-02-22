import Category from "../category/Category.js"

export const defaultCategory = async() =>{
    try{
        const categoryExists = await  Category.findOne({ name: "default" })
 
        if(categoryExists){
            console.log("Default category already exists");
            return
        }
 
        const categoryData ={
            name: "default"
        }
        const newCategory = new Category(categoryData)

        await newCategory.save()
        console.log("Category by default created successfully")

    }catch(err){
        console.error("Errorr whuiel creating default category:", err.message)
    }
}