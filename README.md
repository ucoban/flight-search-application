# Flight Search Application

A modern flight search application built with React and TypeScript, inspired by Google Flights.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Sky Scrapper API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (`npm install -g pnpm`)
- RapidAPI Key (for Sky Scrapper API)

### Installation

1. Clone the repository

```bash
git clone https://github.com/ucoban/flight-search-application.git
cd flight-search-application
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env` file in the root directory

```bash
VITE_RAPID_API_KEY=your_rapidapi_key_here
VITE_RAPID_API_HOST=sky-scrapper.p.rapidapi.com
```

4. Start the development server

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components
│   └── ...          # Other components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── utils/           # Helper functions
├── services/        # API calls
└── assets/          # Images, styles, etc.
```

## Features

- Real-time flight search functionality
- Date and destination selection
- Interactive flight listings with pricing
- Flight duration and layover information
- Responsive design

## Development

This project uses:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Vite for fast development and building

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/search-functionality`)
3. Commit your changes (`git commit -m 'feat: implement search functionality'`)
4. Push to the branch (`git push origin feature/search-functionality`)
5. Open a Pull Request

## License

[MIT License](LICENSE)
