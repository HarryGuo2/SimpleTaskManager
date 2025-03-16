# Simple Task Manager

A clean, intuitive mobile task management application built with React Native and Expo.

## Features

- Create and manage tasks with an elegant, animated interface
- Mark tasks as complete/incomplete with visual feedback
- Delete tasks with confirmation dialog
- Real-time counter for remaining tasks
- Smooth animations for task creation, completion, and deletion
- Empty state message when no tasks exist
- Responsive design that works across different device sizes

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or newer)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- iOS Simulator (for Mac users) or [Expo Go](https://expo.dev/client) app installed on your physical device

### Installation Steps

1. Clone the repository or download the source code
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory
   ```
   cd SimpleTaskManager
   ```

3. Install dependencies
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the App

#### On iOS Simulator (Mac only)
```
npm run ios
```
or
```
yarn ios
```

#### On Android Emulator
```
npm run android
```
or
```
yarn android
```

#### On Physical Device
1. Start the Expo development server
   ```
   npm start
   ```
   or
   ```
   expo start
   ```

2. For better connectivity, especially on networks with restrictions, use tunnel mode:
   ```
   expo start --tunnel
   ```

3. Scan the QR code with your device:
   - iOS: Use the Camera app
   - Android: Use the Expo Go app

## Usage Instructions

- **Adding a task**: Type your task in the input field at the bottom of the screen and press the '+' button or hit 'return/done' on the keyboard
- **Completing a task**: Tap on a task to toggle its completion status
- **Deleting a task**: Tap the 'x' button on the right side of a task and confirm deletion
- **Task counter**: The header displays how many incomplete tasks remain

## Project Structure

The app is built using a component-based architecture:

- **App.js**: Main component that manages state and renders child components
- **TaskItem**: Component for displaying individual tasks with completion toggle and delete functionality
- **Header**: Component for displaying the app title and remaining task count
- **TaskInput**: Component for adding new tasks

## Libraries and Dependencies

- **React Native**: Core framework for building the mobile application
- **Expo**: Development platform for creating and building React Native apps with simplified workflow
- **react-native-reanimated** (implied): Advanced animations library for smooth UI interactions
- **expo-status-bar**: Component for controlling the status bar appearance

## Styling

The app uses React Native's StyleSheet API for styling, with a clean, minimalist design featuring:

- Soft shadows for depth
- Modern color palette with green accents
- Visual feedback for task completion
- Responsive sizing for different screens
- Animated transitions for better user experience

## License

[Add your license information here] 