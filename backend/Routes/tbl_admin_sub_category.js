const express = require('express');
const Subcategory = express.Router();

const {  addSubCategory,getSubCategories,updateSubCategory,findSubCategoryByName} = require("../Controllers/tbl_admin_sub_category");

const aws = require('aws-sdk');
let  multerS3 = require('multer-s3');
let multer = require("multer")
const { S3Client } = require('@aws-sdk/client-s3');

const bucketName = "jagdish9931";

//store file in AWS S3 configuration 
const s3 = new S3Client({
    region:  "ap-south-1",
    credentials: {
        accessKeyId: "AKIAW5WKNAQD7QXITRA3",
        secretAccessKey: "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"
    }
})

//Storage Configuraion
let storage = multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, file.originalname)
    }

})
let upload = multer({ storage: storage })

Subcategory.get("/api/admin/subcategory/viewsabcategory", getSubCategories);
Subcategory.get("/api/admin/subcategory/findsubcat/:subcategoryname", findSubCategoryByName); 

Subcategory.post("/api/admin/subcategory/addsubcategory",upload.single('photo'),  addSubCategory);
Subcategory.put("/api/admin/subcategory/updatesubcategory/:subcategoryid", updateSubCategory);

module.exports = {Subcategory};