import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "..", "..", "public", "images"))
  },
  filename: (req, file, callback) => {
    const name = Date.now() + "-" + file.originalname
    callback(null, name)
    req.body = name
  },
})

export const upload = multer({ storage: storage })




