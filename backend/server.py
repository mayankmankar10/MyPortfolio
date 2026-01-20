from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime

from models import ContactMessageCreate, ContactMessage, ContactResponse, ErrorResponse


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Mayank's Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running", "status": "healthy"}


# Contact form endpoint
@api_router.post("/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(contact_data: ContactMessageCreate):
    """
    Submit a contact form message
    
    - **name**: Your full name (2-100 characters)
    - **email**: Your email address
    - **message**: Your message (10-2000 characters)
    """
    try:
        # Create contact message object
        contact_message = ContactMessage(
            name=contact_data.name,
            email=contact_data.email,
            message=contact_data.message
        )
        
        # Save to database
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if result.inserted_id:
            logger.info(f"New contact message received from {contact_data.email}")
            return ContactResponse(
                success=True,
                message="Thank you! Your message has been received. I'll get back to you soon!",
                id=contact_message.id
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save message"
            )
            
    except Exception as e:
        logger.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your message. Please try again."
        )


# Get all contact messages (for admin/future use)
@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages(limit: int = 100):
    """
    Retrieve all contact messages (admin endpoint)
    
    - **limit**: Maximum number of messages to retrieve (default: 100)
    """
    try:
        messages = await db.contact_messages.find().sort("created_at", -1).limit(limit).to_list(limit)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        logger.error(f"Error retrieving messages: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve messages"
        )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()