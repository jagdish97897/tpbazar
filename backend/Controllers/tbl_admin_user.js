const connection = require("../Model/model");
const Joi = require("joi");
const bcrypt = require('bcrypt');

const getAdminUser = async(req, res) =>{ 
   try{
    let sqlQuery = "select * from tbl_admin_user";
    let data = req.body;

    await connection.query(sqlQuery, data, function(error, result){
        if(error){
            console.log("error", error.sqlMessage)
        }
        else{
            res.json(result)
        }
    })
   }catch(error){
    console.log(error.message)
   }
}


const addAdminUser = async (req, res) => {
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const data = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // Store the hashed password
      mobile: req.body.mobile,
      photo: req.file.location,
      aadhaar: req.body.aadhaar,
      doj: req.body.doj,
      qualification: req.body.qualification,
      dob: req.body.dob,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      pin: req.body.pin,
    };

    const sqlQuery = "INSERT INTO tbl_admin_user SET ?";

    await connection.query(sqlQuery, data, (error, result) => {
      if (error) {
        console.log("Error:", error.sqlMessage);
        res.status(500).json({ error: "Internal Server Error" }); // Return an error response
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Return an error response
  }
};


  

const updateAdminUser = async (req, res) => {
    try {
      let sqlQuery = "UPDATE tbl_admin_user SET name = ?, email = ?, qualification = ?, address = ? WHERE id = ?";
      let Data = [req.body.name, req.body.email, req.body.qualification, req.body.address, req.params.id];
  
      await connection.query(sqlQuery, Data, function (error, result) {
        if (error) {
          console.log("Error", error.sqlMessage);
          res.json({ error: 'Internal server error' });
        } else {
          res.json({ message: 'User updated successfully' });
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  




const getAdminUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming you pass the 'id' as a route parameter

        let sqlQuery = "SELECT * FROM tbl_admin_user WHERE id = ?";
        
        await connection.query(sqlQuery, [userId], function(error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Internal server error" });
            } else {
                if (result.length > 0) {
                    res.json(result[0]); // Assuming you want to return only one user
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Internal server error" });
    }
}


const updateUserStatus= async (req, res) => {
  const userId = req.params.id;
  const { status } = req.body;

  try {
    // Assuming you are using MySQL as the database
    // Update the status of the user with the given ID
    await connection.query(
      'UPDATE tbl_admin_user SET status = ? WHERE id = ?',
      [status, userId],
      (error, result) => {
        if (error) {
          console.error('Error updating user status:', error);
          return res.json({ error: 'An error occurred while updating user status.' });
        }

        if (result.affectedRows === 0) {
          return res.json({ error: 'User not found.' });
        }

        res.json({ message: 'User status updated successfully.' });
      }
    );
  } catch (error) {
    console.error('Error updating user status:', error);
    res.json({ error: 'An error occurred while updating user status.' });
  }
};


// const createRoleAssignment = async (req, res) => {
//   const { id, rolename } = req.body;

//   // Check if id and rolename are provided
//   if (!id || !rolename) {
//     return res.status(400).json({ message: 'Both id and rolename are required fields.' });
//   }

//   // Insert the role assignment into the database using async/await and try/catch
//   try {
//     const insertQuery = 'INSERT INTO tbl_admin_role_assign (id, rolename) VALUES (?, ?)';
//     await new Promise((resolve, reject) => {
//       db.query(insertQuery, [id, rolename], (err, result) => {
//         if (err) {
//           // Check for the "Duplicate entry" error
//           if (err.code === 'ER_DUP_ENTRY') {
//             return res.json({ message: 'Role assignment with the same id already exists.' });
//           }
//           return reject(err);
//         }
//         resolve(result);
//       });
//     });

//     // If the code reaches this point, the insertion was successful
//     return res.json({ message: 'Role assignment added successfully.' });
//   } catch (error) {
//     console.error('Error adding role assignment:', error);
//     return res.json({ message: 'Error adding role assignment.' });
//   }
// };


// const createRoleAssignment = async (req, res) => {
//   const { id, rolename } = req.body;

//   // Check if id and rolename are provided
//   if (!id || !rolename) {
//     return res.status(400).json({ message: 'Both id and rolename are required fields.' });
//   }

//   // Insert the role assignment into the database using async/await and try/catch
//   try {
//     const insertQuery = 'INSERT INTO tbl_admin_role_assign (id, rolename) VALUES (?, ?)';
//     const result = await new Promise((resolve, reject) => {
//       db.query(insertQuery, [id, rolename], (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });

//     // Check if the insertion was successful
//     if (result.affectedRows === 1) {
//       return res.status(201).json({ message: 'Role assignment added successfully.' });
//     } else {
//       return res.status(500).json({ message: 'Error adding role assignment.' });
//     }
//   } catch (error) {
//     console.error('Error adding role assignment:', error);
//     return res.status(500).json({ message: 'Error adding role assignment.' });
//   }
// };




// const createRoleAssignment = async (req, res) => {
//   try {
//     const { id, rolename } = req.body;

//     // Check if id and rolename are provided and meet validation criteria
//     if (!id || !rolename) {
//       return res.status(400).json({ message: 'Both id and rolename are required fields.' });
//     }

//     // TODO: Add more specific validation for id and rolename

//     // Insert the role assignment into the database
//     const roleAssignmentModel = new RoleAssignmentModel();
//     const result = await roleAssignmentModel.insertRoleAssignment(id, rolename);

//     // Check if the insertion was successful
//     if (result) {
//       return res.status(201).json({ message: 'Role assignment added successfully.', id: result.insertId });
//     } else {
//       return res.status(500).json({ message: 'Error adding role assignment.' });
//     }
//   } catch (error) {
//     console.error('Error adding role assignment:', error);
//     return res.status(500).json({ message: 'Error adding role assignment.' });
//   }
// };


// const createRoleAssignment = async (req, res) => {
//   try {
//     const { id, rolename } = req.body;

//     // Check if id and rolename are provided
//     if (!id || !rolename) {
//       return res.status(400).json({ message: 'Both id and rolename are required fields.' });
//     }

//     const roleAssignmentModel = new RoleAssignmentModel();

//     // Insert the role assignment into the database
//     const result = await roleAssignmentModel.insertRoleAssignment(id, rolename);

//     return res.status(201).json({ message: 'Role assignment added successfully.' });
//   } catch (error) {
//     console.error('Error adding role assignment:', error);
//     return res.status(500).json({ message: 'Error adding role assignment.' });
//   }
// };

module.exports = {getAdminUser,addAdminUser,updateAdminUser,getAdminUserById,updateUserStatus}