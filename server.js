const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// uploads folder না থাকলে বানিয়ে নিচ্ছি
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // uploads ফোল্ডারে সেভ হবে
  },
  filename: function (req, file, cb) {
    // original নাম রেখে দিলাম, চাইলে Date.now() দিয়ে unique করতে পারেন
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Test route
app.get('/', (req, res) => {
  res.send('Express + Multer File Upload Server চালু আছে ✅');
});

// File Upload API
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'কোনো file পাঠানো হয়নি' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    fileName: req.file.filename,
    filePath: `uploads/${req.file.filename}`
  });
});

app.listen(PORT, () => {
  console.log(`Server চলছে: http://localhost:${PORT}`);
});
