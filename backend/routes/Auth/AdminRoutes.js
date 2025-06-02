const express = require("express");
const router = express.Router();

const GetAllUsers = require("../../controllers/Admin/GetAllUsersController");
const GetUserById = require("../../controllers/Admin/GetUserByIdController");
const UpdateUser = require("../../controllers/Admin/UpdateUserController");
const DeleteUser = require("../../controllers/Admin/DeleteUserController");
const CreateUser = require("../../controllers/Admin/CreateUserController");
const GetProfile = require("../../controllers/Admin/GetProfileUserController");

// Routes: không thêm /api/admin ở đây

router.post("/create/user", CreateUser);           // POST /api/admin/create/user
router.get("/userslist", GetAllUsers);         // GET /api/admin/userslist
router.get("/profile/user/:id", GetProfile);    // GET /api/admin/get/profile/user/:id
router.get("/get/user/:id", GetUserById);       // GET /api/admin//get/user/:id frontend\src\admin\components\Auth\UpdateUser.vue
router.put("/update/user/:id", UpdateUser);        // PUT /api/admin/update/user/:id
router.delete("/delete/user/:id", DeleteUser);     // DELETE /api/admin/delete/user/:id
module.exports = router;
