const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const express = require('express');
const rateLimit = require("express-rate-limit");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again later."
})

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/', uploadLimiter, upload.single('image'), (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const publicId = `post_images/${crypto.randomUUID()}`


        const bufferStream = require("stream").Readable.from(file.buffer);
        bufferStream.pipe(
            cloudinary.uploader.upload_stream(
                {
                    folder: "post_images",
                    public_id: publicId,
                    resource_type: "image",
                    transformation: [
                        { width: 800, height: 600, crop: "limit" },
                        { quality: "auto" },
                    ],
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary error:", error);
                        return res
                            .status(500)
                            .json({ message: "Failed to upload image.", error });
                    }

                    res.json({ url: result.secure_url });
                }
            )
        );
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error.", error });
    }
});

module.exports = router;
