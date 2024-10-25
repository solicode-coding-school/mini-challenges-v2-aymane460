const currentQuestionElement = document.getElementById("currentQuestion");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionProgress = document.getElementById("questionProgress");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressBarFull = document.getElementById("progressBarFull");
const retryButton = document.getElementById("retryButton");

let score = 0;
let questionCounter = 0;
let acceptingAnswers = true;


const questions = [
    "Inside which HTML element do we put the JavaScript?",
    "What is the correct syntax for referring to an external script called 'xxx.js'?",
    "How do you write 'Hello World' in an alert box?",
    "What does CSS stand for?",
    "What does HTML stand for?"
];

const reponses = [
    ["<script>", "<javascript>", "<js>", "<scripting>"],
    ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
    ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
    ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet", "Cascading Style Sheet"],
    ["Hyperlink and Text Markup Language", "Hypertext Markup Language", "Home Tool Markup Language", "Hightext Machine Language"]
];

const reponseCorrect = [0, 2, 3, 3, 1]; 

const max_questions = questions.length;

function startQuiz() {
    questionCounter = 0;
    score = 0;
    scoreDisplay.innerText = score;
    retryButton.style.display = "none";
    loadNewQuestion();
}

function loadNewQuestion() {
    if (questionCounter >= max_questions) {
        return endQuiz();
    }

    questionCounter++;
    questionProgress.innerText = `Question ${questionCounter}/${max_questions}`;
    progressBarFull.style.width = `${(questionCounter / max_questions) * 100}%`;

    currentQuestionElement.innerText = questions[questionCounter - 1]; 

    const currentChoices = reponses[questionCounter - 1];
    for (let i = 0; i < choices.length; i++) {
        choices[i].innerText = currentChoices[i];
        choices[i].classList.remove("correct", "incorrect");
    }

    acceptingAnswers = true;
}

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = parseInt(selectedChoice.dataset.number);
        const correctAnswer = reponseCorrect[questionCounter - 1];
        if (selectedAnswer === correctAnswer + 1) { 
            updateScore(10);
            selectedChoice.parentElement.classList.add("correct");
        } else {
            selectedChoice.parentElement.classList.add("incorrect");
            const correctChoice = choices[correctAnswer].parentElement;
            correctChoice.classList.add("correct");
        }

        setTimeout(() => {
            choices.forEach(choice => {
                choice.parentElement.classList.remove("correct", "incorrect");
            });
            loadNewQuestion();
        }, 1000);
    });
});

function updateScore(num) {
    score += num;
    scoreDisplay.innerText = score;
}

function endQuiz() {
    retryButton.style.display = "block";
    currentQuestionElement.innerText = "Quiz Finished!";
    questionProgress.innerText = `Final Score: ${score}`;
}

function restartQuiz() {
    startQuiz();
}

startQuiz();