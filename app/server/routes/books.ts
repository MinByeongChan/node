import express from "express";
import Book from "../model/Book/Book";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const books = await Book.find((err: any, data: any) => {})
      .sort({ _id: -1 })
      .limit(3)
      .exec();
    res.json(books);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/:bookId", async (req: express.Request, res: express.Response) => {
  try {
    const book = await Book.findOne({ _id: req.params.bookId });
    res.json(book);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/", async (req: express.Request, res: express.Response) => {
  const book = new Book({
    title: req.body.title,
    authors: req.body.authors,
    publishedDate: req.body.publishedDate,
    price: req.body.price,
    tags: req.body.tags,
  });

  try {
    const bookSaved = await book.save();
    res.json(bookSaved);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete(
  "/:bookId",
  async (req: express.Request, res: express.Response) => {
    try {
      const book = await Book.deleteOne({ _id: req.params.bookId });
      res.json(book);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

router.patch(
  "/:bookId",
  async (req: express.Request, res: express.Response) => {
    try {
      console.log(req.body);
      const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
      });
      res.json(book);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

export default router;
