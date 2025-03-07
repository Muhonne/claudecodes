from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import date

app = FastAPI(title="MakeMyday API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class DayNote(BaseModel):
    id: str
    date: date
    content: str
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")

# In-memory storage for simplicity (replace with a database in production)
day_notes = {}

class DayNoteCreate(BaseModel):
    content: str
    rating: int = Field(..., ge=1, le=5)

@app.post("/create", response_model=DayNote)
def create_day_note(note: DayNoteCreate):
    note_id = str(uuid.uuid4())
    today = date.today()
    
    new_note = DayNote(
        id=note_id,
        date=today,
        content=note.content,
        rating=note.rating
    )
    
    day_notes[note_id] = new_note
    return new_note

class DayNoteUpdate(BaseModel):
    content: str = None
    rating: int = Field(None, ge=1, le=5)

@app.put("/update/{note_id}", response_model=DayNote)
def update_day_note(note_id: str, update_data: DayNoteUpdate):
    if note_id not in day_notes:
        raise HTTPException(status_code=404, detail="Note not found")
    
    note = day_notes[note_id]
    
    if update_data.content is not None:
        note.content = update_data.content
    if update_data.rating is not None:
        note.rating = update_data.rating
    
    day_notes[note_id] = note
    return note

@app.delete("/delete/{note_id}")
def delete_day_note(note_id: str):
    if note_id not in day_notes:
        raise HTTPException(status_code=404, detail="Note not found")
    
    del day_notes[note_id]
    return {"message": "Note deleted successfully"}

@app.get("/alldays", response_model=List[DayNote])
def get_all_day_notes():
    return list(day_notes.values())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)