# Flight Search Application

A modern flight search application built with React and TypeScript, inspired by Google Flights.

## Demo

- 🌐 **Live Demo**: [Flight Search App](https://flight-search-application-git-dev-ucobans-projects.vercel.app/)

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Sky Scrapper API
- React Query
- React Router
- Radix UI
- HeadlessUI
- React Day Picker

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
VITE_SKY_SCRAPPER_API_URL=https://sky-scrapper.p.rapidapi.com/api
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
├── types/          # TypeScript type definitions
├── lib/            # Library configurations
├── services/       # API calls and services
└── assets/         # Images, styles, etc.
```

## Features

- Real-time flight search functionality
- Interactive date picker for flight scheduling
- One-way and round-trip support
- Advanced passenger selection
- Detailed flight information including:
  - Flight duration calculation
  - Stop/layover information
  - Price comparison
  - Airline details
- Responsive design for mobile and desktop
- Error boundary protection
- Loading states and error handling

## Future Improvements

### Enhanced Flight Search

- Implement pagination for flight listings
- Add sorting options (by price, duration, stops)
- Add filters for airlines, departure times, and price ranges
- Implement price alerts for specific routes

### API Integration

- Support additional Sky Scrapper API endpoints:
  - Flight tracking
  - Airline information
  - Airport details
  - Historical price data
- Implement caching for frequently searched routes
- Add multi-city trip support

### User Experience

- Save recent searches
- Add favorite routes functionality
- Add flight price history charts
- Support for multiple languages

### Technical Improvements

- Add end-to-end testing
- Improve performance optimization

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
