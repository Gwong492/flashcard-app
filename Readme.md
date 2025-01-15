# Flashcard App

A user-friendly flashcard application designed to help users create, manage, and study custom flashcards. This app allows users to organize their flashcards into decks and study them efficiently. All data is locally stored in a JSON file, making it lightweight and easy to use.

## Features

- **Deck Management**:
  - Create, edit, and delete decks.
- **Card Management**:
  - Add, edit, and delete cards within decks.
- **Study Mode**:
  - View cards from a selected deck and study them in an interactive manner.
- **Local Data Storage**:
  - All data is stored locally in a JSON file for easy management and portability.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js
- **Local Storage**: JSON file
- **Package Manager**: Node Package Manager (npm)

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd flashcard-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the app**:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. **Create Decks**: Navigate to the "Decks" section and click "Add Deck" to create a new deck.
2. **Manage Cards**: Open a deck and add, edit, or delete cards as needed.
3. **Study Decks**: Select a deck and start the study session to review your cards interactively.

## HTTP Request Management

All HTTP requests are managed in `src/utils/apis/index.js`. This file abstracts the API logic and ensures smooth communication with the local JSON data store.

## Dependencies

- React
- Node.js
- npm

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push the branch.
   ```bash
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```
4. Open a pull request.

