const express = require('express');
const Product = express.Router();
const { addProduct,getProducts,updateProductCategory,findProductCategoriesByName } = require("../Controllers/tbl_admin_product_category");

Product.get("/api/admin/category/viewcategory", getProducts);
Product.get("/api/admin/category/findcat/:categoryname", findProductCategoriesByName); 

Product.post("/api/admin/category/addcategory", addProduct);
Product.put("/api/admin/category/updatecategory/:pcategoryid", updateProductCategory);

module.exports = { Product };