const questions = [
  {
    question: "Apa hasil dari 10 + 5?",
    answers: ["10", "15", "20", "25"],
    correct: "15"
  },
  {
    question: "Bahasa yang berjalan di browser adalah?",
    answers: ["Java", "Python", "JavaScript", "PHP"],
    correct: "JavaScript"
  },
  {
    question: "HTML digunakan untuk?",
    answers: ["Database", "Struktur halaman", "Server", "Mengedit gambar"],
    correct: "Struktur halaman"
  },
  {
    question: "CSS digunakan untuk?",
    answers: ["Styling halaman", "Database", "Authentication", "Server"],
    correct: "Styling halaman"
  },
  {
    question: "Apa hasil dari 5 * 2?",
    answers: ["7", "10", "15", "25"],
    correct: "10"
  }
];

// GAME STATE
let currentQuestionIndex = 0;
let score = 0;

// DOM
const questionElement = document.getElementById("question");
const answerContainer = document.getElementById("answerContainer");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
const feedbackElement = document.getElementById("feedback");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const finalScoreElement = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

function renderQuestion() {
  answerContainer.innerHTML = "";
  feedbackElement.innerHTML = "";
  answerContainer.innerHTML = "";

  // TODO: ambil questions[currentQuestionIndex]


  // TODO: tampilkan question


  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  // TODO: tampilkan progress
  progressElement.textContent = `Question: ${currentQuestionIndex + 1}/${questions.length}`;

  currentQuestion.answers.forEach(function(answer) {
    // TODO: buat button
    const button = document.createElement("button");

    // TODO: isi text button
    button.textContent = answer;

    button.classList.add("answer-button");

    // TODO: saat diklik jalankan checkAnswer(answer)
    button.addEventListener("click", function() {
      checkAnswer(answer);
    });

    // TODO: append button ke answerContainer
    answerContainer.appendChild(button);
  });
}

function checkAnswer(selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex];

  // TODO: bandingkan selectedAnswer dengan currentQuestion.correct
  if (selectedAnswer === currentQuestion.correct) {
    // TODO: tambah score 10
    score += 10;
    feedbackElement.textContent = "✅ Correct! +10 XP";
    feedbackElement.className = "correct";
  } else {
    feedbackElement.textContent = "❌ Wrong!";
    feedbackElement.className = "wrong";
  }

  // TODO: update tampilan score
  scoreElement.textContent = `Score: ${score}`;


  setTimeout(function() {
    nextQuestion();
  }, 1000);
}

function nextQuestion() {
  // TODO: currentQuestionIndex + 1
  currentQuestionIndex++;
  // TODO:


  // jika habis → showResult()
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  }else {
    showResult();
  }
}



function showResult() {
  // TODO: sembunyikan gameScreen
  gameScreen.classList.add("hidden");
  // TODO: tampilkan resultScreen
  resultScreen.classList.remove("hidden");
  // TODO: tampilkan final score
  finalScoreElement.textContent = `Your final score is: ${score}`;

}

function restartGame() {
  // TODO: reset index
  currentQuestionIndex = 0;
  // TODO: reset score
  score = 0;
  // TODO: update UI score
  scoreElement.textContent = `Score: ${score}`;
  // TODO: sembunyikan resultScreen
  resultScreen.classList.add("hidden");
  // TODO: tampilkan gameScreen
  gameScreen.classList.remove("hidden");
  // TODO: renderQuestion()
    renderQuestion();
}

// TODO: restartButton click → restartGame()

restartButton.addEventListener("click", restartGame);

renderQuestion();
