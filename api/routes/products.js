const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const ProductsController = require('../controllers/products');

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'))
    }
    cb(null, true)
  }
})

router.get('/', ProductsController.getAll);

router.post('/', auth, upload.single('productImage'), ProductsController.add);

router.get('/:productId', ProductsController.getOne);

router.put('/:productId', auth, ProductsController.update);

router.delete('/:productId', auth, ProductsController.delete);

module.exports = router;
