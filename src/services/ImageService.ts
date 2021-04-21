const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypt = require("crypto");
const path = require("path");

var storage = new GridFsStorage({
  url: "mongodb+srv://sermilitar-api:nxsBRCC8LQN1RuN9@cluster-sermilitar.toi1o.mongodb.net/serMilitar?retryWrites=true&w=majority",
  options: { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
   },
  file: (req: any, file: any) => {
    // return new Promise((resolve, reject) => {
    //     crypt.randomBytes(16, (err: any, buf: any) => {
    //       if (err) {
    //         return reject(err);
    //       }
    //       const filename = buf.toString("hex") + path.extname(file.originalname);
    //       const fileInfo = {
    //         filename: filename,
    //         bucketName: "uploads"
    //       };
    //       resolve(fileInfo);
    //     });
    //   });
    var filename = `${Date.now()}-sermilitar-${file.originalname}`;

    return {
        bucketName: "uploads",
        filename,
        fileUrl: `${req.protocol}://${req.headers.host}/user/upload/browser/${filename}`
    };
  }
});

var upload = multer({ storage }).single("file");
var uploadFilesMiddleware = util.promisify(upload);
module.exports = uploadFilesMiddleware;