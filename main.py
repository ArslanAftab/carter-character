from fastapi import FastAPI, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
from PIL import Image
from datetime import datetime

app = FastAPI()

UPLOAD_DIR = "uploaded_images"

# Ensure upload directory exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.get("/config/")
async def get_config():
    return {
        "upload_dir": UPLOAD_DIR,
    }

@app.post("/create-character/")
async def create_character(
    description: str = Form(...),
    name: str = Form(...),
    gender: str = Form(...),
    age: str = Form(...),
    voice: str = Form(...),
    image: UploadFile = File(...)
):
    
    # Save the uploaded image to the directory with a unique name
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    unique_filename = f"{timestamp}_{image.filename}"
    image_filename = os.path.join(UPLOAD_DIR, unique_filename)
    image_url = f"http://localhost:8000/{UPLOAD_DIR}/{unique_filename}"

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
        "image_path": f"/{UPLOAD_DIR}/{unique_filename}",  # Return a web-accessible path
        "creation_time": creation_time
    }
import os

@app.get("/uploaded_images/{filename}")
async def serve_image(filename: str):
    image_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(image_path):
        print(f"Image {image_path} does not exist.")
        return "Image not found", 404
    return FileResponse(image_path)

# Setup CORS to accept requests from your React app
# TODO: Restrict access for deployment and secure endpoints
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)