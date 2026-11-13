const kotak = document.getElementById("kotak");
const skortext=document.getElementById("skor");

let skor = 0;

kotak.addEventListener("click", function() {
    skor++;

    skortext.textContent = skor;


    const x = Math.random() * 420;
    const y = Math.random() * 220;


    kotak.style.left = x + "px";
    kotak.style.top = y + "px";

})
