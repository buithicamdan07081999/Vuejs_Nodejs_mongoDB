const express = require("express");
const router = express.Router();

const GetAllUsers = require("../../controllers/Admin/GetAllUsersController");
const GetUserById = require("../../controllers/Admin/GetUserByIdController");
const UpdateUser = require("../../controllers/Admin/UpdateUserController");
const DeleteUser = require("../../controllers/Admin/DeleteUserController");
const CreateUser = require("../../controllers/Admin/CreateUserController");
const GetProfile = require("../../controllers/Admin/GetProfileUserController");

// Routes: không thêm /api/admin ở đây

router.post("/adduser", CreateUser);           // POST /api/admin/adduser
router.get("/userslist", GetAllUsers);         // GET /api/admin/userslist
router.get("/userprofile/:id", GetProfile);    // GET /api/admin/userprofile/:id
router.get("/getuser/:id", GetUserById);       // GET /api/admin/getuser/:id
router.put("/putuser/:id", UpdateUser);        // PUT /api/admin/putuser/:id
router.delete("/deluser/:id", DeleteUser);     // DELETE /api/admin/deluser/:id

module.exports = router;
