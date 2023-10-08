from fastapi import FastAPI, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
from PIL import Image
from datetime import datetime

app = FastAPI()

UPLOAD_DIR = "uploaded_images"

# Ensure upload directory exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.post("/create-character/")
async def create_character(
    description: str = Form(...),
    name: str = Form(...),
    gender: str = Form(...),
    age: str = Form(...),
    voice: str = Form(...),
    image: UploadFile = File(...)
):
    # Save the uploaded image to the directory
    image_filename = os.path.join(UPLOAD_DIR, image.filename)
    with open(image_filename, "wb") as buffer:
        image_content = image.file.read()
        buffer.write(image_content)

    # Get image dimensions
    with Image.open(image_filename) as img:
        width, height = img.size

    # Get current time
    creation_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Extract and print image metadata
    image_metadata = {
        "Filename": image.filename,
        "Content-Type": image.content_type,
        "Size (bytes)": len(image_content),
        "Dimensions": f"{width}x{height}"
    }

    # Neatly print the received character data and creation time
    print(f"Received Character Information at {creation_time}:\n"
          f"--------------------------\n"
          f"Name: {name}\n"
          f"Description: {description}\n"
          f"Gender: {gender}\n"
          f"Age: {age}\n"
          f"Voice: {voice}\n"
          f"Image saved as: {image_filename}\n"
          f"Image Metadata:\n"
          f"\tFilename: {image_metadata['Filename']}\n"
          f"\tContent-Type: {image_metadata['Content-Type']}\n"
          f"\tSize (bytes): {image_metadata['Size (bytes)']}\n"
          f"\tDimensions: {image_metadata['Dimensions']}\n"
          f"--------------------------")
    
    return {
        "status": "success",
        "message": "Character received!",
        "character_name": name,
        "image_status": "Image uploaded successfully",
        "image_dimensions": image_metadata['Dimensions'],
        "creation_time": creation_time
    }

# Setup CORS to accept requests from your React app
# TODO: Restrict access for deployment and secure endpoints
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
