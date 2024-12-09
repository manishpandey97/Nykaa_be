const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    gender: {
        type: String,
        // default: "Male",
        // enum: ["Male", "Female", "Unisex"],
        required: true
    },
    category: {
        type: String, default: "brands",
        enum: ["brands", "makeup", "skin", "hair", "appliances", "bathbody", "natural", "mombaby", "healthwellness",
            "men", "fragrance", "lingerieaccessories"],
        required: true
    },

    subCategory: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "SubCategory"
        type: String,
        required: true
    },

    brand_name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    origin_countery: { type: String, required: true },
    stock: { type: Number, required: true },
    images: [{ type: String, required: true }],
    ml: { type: Number, required: true },
    howUse: { type: String, required: true },
    discount: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, {
    versionKey: false,
    timestamps: true
})

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;