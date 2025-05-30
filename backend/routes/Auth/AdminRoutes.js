const express = require("express");
const router = express.Router();
const GetAllUsers= require("../../controllers/Admin/GetAllUsersController"); 
const GetUserById = require("../../controllers/Admin/GetUserByIdController"); 
const UpdateUser = require("../../controllers/Admin/UpdateUserController"); 
const DeleteUser = require("../../controllers/Admin/DeleteUserController"); 
const CreateUser = require("../../controllers/Admin/CreateUserController"); 
const GetProfile = require("../../controllers/Admin/GetProfileUserController"); 


router.get("/", GetAllUsers);
router.get("/:id", GetUserById);
router.put("/:id", UpdateUser);
router.delete("/:id", DeleteUser);
router.post("/", CreateUser);
router.get("/profile", GetProfile);

module.exports = router;