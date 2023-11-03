const connection = require("../Model/model");

const addAdminRoleAssign = async (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_admin_role_assign (id, roleid) VALUES (?, ?)";
        let data = [
            req.body.id,
            req.body.roleid
        ];

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.json({ error: "Role assignment failed" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("server error");
    }
};

const getAdminRoleAssign = async (req, res) => {
    try {
        let sqlQuery = "SELECT * FROM tbl_admin_role_assign";
        
        await connection.query(sqlQuery, (error, result) => {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: "Failed to retrieve role assignments" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Server error");
        res.status(500).json({ error: "Server error" });
    }
};





const getUserRoleAssign = (req, res) => {
    try {
      let sqlQuery =
        "SELECT r.rolename FROM tbl_admin_role_assign AS ra " +
        "JOIN tbl_admin_role AS r ON ra.roleid = r.roleid " +
        "WHERE ra.id = ?";
  
      connection.query(sqlQuery, [req.params.id], (error, result) => {
        if (error) {
          console.log("Error:", error.sqlMessage);
          res.status(500).json({ error: "Failed to retrieve role assignments" });
        } else {
          if (result.length > 0) {
            const roles = result.map((row) => row.rolename);
            res.json(roles);
          } else {
            res.status(404).json({ error: "Role assignments not found" });
          }
        }
      });
    } catch (error) {
      console.log("Server error");
      res.status(500).json({ error: "Server error" });
    }
  };


  const revokeRole = (req, res) => {
    const userId = req.params.id;
    const roleName = req.params.rolename;
  
    // Implement the logic to revoke the role assignment in your database here
    const sqlQuery = 'DELETE FROM tbl_admin_role_assign WHERE id = ? AND roleid = (SELECT roleid FROM tbl_admin_role WHERE rolename = ?)';
    
    connection.query(sqlQuery, [userId, roleName], (error, result) => {
      if (error) {
        console.log("Error:", error.sqlMessage);
        res.status(500).json({ error: "Failed to revoke role assignment" });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: "Role assignment revoked successfully" });
        } else {
          res.status(404).json({ error: "Role assignment not found" });
        }
      }
    });
  };
  
  
  


module.exports = { addAdminRoleAssign, getAdminRoleAssign,getUserRoleAssign,revokeRole };