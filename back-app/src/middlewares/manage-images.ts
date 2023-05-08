import multer from 'multer'
import path from 'path'

const storage1 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "..", "..", "..", "my-app", "public", "main"))
  },
  filename: (req: any, file, callback) => {
    const name = Date.now() + "-" + file.originalname
    req.body.main_photo = name
    callback(null, name)
  },
})

const storage2 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "..", "..", "..", "my-app", "public", "secondary"))
  },
  filename: (req: any, file, callback) => {
    const name = Date.now() + "-" + file.originalname

    let temp = req.body.secondary
    if(req.body.secondary === undefined){
      temp = []
    }

    temp.push(name)

    req.body.secondary = temp

    callback(null, name)
  },
})

export const uploadMain = multer({ storage: storage1 })
export const uploadSecondary = multer({ storage: storage2})




