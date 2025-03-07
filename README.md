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

## Troubleshooting

### Connection Issues

If you see errors like "ERR_CONNECTION_TIMED_OUT" or "Failed to fetch" when using the app:

1. **Verify the backend is running**
   - Make sure the FastAPI server is running with `python app.py` in the backend directory
   - Confirm it's running on the correct port (8000 by default)

2. **Check API URL configuration**
   - Edit `frontend/app/index.js` and modify the API_URL:
     - For Android emulator: `http://10.0.2.2:8000` (special address to reach host machine)
     - For iOS simulator: `http://localhost:8000`
     - For physical devices: Use your computer's local IP address like `http://192.168.1.X:8000`

3. **Network Configuration**
   - Make sure your phone/emulator and computer are on the same network
   - Check if your firewall is blocking the connections
   - Try disabling any VPN services that might interfere

4. **Testing the API**
   - Use a tool like Postman or curl to test API endpoints directly
   - Check the backend logs for any error messages

5. **CORS Issues**
   - The backend has CORS configured to accept requests from any origin
   - If you see CORS errors, restart the backend server to apply the CORS configuration