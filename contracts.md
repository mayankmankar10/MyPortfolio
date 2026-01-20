# Backend-Frontend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for Mayank's portfolio website.

## Current Mock Data Location
- File: `/app/frontend/src/data/mock.js`
- Contains: Personal info, experience, projects, skills, education (not used), achievements (not used)

## Backend Implementation Plan

### 1. Database Models

#### Contact Message Model
```python
{
    "id": "uuid",
    "name": "string",
    "email": "string",
    "message": "string",
    "created_at": "datetime",
    "read": "boolean"
}
```

#### Portfolio View Counter (Optional)
```python
{
    "id": "uuid",
    "ip_address": "string",
    "user_agent": "string",
    "visited_at": "datetime"
}
```

### 2. API Endpoints

#### POST /api/contact
**Purpose**: Handle contact form submissions
**Request Body**:
```json
{
    "name": "string (required)",
    "email": "string (required, email format)",
    "message": "string (required)"
}
```
**Response (201)**:
```json
{
    "success": true,
    "message": "Thank you! Your message has been received.",
    "id": "uuid"
}
```
**Error Response (400)**:
```json
{
    "success": false,
    "error": "Validation error message"
}
```

#### GET /api/contact/messages (Admin - Optional)
**Purpose**: Retrieve all contact messages (for future admin panel)
**Response (200)**:
```json
{
    "messages": [
        {
            "id": "uuid",
            "name": "string",
            "email": "string",
            "message": "string",
            "created_at": "datetime",
            "read": false
        }
    ]
}
```

#### POST /api/analytics/visit (Optional)
**Purpose**: Track portfolio visits
**Request Body**:
```json
{
    "page": "string",
    "referrer": "string"
}
```

### 3. Frontend Integration Points

#### Contact Form Component
**File**: `/app/frontend/src/components/Contact.jsx`

**Current Mock Behavior**:
- Shows toast notification on submit
- Clears form after submission
- No actual data persistence

**Backend Integration Changes**:
- Import axios
- Update `handleSubmit` to make POST request to `/api/contact`
- Handle loading state during submission
- Handle error responses
- Show success/error toast based on response

**Integration Code**:
```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        const response = await axios.post(`${API}/contact`, formData);
        toast({
            title: "Message Sent!",
            description: response.data.message,
        });
        setFormData({ name: '', email: '', message: '' });
    } catch (error) {
        toast({
            title: "Error",
            description: error.response?.data?.error || "Failed to send message. Please try again.",
            variant: "destructive"
        });
    } finally {
        setIsSubmitting(false);
    }
};
```

### 4. Backend Implementation Steps

1. **Create MongoDB Models**
   - ContactMessage model with validation
   - Optional: Analytics model

2. **Create API Routes**
   - POST /api/contact endpoint with validation
   - Input sanitization
   - Email validation
   - Rate limiting (optional but recommended)

3. **Error Handling**
   - Proper HTTP status codes
   - Descriptive error messages
   - Validation error handling

4. **Email Notifications (Future Enhancement)**
   - Send email to Mayank when contact form submitted
   - Auto-reply to sender

### 5. Data Flow

```
User fills form → Frontend validation → POST to /api/contact
                                              ↓
                                     Backend validation
                                              ↓
                                     Save to MongoDB
                                              ↓
                                     Return success response
                                              ↓
                                     Frontend shows toast
                                              ↓
                                     Form resets
```

### 6. Testing Checklist

- [ ] Contact form submits successfully
- [ ] Data saved to MongoDB
- [ ] Validation works (empty fields, invalid email)
- [ ] Error messages display correctly
- [ ] Success toast appears
- [ ] Form clears after successful submission
- [ ] Loading state works during submission
- [ ] Multiple submissions handled correctly

### 7. Mock Data Status

**Will Remain as Mock (Static Data)**:
- Personal information (name, email, social links)
- Experience data
- Projects data
- Skills data

**Will Be Backend-Driven**:
- Contact form submissions

### 8. Environment Variables

No new environment variables needed. Using existing:
- `MONGO_URL` - Already configured
- `DB_NAME` - Already configured

### 9. Security Considerations

- Input validation and sanitization
- Email format validation
- Message length limits (prevent abuse)
- Optional: Rate limiting per IP
- Optional: CAPTCHA for spam prevention (future)
