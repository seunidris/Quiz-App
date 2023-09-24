let index = 0;
let quizArray = [
    {
        question: "What country has the highest life expectancy?",
        options: ["(a) Japan", "(b) Switzerland", "(c) Australia", "(d) Hong Kong"],
        correctAnswer: "(d) Hong Kong",
        select: ''
    },
    {
        question: "Which language has the most native speakers?",
        options: ["(a) English", "(b) Spanish", "(c) Chinese", "(d) Hindi"],
        correctAnswer: "(c) Chinese",
        select: ''
    },
    {
        question: "What is the most common surname in the United States?",
        options: ["(a) Johnson", "(b) Smith", "(c) Brown", "(d) Lee"],
        correctAnswer: "(b) Smith",
        select: ''
    },
    {
        question: "Who was the Ancient Greek God of the Sun?",
        options: ["(a) Neptune", "(b) Zeus", "(c) Apollo", "(d) Hermes"],
        correctAnswer: "(c) Apollo",
        select: ''
    },
    {
        question: "Which artist has the most streams on Spotify?",
        options: ["(a) Drake", "(b) Ed Sheeran", "(c) Taylor Swift", "(d) Ariana Grande"],
        correctAnswer: "(a) Drake",
        select: ''
    },
    {
        question: "Aureolin is a shade of what color?",
        options: ["(a) Red", "(b) Yellow", "(c) Blue", "(d) Green"],
        correctAnswer: "(b) Yellow",
        select: ''
    },
    {
        question: "How many faces does a Dodecahedron have?",
        options: ["(a) 8", "(b) 10", "(c) 12", "(d) 14"],
        correctAnswer: "(c) 12",
        select: ''
    },
    {
        question: "Which planet has the most moons?",
        options: ["(a) Earth", "(b) Saturn", "(c) Mars", "(d) Jupiter"],
        correctAnswer: "(b) Saturn",
        select: ''
    },
    {
        question: "What country has won the most FIFA World Cups?",
        options: ["(a) Germany", "(b) Brazil", "(c) Italy", "(d) Argentina"],
        correctAnswer: "(b) Brazil",
        select: ''
    },
    {
        question: "What country drinks the most coffee per capita?",
        options: ["(a) China", "(b) Spain", "(c) Brazil", "(d) Finland"],
        correctAnswer: "(d) Finland",
        select: ''
    }
];

let timeRemaining = 600; // 10 minutes (in seconds)
let timer;

function displayQuestion() {
    let question = quizArray[index];
    display.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;

    question.options.forEach(option => {
        const isChecked = option === question.select;
        display.innerHTML += `
            <label class="quiz-option-label">
                <input type="radio" name="options" class="quiz-option-input" ${isChecked ? 'checked' : ''} onchange="choose('${option}')">
                ${option}
            </label>
        `;
    });

    // Update the timer display
    updateTimerDisplay();
}

function startQuizWithName() {
    const nameInput = document.getElementById('name');
    const userName = nameInput.value.trim();

    if (userName === '') {
        alert('Please enter your name to start the quiz.');
        return;
    }

    // Hide the name input and show the quiz instructions
    document.querySelector('.name-input').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('userName').textContent = userName;
}

function startQuiz() {
    // Hide the instructions and show the quiz questions and navigation
    document.getElementById('instructions').style.display = 'none';
    document.querySelector('.quiz-navigation').style.cssText = 'display: flex; gap: 20%;';
    display.style.display = 'block';
    quizWrapper.style.display = 'block';
    submitBtn.style.display = 'block';
    document.getElementById('timer').style.display = 'block';

    // Start displaying the first question
    displayQuestion();

    // Start the timer
    startTimer();
}

function choose(option) {
    quizArray[index].select = option;
    console.log(quizArray);
}

function next() {
    if (index < quizArray.length - 1) {
        index++;
        displayQuestion();
    }
    if (index === quizArray.length - 1) {
        document.querySelector('.btn-next').style.display = 'none';
    }
    // document.querySelector('.btn-prev').style.display = 'block';
}

function prev() {
    if (index > 0) {
        index--;
        displayQuestion();
    }
    if (index === 0) {
        document.querySelector('.btn-prev').style.display = 'none';
    }
    document.querySelector('.btn-next').style.display = 'block';
}

function startTimer() {
    timer = setInterval(function() {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            submitQuiz();
        } else {
            updateTimerDisplay();
            timeRemaining--;
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer').textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function submitQuiz() {
    clearInterval(timer);

    let totalScore = 0;
    quizArray.forEach(elem => {
        if (elem.correctAnswer === elem.select) {
            totalScore++;
        }
    });

    const result = document.getElementById('result');
    result.innerHTML = `<h5>You got ${totalScore} out of ${quizArray.length} questions correctly</h5>`;
    result.style.display = 'block';
}
