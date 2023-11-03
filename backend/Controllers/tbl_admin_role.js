const connection = require("../Model/model");

const getAdminRoles = async (req, res) => {
    try {
        let sqlQuery = "SELECT * FROM tbl_admin_role";
        
        await connection.query(sqlQuery, (error, result) => {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: "Failed to fetch role" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


  //add new role//
const addAdminRole = async (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_admin_role SET ?";
        let data = {
            roleid: req.body.roleid,
            rolename: req.body.rolename,
        };

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.json({ error: "Role addition failed" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("server error");
    }
};



const updateAdminRole = async (req, res) => {
    try {
        const { roleid, rolename } = req.body;

        if (!roleid || !rolename) {
            return res.status(400).json({ error: "Roleid and rolename are required fields" });
        }

        const sqlQuery = "UPDATE tbl_admin_role SET rolename = ? WHERE roleid = ?";
        const data = [rolename, roleid];

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Role update failed" });
            } else {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: "Role not found" });
                }
                res.status(200).json({ message: "Role updated successfully" });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};



const deleteAdminRole = async (req, res) => {
    try {
        const roleIdToDelete = req.params.roleId; // Assuming you get the role ID from the URL params

        if (!roleIdToDelete) {
            return res.status(400).json({ error: "Role ID is required to delete" });
        }

        const sqlQuery = "DELETE FROM tbl_admin_role WHERE roleid = ?";
        const data = [roleIdToDelete];

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Role deletion failed" });
            } else {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: "Role not found" });
                }
                res.status(200).json({ message: "Role deleted successfully" });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};


module.exports = { addAdminRole, updateAdminRole, getAdminRoles, deleteAdminRole };