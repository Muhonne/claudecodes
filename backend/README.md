# MakeMyday Backend API

A simple FastAPI backend for the MakeMyday daily notes application.

## Setup

1. Create a virtual environment:
```bash
python3 -m venv venv
```

2. Activate the virtual environment:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

To start the development server:

```bash
python app.py
```

The API will be available at http://localhost:8000

You can access the Swagger API documentation at http://localhost:8000/docs

## API Endpoints

- **POST /create** - Create a new day note
  - Body: `{"content": "Your note text", "rating": 4}`
  
- **GET /alldays** - Get all day notes
  
- **PUT /update/{note_id}** - Update a day note
  - Body: `{"content": "Updated text", "rating": 5}`
  - You can update just content or just rating by including only that field
  
- **DELETE /delete/{note_id}** - Delete a day note

## Running Tests

```bash
python -m pytest test_app.py -v
```