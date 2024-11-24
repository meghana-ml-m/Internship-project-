const questions = [
    {
        question: "How many Bits make one Byte?",
        answers: [
            { text: "16 bits", correct: false },
            { text: "32 bits", correct: false },
            { text: "64 bits", correct: false },
            { text: "8 bits", correct: true },
        ]
    },
    {
        question: "Google is a browser or a search engine?",
        answers: [
            { text: "Browser", correct: false },
            { text: "Search Engine", correct: true },
            { text: "Both A and B", correct: false },
            { text: "None of the above", correct: false },
        ]   
    },
    {
        question: "Who is the founder of facebook?",
        answers: [
            { text: "Andrew Maclin", correct: false },
            { text: "Mark Adon", correct: false },
            { text: "Mark Zuckerberg", correct: true },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "Which electronic component was used in the first generation of computers?",
        answers: [
            { text: "Vaccum tubes", correct: true },
            { text: "Red tubes", correct: false },
            { text: "Abacus", correct: false },
            { text: "Transistors", correct: false },
        ]
    },
    {
        question: "All mathematical and logical functions in the computer are done by?",
        answers: [
            { text: "Central processing Unit", correct: false },
            { text: "Arithmetic and Logical Unit", correct: true },
            { text: "Control Unit", correct: false },
            { text: "Memory Unit", correct: false },
        ]
    },
    {
        question: "The first program that runs on a computer when the computer boots up is?",
        answers: [
            { text: "Software Program", correct: false },
            { text: "Operating System", correct: true },
            { text: "Utilities", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "The process of transferring files from the Internet to your computer is called?",
        answers: [
            { text: "Downloading", correct: true },
            { text: "Uploading", correct: false },
            { text: "Storing", correct: false },
            { text: "All of the above", correct: false },
        ]
    },
    {
        question: "1 kilobyte is equal to how many bytes?",
        answers: [
            { text: "1024 bytes", correct: true },
            { text: "512 bytes", correct: false },
            { text: "256 bytes", correct: false },
            { text: "128 bytes", correct: false },
        ]
    },
    {
        question: "Who invented the first mechanical calculator?",
        answers: [
            { text: "Abraham Sturn", correct: false },
            { text: "Blaise Pascal", correct: true },
            { text: "Riochee", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "An address given to a computer connected to a network is called?",
        answers: [
            { text: "Local address", correct: false },
            { text: "Localhost", correct: false },
            { text: "Network address", correct: false },
            { text: "IP address", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click",selectAnswer);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
      });
    }

 function resetState(){
        nextButton.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }

    function showScore(){
        resetState(); 
        questionElement.innerHTML = " You scored " + score + " out of " + questions.length + " ! ";
        nextButton.innerHTML  = "Play Again";
        nextButton.style.display = "block";
    }
    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }
    nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
    })

    startQuiz();