import express from "express"
import User from "../controller/userController.js";

const router  = express.Router()


router.post('/register' ,User.registration);
router.post('/login' ,User.login);


export default router

 