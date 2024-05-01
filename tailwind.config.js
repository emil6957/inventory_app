/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
    content: ["./views/*.{pug,html}", "./views/includes/*.{pug,html}"],
    theme: {
        extend: {
            colors: {
                "white": "#FFFFFF",
                "black": "#000103",
                "red": "#EF2917",
                "yellow": "#FFE548",
                "blue": "4357AD",
                "gold": "#C8B568",
            },
            fontFamily: {
                body: ["Lato"],
            },
            keyframes: {
                spinOnce: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                turnToGold: {
                    "100%": { color: "gold" },
                },
            },
            animation: {
                spinOnce: "spinOnce 1s 1",
                turnToGold: "turnToGold 500ms 1 forwards",
            },
        },
    },
    plugins: [
        plugin(function({ addBase, theme }) {
            addBase({
                "*": { fontFamily: ["Lato"] },
                html: { margin: theme("margin.0"), padding: theme("padding.0") },
                body: { margin: theme("margin.0"), padding: theme("padding.0") },
                h1: { fontSize: theme("fontSize.8xl") },
            })
        })
    ],
}

