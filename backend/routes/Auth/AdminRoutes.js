const express = require("express");
const router = express.Router();

const GetAllUsers = require("../../controllers/Admin/GetAllUsersController");
const GetUserById = require("../../controllers/Admin/GetUserByIdController");
const UpdateUser = require("../../controllers/Admin/UpdateUserController");
const DeleteUser = require("../../controllers/Admin/DeleteUserController");
const AddUser = require("../../controllers/Admin/AddUserController");
const GetProfile = require("../../controllers/Admin/GetProfileUserController");
const ResetUserPassword = require("../../controllers/Admin/ResetUserPassword");

// Routes: không thêm /api/admin ở đây

router.post("/user/add", AddUser);           // POST /api/admin/user/add
router.get("/user/list", GetAllUsers);         // GET /api/admin/user/list
router.get("/user/profile/:id", GetProfile);    // GET /api/admin/get/user/:id/profile
router.get("/user/get/:id", GetUserById);       // GET /api/admin/user/get/:id frontend\src\admin\components\Auth\UpdateUser.vue
router.put("/user/update/:id", UpdateUser);        // PUT /api/admin/user/update/:id
router.delete("/user/delete/:id", DeleteUser);     // DELETE /api/admin/delete/user/:id
router.put("/user/reset-password/:id", ResetUserPassword); // PUT api/admin/user/reset-password/
module.exports = router;
