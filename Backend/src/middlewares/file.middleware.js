const multer = require("multer")// multer is used for pdf handling


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    }
})


module.exports = upload