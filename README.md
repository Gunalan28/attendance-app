# College Attendance App

A React Native (Expo) application for managing college attendance for Students, Faculty, and Admins.

## Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Expo Go app on your physical device (Android/iOS) OR Android Studio/Xcode for emulators.

## Installation

1. Navigate to the project directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

Start the development server:

```bash
npx expo start
```

- **Scan the QR code** with the **Expo Go** app (Android) or Camera (iOS) to run on your phone.
- Press **`a`** to open in Android Emulator.
- Press **`i`** to open in iOS Simulator (macOS only).
- Press **`w`** to open in Web Browser.

## Project Structure

- `app/`: Contains all screens and navigation (Expo Router).
  - `(auth)`: Login & Forgot Password.
  - `(admin)`: Admin Dashboard & Management.
  - `(faculty)`: Faculty Dashboard & Attendance.
  - `(student)`: Student Dashboard & History.
- `components/`: Reusable UI components.
- `global.css`: NativeWind (Tailwind) styles.

## Tech Stack

- **Framework**: React Native (Expo)
- **Styling**: NativeWind (Tailwind CSS)
- **Navigation**: Expo Router
