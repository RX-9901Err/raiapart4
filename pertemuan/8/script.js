const quotes = [
  {
    text: "Belajar coding itu bukan tentang menghafal, tapi memahami pola.",
    author: "Code Academy"
  },
  {
    text: "Error adalah bagian dari perjalanan menjadi programmer.",
    author: "Developer Wisdom"
  },
  {
    text: "Programmer yang baik bukan yang tidak pernah error, tapi yang tahu cara mencari solusinya.",
    author: "Anonymous"
  },
  {
    text: "Mulai dari project kecil, lalu terus tingkatkan.",
    author: "Coding Journey"
  }
];


// ====================================
// STEP 1
// Ambil element dari HTML
// ====================================

// TODO:
// Ambil element dengan id "quote"
const quoteElement = document.getElementById('quote');


// TODO:
// Ambil element dengan id "author"
const authorElement = document.getElementById('author');


// TODO:
// Ambil button dengan id "randomButton"
const randomButton = document.getElementById('randomButton');


// TODO:
// Ambil button dengan id "copyButton"
const copyButton = document.getElementById('copyButton');

const alertElement = document.getElementById('alert');



// ====================================
// STEP 2
// Membuat random number
// ====================================

function getRandomIndex() {

  // TODO:
  // Buat random number
  // dari 0 sampai jumlah quote - 1

  return  Math.floor(Math.random() * quotes.length);

}



// ====================================
// STEP 3
// Menampilkan random quote
// ====================================

function showRandomQuote() {

  // TODO:
  // 1. Ambil random index
   const randomIndex = getRandomIndex();

   const selectedQuote = quotes[randomIndex];

   quoteElement.textContent = selectedQuote.text;
   authorElement.textContent = selectedQuote.author;


  // TODO:
  // 2. Ambil quote berdasarkan index


  // TODO:
  // 3. Ubah text quote di halaman


  // TODO:
  // 4. Ubah nama author

}



// ====================================
// STEP 4
// Tombol random
// ====================================

// TODO:
//
// Saat tombol randomButton diklik,
// jalankan function showRandomQuote()
randomButton.addEventListener('click', showRandomQuote);


// ====================================
// STEP 5
// Copy Quote
// ====================================

function copyQuote() {

  // TODO:
  //
  // Gabungkan quote + author
  // lalu copy menggunakan:
  //
  // navigator.clipboard.writeText
  const quoteText = quoteElement.textContent;
  const authorText = authorElement.textContent;
  const fullQuote = `${quoteText} - ${authorText}`;

  navigator.clipboard.writeText(fullQuote);
  alertElement.textContent = "Quote berhasil disalin ke clipboard!";
}


// TODO:
//
// Saat tombol copyButton diklik,
// jalankan copyQuote()
copyButton.addEventListener('click', copyQuote);
