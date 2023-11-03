const express = require('express')
const Retailer= express.Router();



const { addRetailer, getRetailerByRegNo, updateRetailer, updateRetailerStatus, updatePassword, updateDocuments, viewAllShops, updateShopStatus } = require("../Controllers/Tbl_retailer_register")

Retailer.post("/api/retailer/newshopregister", addRetailer);  
Retailer.get("/api/retailer/viewshop/:regno", getRetailerByRegNo);
Retailer.put("/api/retailer/updateshop/:regno", updateRetailer );               
Retailer.put("/api/retailer/updatestatus/:Reg_no", updateRetailerStatus );               
Retailer.patch("/api/retailer/updatepwd/:regno", updatePassword );               
Retailer.patch("/api/retailer/updatedocuments/:regno", updateDocuments );               
Retailer.get("/api/admin/viewshops", viewAllShops );               
Retailer.put("/api/retaier/updateshopstatus/:Reg_no", updateShopStatus);
 
module.exports = { Retailer }