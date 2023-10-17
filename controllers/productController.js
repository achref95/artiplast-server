const Product = require('../models/Product.model');

const createProduct = async (req, res, next) => {
    try {
        const {product} = req.body
        const foundProduct = await Product.findOne({product})

        if (!product) {
            return res.status(400).json({message : "please add a product"})
        }

        if (foundProduct) {
            return res.status(400).json({message : "this product already exists"})
        }

        await Product.create({product})
        return res.status(201).json({ message: "Product created successfully", product: product });

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createProduct
}