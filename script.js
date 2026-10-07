const questionsData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the largest ocean?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific"
  },
  {
    question: "Which element has the chemical symbol O?",
    options: ["Gold", "Oxygen", "Silver", "Iron"],
    answer: "Oxygen"
  }
];

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsContainer.innerHTML = "";
  questionsData.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${q.question}</p>`;
    q.options.forEach(option => {
      const id = `q${index}_${option}`;
      const checked = progress[index] === option ? "checked" : "";
      div.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${option}" ${checked}>
          ${option}
        </label><br>
      `;
    });
    questionsContainer.appendChild(div);
  });
}

// Save progress when user selects an option
questionsContainer.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    const name = e.target.name;
    const index = parseInt(name.replace("q", ""));
    progress[index] = e.target.value;
    sessionStorage.setItem("progress", JSON.stringify(progress));
  }
});

// Submit quiz
submitBtn.addEventListener("click", () => {
  let score = 0;
  questionsData.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });
  scoreDiv.textContent = `Your score is ${score} out of ${questionsData.length}.`;
  localStorage.setItem("score", score);
});

// Show score if already stored
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of ${questionsData.length}.`;
}

// Initial render
renderQuestions();
