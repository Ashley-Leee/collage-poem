const colors = [
  "#4f5ea7",
  "#6677c9",
  "#5c6fc0",
  "#7b8dd6",
  "#5e86cf"
];

function generate(){

  const canvas =
    document.getElementById("canvas");

  canvas.innerHTML="";

  canvas.style.background =
    document.getElementById("bgColor").value;

  const text =
    document.getElementById("input").value;

  const lines =
    text.split("\n");

  lines.forEach(line=>{

    const row =
      document.createElement("div");

    row.className="line";

    const words =
      line.trim().split(/\s+/);

    words.forEach(word=>{

      if(word==="") return;

      const span =
        document.createElement("span");

      span.className="word";

      span.textContent=word;

      span.style.background=
        colors[Math.floor(Math.random()*colors.length)];

      span.style.transform=
        `rotate(${Math.random()*10-5}deg)`;

      row.appendChild(span);

    });

    canvas.appendChild(row);

  });

}

function downloadPNG(){

  html2canvas(
    document.getElementById("canvas")
  ).then(canvas=>{

    const a =
      document.createElement("a");

    a.href =
      canvas.toDataURL();

    a.download =
      "poem.png";

    a.click();
  });

}
