const connection = require("../Model/model");




const addProduct = async (req, res) => {
    try {
        const { pcategoryid, categoryname } = req.body;

        if (!pcategoryid || !categoryname) {
            return res.json({ error: "pcategoryid and categoryname are required fields" });
        }

        const sqlQuery = "INSERT INTO tbl_admin_product_category SET ?";
        const data = {
            pcategoryid,
            categoryname,
        };

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.error("Database Error:", error);
                return res.json({ error: "Product addition failed" });
            } else {
                res.status(201).json({ message: "Product category added successfully", insertedId: result.insertId });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.json({ error: "Server error" });
    }
};

const getProducts = async (req, res) => {
    try {
        const sqlQuery = "SELECT * FROM tbl_admin_product_category";

        await connection.query(sqlQuery, (error, results) => {
            if (error) {
                console.error("Database Error:", error);
                return res.json({ error: "Error fetching product categories" });
            } else {
                res.json({ products: results });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.json({ error: "Server error" });
    }
};


const updateProductCategory = async (req, res) => {
    try {
        const { pcategoryid, categoryname } = req.body;

        if (!pcategoryid || !categoryname) {
            return res.json({ error: "pcategoryid and categoryname are required fields" });
        }

        const sqlQuery = "UPDATE tbl_admin_product_category SET categoryname = ? WHERE pcategoryid = ?";
        const data = [categoryname, pcategoryid];

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.error("Database Error:", error);
                return res.json({ error: "Category update failed" });
            } else {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: "Category not found" });
                }
                res.json({ message: "Category updated successfully" });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.json({ error: "Server error" });
    }
};


const findProductCategoriesByName = async (req, res) => {
    try {
        const categoryName = req.query.categoryName;

        if (!categoryName) {
            return res.status(400).json({ error: "Category name is required for search" });
        }

        const sqlQuery = "SELECT * FROM tbl_admin_product_category WHERE categoryname = ?";
        const data = [categoryName];

        const [results] = await connection.query(sqlQuery, data);

        if (results.length === 0) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json({ categories: results });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};







module.exports = { addProduct, getProducts, updateProductCategory, findProductCategoriesByName };