# PhysaFlow Calculator

<p align="center">
  <img src="./assets/images/logo.png" alt="PhysaFlow Calculator" width="180" />
</p>

<p align="center">
  Mobile calculator for estimating data center capacity waste and its annual cost.
</p>

---

## Overview

PhysaFlow Calculator is a cross-platform mobile application built with **React Native** and **Expo**. It enables data center operators to quickly estimate unused infrastructure capacity and understand the financial impact of that waste.

The application is designed with a modern dark interface focused on simplicity, speed, and usability.

---

## Tech Stack

- React Native 0.86
- Expo SDK 57
- Expo Router
- TypeScript
- Zustand
- React Native Reanimated
- React Native Gesture Handler
- Safe Area Context

---

## Requirements

- Node.js 22+
- npm
- Android Studio (Android development)
- Xcode (iOS development on macOS)

---

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start
```

---

## Available Scripts

### Development

```bash
npm run start
```

Starts the Expo development server.

```bash
npm run android
```

Runs the application on Android.

```bash
npm run ios
```

Runs the application on iOS.

```bash
npm run web
```

Runs the application in the browser.

---

### Native Build

Generate native projects:

```bash
npm run prebuild
```

Debug build:

```bash
npm run build:debug
```

Release build:

```bash
npm run build
```

---

### Version Management

Increase patch version:

```bash
npm run version:patch
```

Increase minor version:

```bash
npm run version:minor
```

Increase major version:

```bash
npm run version:major
```

Build while updating the version:

```bash
npm run build:patch
npm run build:minor
npm run build:major
```

---

## Project Structure

```text
assets/
src/
 ├── app/
 ├── components/
 ├── constants/
 ├── hooks/
 ├── stores/
 ├── theme/
 ├── types/
 └── utils/
```

---

## Features

- Cross-platform (Android, iOS and Web)
- Expo Router navigation
- Custom Design System
- Global state management with Zustand
- TypeScript
- Responsive layout
- Native builds with Expo

---

## License

This project was developed as part of the PhysaFlow platform.
