/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
    content: ["./views/*.{pug,html}", "./views/includes/*.{pug,html}"],
    theme: {
        colors: {
            "white": "#FFFFFF",
            "black": "#000103",
            "red": "#EF2917",
            "yellow": "#FFE548",
            "blue": "4357AD",
        },
        extend: {},
    },
    plugins: [
        plugin(function({ addBase, theme }) {
            addBase({
                html: { margin: theme("margin.0"), padding: theme("padding.0") },
                body: { margin: theme("margin.0"), padding: theme("padding.0") },
                h1: { fontSize: theme("fontSize.8xl") },
            })
        })
    ],
}

