const textures = [

"paper0.jpg",
"paper1.jpg",
"paper2.jpg",
"paper3.jpg",
"paper4.jpg",
"paper5.jpg",
"paper6.jpg",
"paper7.jpg",
"paper8.jpg",
"paper9.jpg"

];

const palettes = {

blue:[
"#6B7FA5",
"#8196B9",
"#94A6C8",
"#7488B2",
"#5D7198"
],

green:[
"#8A9B7B",
"#9DAE8E",
"#B0BEA1",
"#7F8F71",
"#6C7B60"
],

pink:[
"#D7A4B0",
"#C98F9B",
"#E1B7C0",
"#B97A87",
"#E9C9D0"
],

brown:[
"#C08A5A",
"#D19A69",
"#A87044",
"#E0B182",
"#C57F42"
],

gray:[
"#909090",
"#A8A8A8",
"#777777",
"#B8B8B8",
"#666666"
],

yellow:[
"#D8B75B",
"#E3C96A",
"#F0DA7C",
"#CDA94A",
"#F3E29B"
],

pinkgreen:[
"#FF6FA8",
"#FF92BC",
"#FFB6D0",
"#65D18C",
"#44C76E",
"#87E4A4"
],

orangegreen:[
"#FF8B3D",
"#FFB347",
"#FF6B35",
"#4CC96C",
"#79D970"
],

blueyellow:[
"#3A86FF",
"#6AA7FF",
"#FFD23F",
"#FFE169"
],

whatisthis:[
"#4A86E8",
"#B7FF3C",
"#F9F9F9",
"#BFBFBF",
"#6F6F6F"
]

};

const fonts = [

"Microsoft YaHei",

"KaiTi",

"Georgia",

"Garamond",

"Times New Roman",

"Courier New",

"serif",

"sans-serif"

];

function randomTexture(){

    return textures[
        Math.floor(
            Math.random()*textures.length
        )
    ];
}

function randomRotate(){

    return (
        Math.random()*12
    ) - 6;
}

function randomOffset(){

    return (
        Math.random()*12
    ) - 6;
}

function randomFont(){

    return fonts[
        Math.floor(
            Math.random()*fonts.length
        )
    ];
}

function randomFontSize(){

    return (
        Math.floor(
            Math.random()*13
        ) + 18
    );
}

function getColor(){

    const mode =
        document.getElementById(
            "palette"
        ).value;

    if(mode==="random"){

        const all=[];

        Object.values(
            palettes
        ).forEach(
            p=>all.push(...p)
        );

        return all[
            Math.floor(
                Math.random()*all.length
            )
        ];
    }

    if(mode==="randomplus"){

        const paletteNames =
            Object.keys(
                palettes
            );

        const chosenPalette =
            paletteNames[
                Math.floor(
                    Math.random()*paletteNames.length
                )
            ];

        const colors =
            palettes[
                chosenPalette
            ];

        return colors[
            Math.floor(
                Math.random()*colors.length
            )
        ];
    }

    return palettes[mode][
        Math.floor(
            Math.random()*
            palettes[mode].length
        )
    ];
}

function generate(){

    const canvas =
        document.getElementById(
            "canvas"
        );

    canvas.innerHTML="";

    const bgMode =
        document.getElementById(
            "backgroundMode"
        ).value;

    if(bgMode==="paper"){

        canvas.style.backgroundImage =
            `url(${randomTexture()})`;

        canvas.style.backgroundSize =
            "cover";

        canvas.style.backgroundColor =
            "";

    }else{

        canvas.style.backgroundImage =
            "none";

        canvas.style.background =
            document.getElementById(
                "bgColor"
            ).value;
    }

    const text =
        document.getElementById(
            "input"
        ).value;

    const lines =
        text.split("\n");

    lines.forEach(line=>{

        const row =
            document.createElement(
                "div"
            );

        row.className="line";

        const words =
            line.trim().split(/\s+/);

        words.forEach(word=>{

            if(!word) return;

            const span =
                document.createElement(
                    "span"
                );

            span.className="word";

            span.textContent =
                word;

            span.style.fontFamily =
                randomFont();

            span.style.fontSize =
                randomFontSize() + "px";

            span.style.transform =
                `rotate(${randomRotate()}deg)
                 translateY(${randomOffset()}px)`;

            const mode =
                document.getElementById(
                    "palette"
                ).value;

            if(mode==="paper"){

                const texture =
                    randomTexture();

                span.style.backgroundImage =
                    `url(${texture})`;

                span.style.backgroundSize =
                    "cover";

                if(texture.includes("paper5")){

                    span.style.color =
                        "#ffffff";

                }else{

                    const darkColors = [

                        "#111111",
                        "#333333",
                        "#555555",
                        "#777777"

                    ];

                    span.style.color =
                        darkColors[
                            Math.floor(
                                Math.random()*
                                darkColors.length
                            )
                        ];

                }

            }else{

                span.style.background =
                    getColor();

                const textColors = [

                    "#ffffff",
                    "#111111",
                    "#333333",
                    "#313648",
                    "#282c27",
                    "#444324"

                ];

                span.style.color =
                    textColors[
                        Math.floor(
                            Math.random()*
                            textColors.length
                        )
                    ];

            }

            row.appendChild(span);

        });

        canvas.appendChild(row);

    });

}

function downloadPNG(){

    html2canvas(
        document.getElementById(
            "canvas"
        ),
        {
            scale:3
        }
    ).then(canvas=>{

        const link =
            document.createElement(
                "a"
            );

        link.download =
            "collage_poem.png";

        link.href =
            canvas.toDataURL();

        link.click();

    });

}

window.onload = generate;
