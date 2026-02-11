/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                brand: {
                    red: '#990000',    // Deep Campaign Red
                    green: '#006B3F',  // Nakuru Viwandani Green
                    dark: '#111827',   // Dark Gray/Black
                    light: '#F3F4F6',  // Light Gray
                    surface: '#FFFFFF', // White
                    black: '#000000'
                }
            },
            backgroundImage: {
                // User's custom hero image
                'hero-pattern': "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('/images/Jezioro-Nakuru.jpg')",
            }
        },
    },
    plugins: [],
}
