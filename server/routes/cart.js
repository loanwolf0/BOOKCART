const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../routes/userAuth");
const Book = require("../models/book");

// add book to favourite

router.put("/add-book-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    console.log(bookid, id, "bookid, id ");
    const userData = await User.findById(id);
    const isBookInCart = userData.cart.includes(bookid);

    if (isBookInCart) {
      return res.status(200).json({ message: "Book is already in cart" });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    res.status(200).json({ message: "Book added to Cart" });
  } catch (error) {
    console.log("/add-to-cart");
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete book from favorate
router.put(
  "/remove-book-from-cart/:bookid",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;
      const userData = await User.findById(id);
      const isBookInCart = userData.cart.includes(bookid);

      if (isBookInCart) {
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        return res.status(200).json({ message: "Book is removed from Cart" });
      }

      return res.status(200).json({ message: "Book is not in Cart" });
    } catch (error) {
      console.log("/remove-to-cart");
      res.status(500).json({ message: "Internal server error " });
    }
  }
);

// get get favorites book

//delete book from favorate
router.get("/get-book-from-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");

    const cartBooks = userData.cart.reverse();
    res.status(200).json({ status: "Success", data: cartBooks });
  } catch (error) {
    console.log("/add-to-favorite");
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
