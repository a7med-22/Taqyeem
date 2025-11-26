# Bulk Content Upload Guide

This guide explains how to use the separate JSON files to upload bulk learning content via the API.

## Files Available

1. **`bulk_faqs.json`** - Contains 10 FAQs covering all 5 categories
2. **`bulk_tips.json`** - Contains 10 Tips covering all 5 categories
3. **`bulk_articles.json`** - Contains 5 Articles covering all 5 categories

## Categories Covered

All files include content for these categories:
- `frontend-development`
- `backend-development`
- `soft-skills`
- `interview-preparation`
- `career-development`

## Using with Insomnia or Postman

### Endpoint
```
POST /api/v1/learn/bulk
```

### Headers
```
Content-Type: application/json
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### Request Body
Simply copy the entire contents of one of the JSON files and paste it as the request body.

**Example for FAQs:**
1. Open `bulk_faqs.json`
2. Copy the entire JSON content
3. Paste it in the request body in Insomnia/Postman
4. Make sure `Content-Type: application/json` is set
5. Add your admin authentication token
6. Send the request

### Expected Response
```json
{
  "success": true,
  "message": "Educational content created successfully",
  "data": {
    "createdCount": 10,
    "content": [...]
  }
}
```

## Notes

- Each file can be uploaded independently
- You can upload all three files separately
- The files are formatted exactly as required by the bulk endpoint
- All content is marked as `isPublished: true` by default
- Some items are marked as `featured: true` for emphasis
- Articles include reference URLs where applicable

## Tips

- Upload FAQs first, then Tips, then Articles
- Verify each upload was successful before proceeding to the next
- Check the response to see how many items were created
- If you get validation errors, check that the JSON is properly formatted

## Troubleshooting

**Error: "Content array is required"**
- Make sure you're using the entire JSON object, not just the array inside

**Error: "Invalid category"**
- All categories in the files are valid. If you see this, check for typos in the JSON

**Error: "Authentication failed"**
- Make sure you're using an admin token in the Authorization header


