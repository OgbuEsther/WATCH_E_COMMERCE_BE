import mongoose from "mongoose"

interface cats {
    name : string
    products:{}[]
}

interface Icats extends cats , mongoose.Document{}


const catSchema = new mongoose.Schema<cats>({
    name : {
        type : String
    },
    products:[
        {
          type : mongoose.Schema.Types.ObjectId,
          ref: "products"
        }
      ],
})


const categoryModel = mongoose.model<Icats>("allCategories" , catSchema)


export default categoryModel