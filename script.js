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
]

};

const fonts = [

"Microsoft YaHei",
"SimSun",
"KaiTi",
"FangSong",
"Georgia",
"Times New Roman",
"Garamond",
"Courier New"

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

    return palettes[mode][
        Math.floor(
            Math.random()*5
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

                span.style.backgroundImage =
                    `url(${randomTexture()})`;

                span.style.backgroundSize =
                    "cover";

            }else{

                span.style.background =
                    getColor();
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
