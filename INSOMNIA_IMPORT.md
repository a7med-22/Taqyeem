# How to Use the Bulk Data in Insomnia

## Step 1: Get Your Auth Token

1. Create a new request in Insomnia:
   - **Method**: `POST`
   - **URL**: `http://localhost:5000/api/v1/auth/login`
   - **Body Type**: JSON
   - **Body**:
     ```json
     {
       "email": "your-admin-email@example.com",
       "password": "your-password"
     }
     ```
2. Send the request and copy the `token` from the response

## Step 2: Set Up Environment Variables

1. In Insomnia, create/select an environment
2. Add these variables:
   - `baseUrl`: `http://localhost:5000/api/v1`
   - `token`: `YOUR_TOKEN_HERE` (paste the token from step 1)

## Step 3: Create Content Requests

For each item in `BULK_LEARNING_CONTENT.json`:

### For FAQs and Tips (No Images):

1. Create a new request:
   - **Method**: `POST`
   - **URL**: `{{ baseUrl }}/learn`
   - **Headers**:
     - `Authorization`: `Bearer {{ token }}`
     - `Content-Type`: `application/json`
   - **Body Type**: JSON
   - **Body**: Copy the JSON object from the file

### For Articles (With Images):

1. Create a new request:
   - **Method**: `POST`
   - **URL**: `{{ baseUrl }}/learn`
   - **Headers**:
     - `Authorization`: `Bearer {{ token }}`
   - **Body Type**: Multipart Form
   - **Fields**:
     - `type`: `article`
     - `title`: `{"en": "...", "ar": "..."}` (as text)
     - `content`: `{"en": "...", "ar": "..."}` (as text)
     - `category`: `frontend-development` (or appropriate category)
     - `tags`: `["tag1", "tag2"]` (as text)
     - `references`: `[{"url": "...", "title": "...", "description": "..."}]` (as text)
     - `featured`: `true` or `false` (as text)
     - `isPublished`: `true` or `false` (as text)
     - `thumbnail`: [Select File] (optional image file)

## Quick Copy-Paste Examples

### Example 1: FAQ Request

**Request Settings:**
- Method: `POST`
- URL: `{{ baseUrl }}/learn`
- Headers: `Authorization: Bearer {{ token }}`
- Body Type: JSON

**Body:**
```json
{
  "type": "faq",
  "title": {
    "en": "What is a technical interview?",
    "ar": "ما هي المقابلة التقنية؟"
  },
  "content": {
    "en": "A technical interview is a job interview that assesses your technical skills, problem-solving abilities, and knowledge relevant to the position you're applying for. It typically involves coding challenges, system design questions, or discussions about your technical experience.",
    "ar": "المقابلة التقنية هي مقابلة عمل تقيم مهاراتك التقنية وقدراتك على حل المشكلات والمعرفة المتعلقة بالمنصب الذي تتقدم إليه. عادة ما تتضمن تحديات البرمجة أو أسئلة تصميم الأنظمة أو مناقشات حول خبرتك التقنية."
  },
  "category": "interview-preparation",
  "tags": ["interview", "technical", "preparation"],
  "references": [
    {
      "url": "https://www.interviewbit.com/technical-interview-questions/",
      "title": "Technical Interview Guide",
      "description": "Comprehensive guide to technical interviews"
    }
  ],
  "featured": true,
  "isPublished": true
}
```

### Example 2: Tip Request

**Request Settings:**
- Method: `POST`
- URL: `{{ baseUrl }}/learn`
- Headers: `Authorization: Bearer {{ token }}`
- Body Type: JSON

**Body:**
```json
{
  "type": "tip",
  "title": {
    "en": "Practice coding on a whiteboard",
    "ar": "تدرب على البرمجة على السبورة البيضاء"
  },
  "content": {
    "en": "Many technical interviews involve coding on a whiteboard. Practice writing code by hand regularly - it's different from typing on a keyboard. Focus on clean, readable code, proper variable naming, and explaining your thought process as you write. This helps you think more clearly and communicate your approach effectively.",
    "ar": "العديد من المقابلات التقنية تتضمن البرمجة على السبورة البيضاء. تدرب على كتابة الكود يدوياً بانتظام - الأمر مختلف عن الكتابة على لوحة المفاتيح. ركز على كود نظيف وقابل للقراءة، تسمية متغيرات مناسبة، وشرح عملية تفكيرك أثناء الكتابة. هذا يساعدك على التفكير بوضوح أكبر والتواصل بفعالية."
  },
  "category": "interview-preparation",
  "tags": ["practice", "whiteboard", "coding"],
  "featured": true,
  "isPublished": true
}
```

## Bulk Import Tips

1. **Duplicate Requests**: Create one template request, then duplicate it for each item
2. **Use Folders**: Organize requests in folders (FAQs, Tips, Articles)
3. **Batch Processing**: Send requests one by one, checking each response
4. **Error Handling**: If a request fails, check the error message and fix the data
5. **Validation**: Make sure all required fields are present:
   - `type` (faq, tip, or article)
   - `title.en` and `title.ar`
   - `content.en` and `content.ar`
   - `category` (must be one of the valid categories)

## Valid Categories

- `frontend-development`
- `backend-development`
- `soft-skills`
- `interview-preparation`
- `career-development`

## Response Format

Successful response will look like:
```json
{
  "success": true,
  "message": "Educational content created successfully",
  "data": {
    "content": {
      "_id": "...",
      "type": "faq",
      "title": {...},
      "content": {...},
      ...
    }
  }
}
```

## Troubleshooting

- **401 Unauthorized**: Check your token is valid and not expired
- **400 Bad Request**: Check all required fields are present and valid
- **403 Forbidden**: Make sure you're logged in as an admin user
- **Validation Error**: Check that category and type values are correct


