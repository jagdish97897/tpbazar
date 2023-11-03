const express = require('express');
const AdminRole = express.Router();
const { addAdminRole, updateAdminRole, getAdminRoles, deleteAdminRole } = require("../Controllers/tbl_admin_role");

AdminRole.get("/api/admin/role", getAdminRoles);
AdminRole.delete("/api/admin/roles/deleterole/:roleid", deleteAdminRole); 

AdminRole.post("/api/admin/roles/newrole", addAdminRole);
AdminRole.put("/api/admin/roles/updaterole/:roleid", updateAdminRole);

module.exports = { AdminRole };