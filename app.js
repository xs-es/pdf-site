const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });
const PORT = 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to handle PDF uploads
app.post("/upload", upload.single("pdf"), (req, res) => {
    if (req.file) {
        res.json({ message: "File uploaded successfully", filePath: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ error: "File upload failed" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

