# Insomnia Guide: Bulk Learning Content Creation

This guide will help you add multiple learning content items (FAQs, Tips, Articles) using Insomnia.

## Prerequisites

1. **Get Your Auth Token**
   - First, login as admin to get your authentication token
   - Use: `POST http://localhost:5000/api/v1/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "your-admin-email@example.com",
       "password": "your-password"
     }
     ```
   - Copy the `token` from the response

2. **Set Environment Variables in Insomnia**
   - Create an environment in Insomnia
   - Add variables:
     - `baseUrl`: `http://localhost:5000/api/v1`
     - `token`: `your-auth-token-here`

## Endpoint Details

- **Method**: `POST`
- **URL**: `{{ baseUrl }}/learn`
- **Headers**:
  - `Authorization`: `Bearer {{ token }}`
  - `Content-Type`: `multipart/form-data` (Insomnia will set this automatically)

## Request Body Format (Form Data)

Since the endpoint uses `multipart/form-data` for image uploads, you need to send fields as Form Data:

### Field Descriptions:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | String | Yes | Content type: `"faq"`, `"tip"`, or `"article"` |
| `title` | JSON String | Yes | Bilingual title: `{"en": "English Title", "ar": "Arabic Title"}` |
| `content` | JSON String | Yes | Bilingual content: `{"en": "English content...", "ar": "Arabic content..."}` |
| `category` | String | Yes | One of: `"frontend-development"`, `"backend-development"`, `"soft-skills"`, `"interview-preparation"`, `"career-development"` |
| `tags` | JSON String | No | Array of tags: `["tag1", "tag2"]` |
| `references` | JSON String | No | Array of references: `[{"url": "https://...", "title": "Title", "description": "Desc"}]` |
| `featured` | Boolean/String | No | `true` or `"true"` |
| `isPublished` | Boolean/String | No | `true` or `"true"` |
| `thumbnail` | File | No | Image file (only for articles) |

## Example Requests

### 1. Create a FAQ

**Request:**
- Method: `POST`
- URL: `{{ baseUrl }}/learn`
- Body Type: Multipart Form
- Fields:
  ```
  type: faq
  title: {"en": "What is a technical interview?", "ar": "ما هي المقابلة التقنية؟"}
  content: {"en": "A technical interview is a job interview that assesses your technical skills...", "ar": "المقابلة التقنية هي مقابلة عمل تقيم مهاراتك التقنية..."}
  category: interview-preparation
  tags: ["interview", "technical", "guide"]
  references: [{"url": "https://example.com/guide", "title": "Interview Guide", "description": "Complete guide"}]
  featured: false
  isPublished: true
  ```

### 2. Create a Tip

**Request:**
- Method: `POST`
- URL: `{{ baseUrl }}/learn`
- Body Type: Multipart Form
- Fields:
  ```
  type: tip
  title: {"en": "Prepare Your Questions", "ar": "جهز أسئلتك"}
  content: {"en": "Always prepare 2-3 questions to ask the interviewer...", "ar": "دائماً جهز 2-3 أسئلة لطرحها على المحاور..."}
  category: interview-preparation
  tags: ["preparation", "questions"]
  featured: true
  isPublished: true
  ```

### 3. Create an Article

**Request:**
- Method: `POST`
- URL: `{{ baseUrl }}/learn`
- Body Type: Multipart Form
- Fields:
  ```
  type: article
  title: {"en": "Complete Guide to Frontend Interviews", "ar": "دليل شامل لمقابلات الواجهة الأمامية"}
  content: {"en": "This comprehensive guide covers everything you need to know...", "ar": "يغطي هذا الدليل الشامل كل ما تحتاج معرفته..."}
  category: frontend-development
  tags: ["frontend", "javascript", "react", "interview"]
  references: [{"url": "https://developer.mozilla.org", "title": "MDN Web Docs"}, {"url": "https://react.dev", "title": "React Documentation"}]
  featured: true
  isPublished: true
  thumbnail: [Select File] (image file)
  ```

## Quick JSON Templates for Insomnia

### FAQ Template
```json
{
  "type": "faq",
  "title": "{\"en\": \"Your English Question Here\", \"ar\": \"سؤالك العربي هنا\"}",
  "content": "{\"en\": \"Your English answer here...\", \"ar\": \"إجابتك العربية هنا...\"}",
  "category": "interview-preparation",
  "tags": "[\"tag1\", \"tag2\"]",
  "references": "[{\"url\": \"https://example.com\", \"title\": \"Example\", \"description\": \"Description\"}]",
  "featured": "false",
  "isPublished": "true"
}
```

