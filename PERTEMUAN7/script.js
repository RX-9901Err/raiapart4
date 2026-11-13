// Komputer memilih angka random 1–100
const secretNumber =
  Math.floor(Math.random() * 100) + 1;


// Ambil element dari HTML
const input =
  document.querySelector("#guess");

const button =
  document.querySelector("#check");

const result =
  document.querySelector("#result");


// TODO 1
// Pasang event click pada button
button.addEventListener("click", checkGuess);


// TODO 2
// Buat function bernama checkGuess
function checkGuess() {



// Di dalam checkGuess():

// TODO 3
// Ambil nilai dari input
// Ingat: input.value masih berupa string
    const guess = Number(input.value);

// TODO 4
// Jika tebakan sama dengan secretNumber
// tampilkan "🎉 Benar!"
    if (guess === secretNumber) {
        result.textContent = "🎉 Benar!";


// TODO 5
// Jika tebakan lebih besar
// tampilkan "📉 Terlalu besar"
    } else if (guess > secretNumber) {
        result.textContent = "📉 Terlalu besar";


// TODO 6
// Jika tebakan lebih kecil
// tampilkan "📈 Terlalu kecil"
    } else {
        result.textContent = "📈 Terlalu kecil";
    }
}