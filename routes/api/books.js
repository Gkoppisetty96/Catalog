const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// match with /api/books/sort ??
router.route("/sortAA")
  .get(booksController.sortAA)
  .post(booksController.create);
router.route("/sortAZ")
  .get(booksController.sortAZ)
  .post(booksController.create);
router.route("/sortTA")
  .get(booksController.sortTA)
  .post(booksController.create);
router.route("/sortTZ")
  .get(booksController.sortTZ)
  .post(booksController.create);
  
// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
