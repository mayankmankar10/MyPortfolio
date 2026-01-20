from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid


class ContactMessageCreate(BaseModel):
    """Model for creating a new contact message"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)


class ContactMessage(BaseModel):
    """Model for contact message with all fields"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class ContactResponse(BaseModel):
    """Response model for successful contact submission"""
    success: bool
    message: str
    id: str


class ErrorResponse(BaseModel):
    """Response model for errors"""
    success: bool = False
    error: str
