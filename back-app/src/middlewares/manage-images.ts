import multer from 'multer'
import path from 'path'

const storage1 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "..", "..", "public", "main"))
  },
  filename: (req: any, file, callback) => {
    const name = Date.now() + "-" + file.originalname
    req.mainPhoto = name
    callback(null, name)
  },
})


const storage2 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "..", "..", "public", "secondary"))
  },
  filename: (req: any, file, callback) => {
    const name = Date.now() + "-" + file.originalname
    req.photos += {src: name}
    callback(null, name)
  },
})

export const uploadMain = multer({ storage: storage1 })
export const uploadSecondary = multer({ storage: storage2})




