const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// match with /api/books/sort ??
router.route("/sortAZ")
  .get(booksController.sortAZ)
  .post(booksController.create);

router.route("/sortFic")
  .get(booksController.sortFiction)
  .post(booksController.create);

router.route("/sortNonFic")
  .get(booksController.sortNonFiction)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
