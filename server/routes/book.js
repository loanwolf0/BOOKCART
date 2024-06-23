const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../routes/userAuth");
const Book = require("../models/book");

router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "You are having access to perform admin work" });
    }
    const { url, title, author, price, desc, language } = req.body;

    const book = new Book({
      url: url,
      title: title,
      author: author,
      price: price,
      desc: desc,
      language: language,
    });

    await book.save();

    return res.status(200).json({ message: "Book created." });
  } catch (error) {
    console.log("/add-book");
    res.status(500).json({ message: "Internal server error" });
  }
});

// update book
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    console.log(req.headers, "req.headers");
    if (!bookid) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const updateData = {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    };

    const book = await Book.findByIdAndUpdate(bookid, updateData, {
      new: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({
      message: "Book Updated Successfully.",
    });
  } catch (error) {
    console.log("/update-book");
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;

    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    console.log("/delete-book");
    res.status(500).json({ message: "Internal server error" });
  }
});

// get-all-books

router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.log("/get-all-books");
    res.status(500).json({ message: "Internal server error" });
  }
});

// get-recents-books

router.get("/get-recents-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.log("/get-all-books");
    res.status(500).json({ message: "Internal server error" });
  }
});

// get-book by id
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    console.log("/get-all-books");
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
