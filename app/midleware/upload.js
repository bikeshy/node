const multer = require("multer");

// const uploadAndoImage = async (req, res) => {
//    try { 
//         await uploadFile(req, res); 
//         if (req.files.file == undefined) {
//             return res.status(400).send({ message: "Please upload a file! 2" });
//         }

//         // var fileExt = req.file.originalname.split('.').pop();
//         res.status(200).send({
//             message: "Uploaded the file successfully: " + req.file.originalname,
//             // fileName: dbConfig.uploadAttachmentCommonVariable + '.' + fileExt,
//             image:  req.file.name,
//             uploadDirectory: dbConfig.uploadDirectories[req.query.module_name] + '/',
//         });
//     } catch (err) {
//         res.status(500).send({
//             message: `Could not upload the file: ${err}`,
//         });
//     }
// };

// module.exports = {
//     uploadAndoImage,
// };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

exports.uploadImg = multer({storage: storage}).single('image');