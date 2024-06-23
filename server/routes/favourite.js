const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../routes/userAuth");
const Book = require("../models/book");

// add book to favourite

router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavorite = userData.favorites.includes(bookid);

    if (isBookFavorite) {
      return res.status(200).json({ message: "Book is already Favorites" });
    }
    await User.findByIdAndUpdate(id, { $push: { favorites: bookid } });
    res.status(200).json({ message: "Book added to Favorites" });
  } catch (error) {
    console.log("/add-to-favorite");
    res.status(500).json({ message: "Internal server error book adding" });
  }
});

//delete book from favorate
router.put(
  "/remove-book-from-favourite",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid, id } = req.headers;
      const userData = await User.findById(id);
      const isBookFavorite = userData.favorites.includes(bookid);

      if (isBookFavorite) {
        await User.findByIdAndUpdate(id, { $pull: { favorites: bookid } });
        return res
          .status(200)
          .json({ message: "Book is removed from Favorites" });
      }

      res.status(200).json({ message: "Book is not in Favorites" });
    } catch (error) {
      console.log("/add-to-favorite");
      res.status(500).json({ message: "Internal server error book adding" });
    }
  }
);

// get get favorites book

//delete book from favorate
router.get("/get-book-from-favourite", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favorites");

    const favoriteBooks = userData.favorites;
    res.status(200).json({ status: "Success", data: favoriteBooks });
  } catch (error) {
    console.log("/add-to-favorite");
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
