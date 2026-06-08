const palettes = {
    blue: [
        "#5064A9",
        "#5F74B8",
        "#6D84C8",
        "#8097D8",
        "#4960B5"
    ],

    green: [
        "#5F806B",
        "#78937E",
        "#8AA88D",
        "#6C9272",
        "#A7B79A"
    ],

    pink: [
        "#C38A9D",
        "#D39EB0",
        "#B97A8F",
        "#D8B2BF",
        "#AA6C81"
    ],

    orange: [
        "#C98D5B",
        "#D89F6C",
        "#B7784D",
        "#D9AE7A",
        "#E0BC8F"
    ]
};

const fonts = [
    "Georgia",
    "Times New Roman",
    "Palatino Linotype",
    "Trebuchet MS",
    "Arial",
    "Verdana",
    "Courier New"
];

function randomRotate() {
    return Math.random() * 12 - 6;
}

function randomTranslate() {
    return Math.random() * 8 - 4;
}

function randomFont() {
    return fonts[
        Math.floor(Math.random() * fonts.length)
    ];
}

function getColor() {

    const mode =
        document.getElementById("palette").value;

    if (mode === "random") {

        const all = [
            ...palettes.blue,
            ...palettes.green,
            ...palettes.pink,
            ...palettes.orange
        ];

        return all[
            Math.floor(Math.random() * all.length)
        ];
    }

    const palette = palettes[mode];

    return palette[
        Math.floor(Math.random() * palette.length)
    ];
}

function generate() {

    const canvas =
        document.getElementById("canvas");

    canvas.innerHTML = "";

    canvas.style.background =
        document.getElementById("bgColor").value;

    const text =
        document.getElementById("input").value;

    const lines =
        text.split("\n");

    lines.forEach(line => {

        const row =
            document.createElement("div");

        row.className = "line";

        const words =
            line.trim().split(/\s+/);

        words.forEach(word => {

            if (!word) return;

            const span =
                document.createElement("span");

            span.className = "word";

            span.textContent = word;

            span.style.background =
                getColor();

            span.style.fontFamily =
                randomFont();

            span.style.transform =
                `rotate(${randomRotate()}deg) translateY(${randomTranslate()}px)`;

            row.appendChild(span);
        });

        canvas.appendChild(row);
    });
}

function downloadPNG() {

    html2canvas(
        document.getElementById("canvas")
    ).then(canvas => {

        const link =
            document.createElement("a");

        link.download =
            "collage_poem.png";

        link.href =
            canvas.toDataURL();

        link.click();
    });
}

window.onload = generate;