### Tip Template
```json
{
  "type": "tip",
  "title": "{\"en\": \"Tip Title (English)\", \"ar\": \"عنوان النصيحة (عربي)\"}",
  "content": "{\"en\": \"Tip content in English...\", \"ar\": \"محتوى النصيحة بالعربي...\"}",
  "category": "soft-skills",
  "tags": "[\"advice\", \"skill\"]",
  "featured": "false",
  "isPublished": "true"
}
```

### Article Template
```json
{
  "type": "article",
  "title": "{\"en\": \"Article Title (English)\", \"ar\": \"عنوان المقال (عربي)\"}",
  "content": "{\"en\": \"Article content in English...\", \"ar\": \"محتوى المقال بالعربي...\"}",
  "category": "backend-development",
  "tags": "[\"backend\", \"nodejs\", \"api\"]",
  "references": "[{\"url\": \"https://example.com\", \"title\": \"Reference Title\"}]",
  "featured": "true",
  "isPublished": "true"
}
```

## Important Notes

1. **JSON Strings**: The `title`, `content`, `tags`, and `references` fields must be JSON strings (not actual JSON objects). In Insomnia, when using Form Data:
   - For JSON strings, wrap them in quotes or use the exact string format
   - Example: `{"en": "Hello", "ar": "مرحبا"}` should be sent as the string: `{"en": "Hello", "ar": "مرحبا"}`

2. **Categories**: Valid categories are:
   - `frontend-development`
   - `backend-development`
   - `soft-skills`
   - `interview-preparation`
   - `career-development`

3. **Content Types**: Valid types are:
   - `faq` - Frequently Asked Questions
   - `tip` - Tips and best practices
   - `article` - Full articles (can include thumbnail image)

4. **Image Upload**: Only required for articles. Supported formats: JPG, PNG, GIF. Max size: 5MB.

5. **Bulk Creation**: To create multiple items, duplicate the request in Insomnia and modify the content for each one.

## Alternative: Using JSON Body (If you want to skip file uploads)

If you're creating FAQs or Tips (no image), you can also send as JSON:

**Headers:**
- `Content-Type`: `application/json`
- `Authorization`: `Bearer {{ token }}`

**Body (JSON):**
```json
{
  "type": "faq",
  "title": {
    "en": "What is React?",
    "ar": "ما هو React؟"
  },
  "content": {
    "en": "React is a JavaScript library...",
    "ar": "React هي مكتبة JavaScript..."
  },
  "category": "frontend-development",
  "tags": ["react", "javascript"],
  "references": [
    {
      "url": "https://react.dev",
      "title": "React Docs",
      "description": "Official documentation"
    }
  ],
  "featured": false,
  "isPublished": true
}
```

## Sample Bulk Content Collection

Here are some example items you can add:

### FAQs:
1. "What should I prepare before a technical interview?"
2. "How long does a technical interview typically last?"
3. "What are common frontend interview questions?"
4. "How do I explain my project in an interview?"
5. "What should I wear to a technical interview?"

### Tips:
1. "Practice coding on a whiteboard"
2. "Ask clarifying questions before solving problems"
3. "Think out loud during problem-solving"
4. "Prepare questions to ask the interviewer"
5. "Follow up after the interview"

### Articles:
1. "Complete Guide to JavaScript Interview Preparation"
2. "System Design Interview: A Beginner's Guide"
3. "Behavioral Interview Questions: How to Answer"
4. "Remote Interview Best Practices"
5. "How to Negotiate Your Tech Salary"

## Troubleshooting

**Error: "Access denied. No token provided"**
- Make sure you've added the Authorization header with your token

**Error: "Token expired"**
- Login again to get a new token

**Error: "Category is required"**
- Make sure you're using one of the valid category values

**Error: "Title in both languages is required"**
- Ensure both `title.en` and `title.ar` are provided

**Error: "Invalid file type"**
- For articles, make sure you're uploading an image file (JPG, PNG, GIF)

## Tips for Bulk Creation

1. **Create a Request Template**: Save one request as a template, then duplicate it for each item
2. **Use Environment Variables**: Store your token and baseUrl in environment variables
3. **Batch Creation**: Create a folder in Insomnia for each content type (FAQs, Tips, Articles)
4. **Validate Responses**: Check each response to ensure the content was created successfully


