from fastapi import FastAPI, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os

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
        buffer.write(image.file.read())
    
    # Here, you can process the rest of the data as needed
    print(description, name, gender, age, voice)
    
    return {"status": "success", "message": "Character received!"}

# Setup CORS to accept requests from your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
