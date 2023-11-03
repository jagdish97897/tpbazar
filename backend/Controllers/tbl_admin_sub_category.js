const connection = require("../Model/model");


const addSubCategory = async(req, res)=>{
    try{
        let sqlQuery = "insert into tbl_admin_sub_category set?";
        let data = {
            pcategoryid: req.body.pcategoryid,
            subcategoryid: req.body.subcategoryid,
            subcategoryname: req.body.subcategoryname,
            photo:req.file.location,
            
        }

        await connection.query(sqlQuery, data, function(error, result){
            if(error){
                console.log("error", error.sqlMessage)
            }
            else{
                res.json(result)
            }
        })

    }catch(error){
        console.log("error found...")
    }
};

// const addSubCategory = async (req, res) => {
//     try {
//         const { pcategoryid, subcategoryid, subcategoryname } = req.body;
//         let photo = '';

//         if (req.file && req.file.location) {
//             photo = req.file.location;
//         } else {
//             // Handle the case where req.file or req.file.location is not defined
//             return res.status(400).json({ error: "Photo is required" });
//         }

//         if (!pcategoryid || !subcategoryid || !subcategoryname) {
//             return res.status(400).json({ error: "pcategoryid, subcategoryid, and subcategoryname are required fields" });
//         }

//         const sqlQuery = "INSERT INTO tbl_admin_sub_category (pcategoryid, subcategoryid, subcategoryname, photo, added) VALUES (?, ?, ?, ?, current_timestamp())";
//         const data = [pcategoryid, subcategoryid, subcategoryname, photo];

//         await connection.query(sqlQuery, data, (error, result) => {
//             if (error) {
//                 console.error("Database Error:", error);
//                 return res.json({ error: "Subcategory addition failed" });
//             } else {
//                 res.json({ message: "Subcategory added successfully", insertedId: result.insertId });
//             }
//         });
//     } catch (error) {
//         console.error("Server Error:", error);
//         res.json({ error: "Server error" });
//     }
// };


const getSubCategories = async (req, res) => {
    try {
        const sqlQuery = "SELECT * FROM tbl_admin_sub_category";

        await connection.query(sqlQuery, (error, results) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Failed to fetch subcategories" });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const { subcategoryid, subcategoryname, pcategoryid, photo } = req.body;

        if (!subcategoryid || !subcategoryname || !pcategoryid) {
            return res.status(400).json({ error: "subcategoryid, subcategoryname, and pcategoryid are required fields" });
        }

        const sqlQuery = `
            UPDATE tbl_admin_sub_category
            SET subcategoryname = ?,
                pcategoryid = ?,
                photo = ?,
                added = current_timestamp()
            WHERE subcategoryid = ?;
        `;
        const data = [subcategoryname, pcategoryid, photo, subcategoryid];

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Subcategory update failed" });
            } else {
                res.status(200).json({ message: "Subcategory updated successfully", affectedRows: result.affectedRows });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};


const findSubCategoryByName = async (req, res) => {
    try {
        const subcategoryname = req.params.subcategoryname;

        if (!subcategoryname) {
            return res.status(400).json({ error: "Subcategory name is required for search" });
        }

        const sqlQuery = "SELECT * FROM tbl_admin_sub_category WHERE subcategoryname = ?";
        const data = [subcategoryname];

        await connection.query(sqlQuery, data, (error, results) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Failed to retrieve subcategories" });
            } else {
                if (results.length === 0) {
                    return res.status(404).json({ error: "Subcategory not found" });
                }
                res.status(200).json(results);
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};






module.exports = { addSubCategory,getSubCategories,updateSubCategory,findSubCategoryByName};