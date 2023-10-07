from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Character(BaseModel):
    description: str
    name: str
    gender: str
    age: str
    voice: str
    # Assuming you'll be sending the image as a base64 string for simplicity
    image: str 

@app.post("/create-character/")
async def create_character(character: Character):
    print(character)
    return {"status": "success", "message": "Character received!"}
