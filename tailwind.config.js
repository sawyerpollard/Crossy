require('dotenv').config()

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
    important: `#${process.env.CROSSY_ROOT}`,
};
