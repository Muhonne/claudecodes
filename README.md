# MakeMyday - Daily Journal Application

MakeMyday is a simple daily journal application that allows users to track and rate their days.

## Project Structure

This project is divided into two main components:

### Backend

The backend is built with Python using FastAPI and provides a RESTful API for creating, reading, updating, and deleting day notes.

- Directory: `/backend`
- Technology: Python, FastAPI
- Features:
  - Create daily notes with content and numerical rating
  - Retrieve all notes
  - Update existing notes
  - Delete notes
  - Unit tests

For more details, see the [backend README](/backend/README.md).

### Frontend

The frontend is a mobile application built with React Native and Expo.

- Directory: `/frontend`
- Technology: React Native, Expo
- Features:
  - User-friendly interface for creating and viewing notes
  - Rate your day on a scale from 1 to 5
  - Edit or delete existing entries
  - Mobile-friendly design

For more details, see the [frontend README](/frontend/README.md).

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python app.py
```

The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npx expo start
```

4. Use Expo Go on your mobile device to scan the QR code, or press:
   - 'a' to open on Android emulator
   - 'i' to open on iOS simulator

## API Endpoints

- **POST /create** - Create a new day note
- **GET /alldays** - Get all day notes
- **PUT /update/{note_id}** - Update a day note
- **DELETE /delete/{note_id}** - Delete a day note