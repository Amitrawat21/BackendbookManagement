
import userdb from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"


const SECREAT_KEYJWT = "amit"



class User {
    constructor(){
    }

    static registration = async (req,res)=>{
        const { name, email, password, cpassword } = req.body
        if (!name || !email || !password || !cpassword) {
            res.status(422).json({ error: "fill all the detail" })
        }
        try {
            const preuser = await userdb.findOne({ email: email })
            if (preuser) {
                res.status(422).json({ error: "this email already exits" })
            }
            else {
                if (password === cpassword) {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    const FinalUser = new userdb({
                        name: name,
                        email: email,
                        password: hashPassword,
                        cpassword: hashPassword
                    })
    
                    let storeData = await FinalUser.save()
                    console.log(storeData ,"userdata")
                    res.status(201).json({status : 201 , data :storeData})
                  
                }
                else {
                    res.status(422).json({ error: "password does not match" })
                }
            }}

            catch (error) {
                res.status(422).json(error)
                console.log("error")
            }

    }


    static login = async(req,res)=>{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(422).json({ error: "Fill in all the details" });
        }
    
        try {
            const userValid = await userdb.findOne({ email: email });
            if (!userValid) {
                return res.status(422).json({ error: "You are not a registered user" });
            }
    
            const isMatch = await bcrypt.compare(password, userValid.password);
            if (!isMatch) {
                return res.status(422).json({ error: "Email or password do not match" });
            }
    
            const token = jwt.sign({ id: userValid._id }, SECREAT_KEYJWT, { expiresIn: '1h' });
            return res.status(201).json({ status: 201, token , userValid });
        } catch(error) {
            console.error("Error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default  User