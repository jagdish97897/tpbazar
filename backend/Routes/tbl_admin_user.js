const express = require('express')
// const tbl_admin_user_validation = require("../Validation/tbl_admin_user")
const AdminUser = express.Router();
const multer = require("multer");

const { getAdminUser, addAdminUser, updateAdminUser,getAdminUserById, updateUserStatus } = require("../Controllers/tbl_admin_user")

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './uploads');
    },
    filename: (req, file, callback) => {
      const filename = `image-${Date.now()}.${file.originalname}`;
      callback(null, filename);
    },
  });
  
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
      } else {
        callback(null, false);
        return callback(new Error('Only .png, .jpg, .jpeg files are allowed'));
      }
    },
  });


    ///////////////////////////

// SWAGGER API OF ALL TABLES
/**
 * @swagger
 * components:
 *   schemas:
 *     tbl_admin_user:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         mobile:
 *           type: string
 *         photo:
 *           type: string
 *         aadhar:
 *           type: string
 *         doj:
 *           type: string
 *         qualification:
 *           type: string
 *         dob:
 *           type: integer
 *         address:
 *           type: string
 *         state:
 *           type: string
 *         city:
 *           type: string
 *         pin:
 *           type: string
 *         status:
 *           type: string
 */

/**
 * @swagger
 * /api/admin/viewuser:
 *  get:
 *      summary: This api is used to check whether api is working or not in (tbl_admin_user)
 *      description: This api is used to check whether api is working or not in (tbl_admin_user)
 *      responses:
 *          200:
 *              description: To test Get method
 *              content: 
 *                    application/json:
 *                           schema:
 *                               type: array
 *                               items:
 *                                $ref : '#components/schemas/tbl_admin_user'
 */

/**
 * @swagger
 * /api/admin/adduser:
 *  post:
 *      summary: used to insert data into mysql database (tbl_admin_user)
 *      description: This api is used to insert data into mysql database (tbl_admin_user)
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/tbl_admin_user'
 *      responses:
 *          200:
 *              description: Added successfully
 */

/**
 * @swagger
 * /api/admin/updateuser/{id}:
 *  put:
 *      summary: Update user data in the MySQL database (tbl_admin_user) by ID
 *      description: This API is used to update user data in the MySQL database (tbl_admin_user) based on the provided ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the user to update.
 *          schema:
 *            type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/tbl_admin_user'
 *      responses:
 *          200:
 *              description: Updated successfully
 *          404:
 *              description: User not found
 */


/**
 * @swagger
 * /api/admin/deleteuser/{id}:
 *  delete:
 *      summary: Delete a user from the MySQL database (tbl_admin_user) by ID
 *      description: This API is used to delete a user from the MySQL database (tbl_admin_user) based on the provided ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the user to delete.
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Deleted successfully
 *          404:
 *              description: User not found
 */


AdminUser.get("/api/admin/viewusers", getAdminUser);
// AdminUser.post("/api/admin/roleassign/grantrole", createRoleAssignment);
AdminUser.post("/api/admin/adduser", upload.single('photo'), addAdminUser);
AdminUser.put("/api/admin/updateuser/:id", updateAdminUser);
AdminUser.get("/api/admin/viewuser/:id", getAdminUserById);
AdminUser.put("/api/admin/updateuserstatus/:id", updateUserStatus);





module.exports = { AdminUser }