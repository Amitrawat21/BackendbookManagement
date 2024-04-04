import bookdb from "../models/booksSchema.js";
import userdb from "../models/userSchema.js";

class Book {
  constructor() {}

  static addBook = async (req, res) => {
    const { description, bookname, price,image, userId } = req.body;
    if (!description || !bookname || !price || !userId || !image) {
        return res.status(422).json({ error: "Fill all the details" });
    }

    try {
        // Fetch user by userId
        const user = await userdb.findOne({_id :userId});
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const bookDetail = new bookdb({
            bookname: bookname,
            description: description,
            price: price,
            image : image,
            userId: userId
        });

        const storedBook = await bookDetail.save();
        user.totalBooks.push(storedBook._id);
        await user.save();

        return res.status(201,).json({ status: 201, data: storedBook });
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
};


static deleteBook = async (req, res) => {
    const bookId = req.params.bookId; 
    try {
        // Find the book by its ID
        const book = await bookdb.findByIdAndDelete({_id :bookId});
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        const user = await userdb.findOneAndUpdate(
            { _id: book.userId },
            { $pull: { totalBooks: bookId } },
            { new: true }
        );

        return res.status(200).json({ status: 200, message: "Book deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};


static updateBook = async(req,res)=>{
    const bookId = req.params.bookId;
    const { description, bookname, price , image } = req.body;

    try {
        let book = await bookdb.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        const updateObject = {};
        if (description) updateObject.description = description;
        if (bookname) updateObject.bookname = bookname;
        if (price) updateObject.price = price;
        if (price) updateObject.image = image;
        book = await bookdb.findByIdAndUpdate(bookId, { $set: updateObject }, { new: true });
        return res.status(200).json({ status: 200, data: book });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


static userAllBooks = async(req,res)=>{
    const{userid} = req.params;

    try{
        const data = await userdb.findById({_id : userid}).populate("totalBooks").select('totalBooks')
        if(data){
            return res.status(200).json({ status: 200, data: data.totalBooks });
        }

        else {
         res.status(404).json({ error: "user  not found" });

        }
    }

    catch(error){
        return res.status(500).json({ error: "Internal server error" });

    }
}

}

export default Book;
