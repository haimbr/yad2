const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


const s3 = new AWS.S3({ region: process.env.AWS_REGION });
const bucket = process.env.S3_BUCKET;


const fileStorage = multerS3({
    s3,
    acl: 'private', //'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: "inline",
    bucket,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        const folderName = req.user._id;
        const fileName = folderName + "/" + file.mimetype.split("/")[0] + "_" + new Date().getTime() + "_" + file.originalname;
        cb(null, fileName);
    }
});

const uploadFilesToS3 = multer({ storage: fileStorage }).array("files", 11);

const getFileFromS3 = async (req, res, next) => {
    const Key = req.query.key;
    try {
        const { Body } = await s3.getObject({
            Key,
            Bucket: bucket
        }).promise();  

        req.fileBuffer = Body;
        next();
    } catch (err) {
        res.status(400).send(err)
    }
};




module.exports = {
    uploadFilesToS3,
    getFileFromS3
};