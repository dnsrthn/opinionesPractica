import Category from "./category.model.js"
import Publication from "../publication/publication.model.js"

export const addCategory = async (req, res) =>{
    try{
        const {name} = req.body

        const  newCategory= new Category({
            name
        })

        const saveCategory = await newCategory.save()

        return res.status(201).json({
            success: true,
            message: "Category added",
            publication: saveCategory
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while adding the category",
            error: err.message
        })
    }
}

export const editCategory = async (req, res) =>{
    try{
        const {caid} = req.params
        const { name} = req.body
        
        const categoryUp = await Category.findOneAndUpdate(
        {_id: caid}, {name} , { new: true }
           )
           if (!categoryUp) {
            return res.status(403).json({
                success: false,
                message: " Category not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Category updated",
            categoryUp
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while updating the category",
            error: err.message
        })
    }
}


export const deleteCategory = async (req, res) =>{

    try{
        const {caid} = req.params

        const category = await Category.findById(caid)
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        const defaultCategory = await Category.findOne({ name: "default" })
        if (!defaultCategory) {
            return res.status(500).json({
                success: false,
                message: "Default category not found"
            })
        }
        await Publication.updateMany(
            { category: caid }, 
            { category: defaultCategory._id } 
        )
        await Category.findByIdAndDelete(caid);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully and publications updated properly"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while deleting the category",
            error: err.message
        })
    }
}