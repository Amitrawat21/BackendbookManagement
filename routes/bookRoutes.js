import express from "express"
import Book from "../controller/bookController.js"

const router=  express.Router()

router.post("/addbook" ,Book.addBook )
router.delete('/deletebook/:bookId', Book.deleteBook);
router.put('/updatebook/:bookId', Book.updateBook);
router.get("/userAllBooks/:userid" , Book.userAllBooks)

export default router