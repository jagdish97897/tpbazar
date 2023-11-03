const connection = require("../Model/model");

const addRetailer = async (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_register SET ?";
        let data = {
            Reg_no: req.body.Reg_no,
            Gst_no: req.body.Gst_no,
            Tin: req.body.Tin,
            Pan: req.body.PAN,
            Shop_name: req.body.Shop_name,
            Owner_name: req.body.Owner_name,
            Password: req.body.Password,
            Mobile: req.body.Mobile,
            Email: req.body.Email,
            Address: req.body.Address,
            State: req.body.State,
            Region: req.body.Region,
            City: req.body.City,
            Pin: req.body.Pin,
            Registration_doc: req.body.Registration_doc,
            Pan_doc: req.body.Pan_doc,
            Shop_doc: req.body.Shop_doc,
            Terms_and_Conditions: req.body.Terms_and_Conditions,
            
        };

        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error inserting data" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

const getRetailerByRegNo = async (req, res) => {
    try {
        const regno = req.params.regno;
        let sqlQuery = "SELECT * FROM tbl_retailer_register WHERE Reg_no = ?";
        await connection.query(sqlQuery, [regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error retrieving data" });
            } else {
                if (result.length === 0) {
                    res.status(404).json({ message: "Data not found" });
                } else {
                    res.json(result);
                }
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

// Update other functions in a similar way to use the correct field names based on the database schema.

const updateRetailer = async (req, res) => {
    try {
        const regno = req.params.regno;
        let sqlQuery = "UPDATE tbl_retailer_register SET ? WHERE Reg_no = ?";
        let updatedData = {
            Gst_no: req.body.GST_no,
            Tin: req.body.TIN_no,
            Pan: req.body.PAN,
            Shop_name: req.body.shop_name,
            Owner_name: req.body.owner_name,
            Password: req.body.password,
            Mobile: req.body.mobile,
            Email: req.body.email,
            Address: req.body.address,
            State: req.body.state,
            Region: req.body.region,
            City: req.body.city,
            Pin: req.body.pin,
            Registration_doc: req.body.document_reg_no,
            Pan_doc: req.body.docpan,
            Shop_doc: req.body.docshop,
            Terms_and_Conditions: req.body.terms_and_conditions,
            Status: req.body.status,
        };

        await connection.query(sqlQuery, [updatedData, regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error updating data" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

// const updateStatus = async (req, res) => {
//     try {
//         const regno = req.params.Reg_no;
//         let sqlQuery = "UPDATE tbl_retailer_register SET Status = ? WHERE Reg_no = ?";
//         const updatedStatus = req.body.status;
//         await connection.query(sqlQuery, [updatedStatus, regno], function (error, result) {
//             if (error) {
//                 console.log("error", error.sqlMessage);
//                 res.status(500).json({ error: "Error updating status" });
//             } else {
//                 res.json(result);
//             }
//         });
//     } catch (error) {
//         console.log("error found...");
//         res.status(500).json({ error: "Error processing request" });
//     }
// };



const updateRetailerStatus= async (req, res) => {
    const Regno = req.params.Reg_no;
    const { Status } = req.body;
  
    try {
      // Assuming you are using MySQL as the database
      // Update the status of the user with the given ID
      await connection.query(
        'UPDATE tbl_retailer_register SET Status = ? WHERE Reg_no = ?',
        [Status, Regno],
        (error, result) => {
          if (error) {
            console.error('Error updating retailer status:', error);
            return res.json({ error: 'An error occurred while updating retailer status.' });
          }
  
          if (result.affectedRows === 0) {
            return res.json({ error: 'User not found.' });
          }
  
          res.json({ message: 'retailer status updated successfully.' });
        }
      );
    } catch (error) {
      console.error('Error updating user status:', error);
      res.json({ error: 'An error occurred while updating retailer status.' });
    }
  };


const updatePassword = async (req, res) => {
    try {
        const regno = req.params.regno;
        let sqlQuery = "UPDATE tbl_retailer_register SET Password = ? WHERE Reg_no = ?";
        const updatedPassword = req.body.password;
        await connection.query(sqlQuery, [updatedPassword, regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error updating password" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

const updateDocuments = async (req, res) => {
    try {
        const regno = req.params.regno;
        let sqlQuery = "UPDATE tbl_retailer_register SET Registration_doc = ?, Pan_doc = ?, Shop_doc = ? WHERE Reg_no = ?";
        const document_reg_no = req.body.document_reg_no;
        const docpan = req.body.docpan;
        const docshop = req.body.docshop;
        await connection.query(sqlQuery, [document_reg_no, docpan, docshop, regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error updating documents" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

const viewAllShops = async (req, res) => {
    try {
        let sqlQuery = "SELECT * FROM tbl_retailer_register";
        await connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error retrieving data" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};


const updateShopStatus= async (req, res) => {
    const Regno = req.params.Reg_no;
    const { Status } = req.body;
  
    try {
      // Assuming you are using MySQL as the database
      // Update the status of the user with the given ID
      await connection.query(
        'UPDATE tbl_retailer_register SET Status = ? WHERE Reg_no = ?',
        [Status, Regno],
        (error, result) => {
          if (error) {
            console.error('Error updating shop status:', error);
            return res.json({ error: 'An error occurred while updating shop Status.' });
          }
  
          if (result.affectedRows === 0) {
            return res.json({ error: 'shop not found.' });
          }
  
          res.json({ message: 'Shop status updated successfully.' });
        }
      );
    } catch (error) {
      console.error('Error updating user status:', error);
      res.status(500).json({ error: 'An error occurred while updating user status.' });
    }
  };
  

module.exports = { addRetailer, getRetailerByRegNo, updateRetailer, updateRetailerStatus, updatePassword, updateDocuments, viewAllShops,updateShopStatus };