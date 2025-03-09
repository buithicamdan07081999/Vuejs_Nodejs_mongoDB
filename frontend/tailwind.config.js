/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Đảm bảo Tailwind quét toàn bộ file trong src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

