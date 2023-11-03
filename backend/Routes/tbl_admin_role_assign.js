const express = require('express');
const AdminRoleAssign = express.Router();
const {addAdminRoleAssign,getAdminRoleAssign,getUserRoleAssign,revokeRole} = require("../Controllers/tbl_admin_role_assign");

AdminRoleAssign.get("/api/admin/roleassign/getroleAssign", getAdminRoleAssign);
AdminRoleAssign.get("/api/user/roleassign/getroleAssign/:id", getUserRoleAssign);
// AdminRole.delete("/api/admin/roles/deleterole/:roleid", deleteAdminRole); 
AdminRoleAssign.delete("/api/admin/roleassign/revokeroles/:id/:rolename",  revokeRole);
AdminRoleAssign.post("/api/admin/roleassign/addroleAssign", addAdminRoleAssign);
// AdminRole.put("/api/admin/roles/updaterole/:roleid", updateAdminRole);

module.exports = { AdminRoleAssign };