# Express + Multer File Upload

## যেভাবে চালাবেন

```bash
npm install
npm start
```

সার্ভার চালু হবে: `http://localhost:3000`

## Postman দিয়ে টেস্ট করার নিয়ম

1. Method: **POST**
2. URL: `http://localhost:3000/upload`
3. Body ট্যাবে গিয়ে **form-data** সিলেক্ট করুন
4. Key: `file` (Type ড্রপডাউন থেকে অবশ্যই **File** সিলেক্ট করবেন, Text নয়)
5. Value: আপনার কম্পিউটার থেকে যেকোনো ছবি সিলেক্ট করুন
6. **Send** চাপুন

## Expected Response

```json
{
  "message": "File uploaded successfully",
  "fileName": "image.jpg",
  "filePath": "uploads/image.jpg"
}
```

আপলোড হওয়া ফাইলটি প্রজেক্টের `uploads/` ফোল্ডারে সেভ হয়ে যাবে (উপরের রিকোয়ারমেন্ট অনুযায়ী)।

## কোড কীভাবে কাজ করে (সংক্ষেপে)

- `multer.diskStorage()` দিয়ে বলে দেওয়া হয়েছে ফাইল কোথায় (`destination`) এবং কোন নামে (`filename`) সেভ হবে।
- `upload.single('file')` মিডলওয়্যার হিসেবে বসানো হয়েছে `/upload` রুটে — `'file'` অংশটা Postman-এর form-data Key-এর সাথে মিলতে হবে।
- আপলোড সফল হলে `req.file` অবজেক্টে ফাইলের তথ্য (নাম, পাথ, সাইজ ইত্যাদি) পাওয়া যায়, যা রেসপন্সে পাঠানো হয়েছে।
