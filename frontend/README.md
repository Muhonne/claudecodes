# MakeMyday Mobile App

A React Native/Expo mobile application for the MakeMyday daily notes platform.

## Prerequisites

- Node.js and npm installed
- Expo Go app installed on your mobile device (for testing)
- Or Android/iOS emulator installed on your computer

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npx expo start
```

2. Use Expo Go on your mobile device to scan the QR code, or press:
   - 'a' to open on Android emulator
   - 'i' to open on iOS simulator

## Connecting to the Backend

Make sure the backend server is running. By default, the app is configured to connect to:
- `http://10.0.2.2:8000` for Android emulator
- `http://localhost:8000` for iOS simulator

You can modify the API_URL in `app/index.js` if your backend is on a different address or port.

## Features

- Create daily notes with content and a rating
- View a list of all your notes
- Edit existing notes
- Delete notes
- Rate your day on a scale of 1-5

## Project Structure

- `app/` - Main application code
  - `index.js` - Main screen with notes functionality
- `assets/` - Images and other static resources
- `components/` - Reusable UI components

## Learn More

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [React Native documentation](https://reactnative.dev/docs/getting-started): Learn about React Native.
