const express = require('express')
const adminoffer= express.Router();

const {viewOffer,updateOffer,updateStatus,findOfferByDiscount,createOffer} = require("../Controllers/tbl_admin_offer")
adminoffer.post("/api/admin/offer/createoffer", createOffer); 
adminoffer.get("/api/admin/offer/viewoffer", viewOffer);                                  
adminoffer.put("/api/admin/updateoffer/:offerid", updateOffer);  
adminoffer.patch("/api/admin/updatestatus/:offerid",updateStatus);                                 
adminoffer.get("/api/admin/offer/findoffer/:bydiscount", findOfferByDiscount); 
module.exports = { adminoffer}