// Creating Product Model to store Product information
const mongoose = require('mongoose')

//Need Product Schema for Product Model
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name."]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        //When data in the database is updated
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

//Export out product model
module.exports = Product;