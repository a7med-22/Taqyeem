# Bulk Learning Content Endpoint Guide

## Endpoint Details

**Bulk Create Endpoint:**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/v1/learn/bulk`
- **Authentication**: Required (Admin only)
- **Content-Type**: `application/json`

**Single Create Endpoint (Dashboard):**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/v1/learn`
- **Authentication**: Required (Admin only)
- **Content-Type**: `application/json` OR `multipart/form-data` (for file uploads)

## Bulk Endpoint Request Format

### Headers:
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

### Body Structure:
```json
{
  "content": [
    {
      "type": "faq",
      "title": {
        "en": "English Title",
        "ar": "العنوان العربي"
      },
      "content": {
        "en": "English content...",
        "ar": "المحتوى العربي..."
      },
      "category": "interview-preparation",
      "tags": ["tag1", "tag2"],
      "references": [
        {
          "url": "https://example.com",
          "title": "Reference Title",
          "description": "Description"
        }
      ],
      "featured": false,
      "isPublished": true
    },
    {
      // ... more items
    }
  ]
}
```

### Important Notes:
- Maximum **100 items** per request
- Minimum **1 item** required
- No image uploads in bulk endpoint (images can be added later via update endpoint)
- All items will be created in a single transaction

### Valid Values:

**Type:**
- `"faq"` - Frequently Asked Questions
- `"tip"` - Tips and best practices  
- `"article"` - Full articles

**Category:**
- `"frontend-development"`
- `"backend-development"`
- `"soft-skills"`
- `"interview-preparation"`
- `"career-development"`

## Response Format

### Success Response:
```json
{
  "success": true,
  "message": "Bulk creation completed. X succeeded, Y failed.",
  "data": {
    "total": 10,
    "succeeded": 8,
    "failed": 2,
    "results": {
      "success": [
        {
          "index": 0,
          "content": {
            "_id": "...",
            "type": "faq",
            "title": {...},
            ...
          }
        }
      ],
      "failed": [
        {
          "index": 5,
          "item": {...},
          "error": "Error message"
        }
      ]
    }
  }
}
```

## Using with Your Bulk Data File

To use the `BULK_LEARNING_CONTENT.json` file:

1. **Combine all items** into a single array under `content` key:

```json
{
  "content": [
    // All FAQs from the faqs array
    // All Tips from the tips array  
    // All Articles from the articles array
  ]
}
```

2. **Or send separately** - You can send FAQs, Tips, and Articles in separate requests if preferred.

## Example Insomnia Request

### Request Setup:
- **Method**: `POST`
- **URL**: `{{ baseUrl }}/learn/bulk`
- **Headers**:
  - `Authorization`: `Bearer {{ token }}`
  - `Content-Type`: `application/json`

### Request Body:
```json
{
  "content": [
    {
      "type": "faq",
      "title": {
        "en": "What is a technical interview?",
        "ar": "ما هي المقابلة التقنية؟"
      },
      "content": {
        "en": "A technical interview is a job interview that assesses your technical skills...",
        "ar": "المقابلة التقنية هي مقابلة عمل تقيم مهاراتك التقنية..."
      },
      "category": "interview-preparation",
      "tags": ["interview", "technical"],
      "featured": true,
      "isPublished": true
    },
    {
      "type": "tip",
      "title": {
        "en": "Practice coding on a whiteboard",
        "ar": "تدرب على البرمجة على السبورة البيضاء"
      },
      "content": {
        "en": "Many technical interviews involve coding on a whiteboard...",
        "ar": "العديد من المقابلات التقنية تتضمن البرمجة على السبورة البيضاء..."
      },
      "category": "interview-preparation",
      "tags": ["practice", "whiteboard"],
      "featured": true,
      "isPublished": true
    }
  ]
}
```

## Converting Your JSON File

Your current `BULK_LEARNING_CONTENT.json` has separate arrays for `faqs`, `tips`, and `articles`. To use it with the bulk endpoint, combine them:

```json
{
  "content": [
    ...faqs array items...,
    ...tips array items...,
    ...articles array items...
  ]
}
```

Or create separate requests for each type if you prefer.


