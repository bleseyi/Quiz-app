const questions = [
    {
        question: "Who is the president of Nigeria?",
        answers: [
            { text: "President Buhari", correct: false},
            { text: "President Obasanjo", correct: false},
            { text: "President Tinubu", correct: true},
            { text: "President Tope", correct: false},
        ]
    },
{
    question: "which of these is the last book of the old testament?",
        answers: [
            { text: "Malachi", correct: true},
            { text: "Revelation", correct: false},
            { text: "Gensis", correct: false},
            { text: "John", correct: false},
        ]
},
{
    question: "What is the full meaning of W.H.O?",
        answers: [
            { text: "Waste health opportunities", correct: false},
            { text: "World health organisation", correct: true},
            { text: "Word health organisation", correct: false},
            { text: "Wide Health organisation", correct: false},
        ]
},
{
    question: "what verse of the bible is the longest?",
    answers: [
        { text: "John 3:16", correct: false},
        { text: "Revelation 3:20", correct: false},
        { text: "Psalm 119:10", correct: false},
        { text: "Esther 6:9", correct: true},
    ]  
},
{
    question: "Combine terms: 12a + 26b -4b -16a",
    answers: [
        { text: "4a + 22b", correct: false},
        { text: "-28a + 30b", correct: false},
        { text: "-4a + 22b", correct: true},
        { text: "28a + 30b", correct:false},
    ]
},
{
    question: "Multiply: (x - 4)(x + 5)",
    answers: [
        { text:"x2 + 5x - 20", correct: false},
        { text:"x2 - 4x - 20", correct: false},
        { text:"x2 - x - 20", correct: false},
        { text:" x2 + x - 20", correct: true},
    ]
},
{
    question: " Factor: 5x2 - 15x - 20",
    answers: [
        { text:"5(x-4)(x+1)", correct: true},
        { text:"-2(x-4)(x+5)", correct: false},
        { text:"-5(x+4)(x-1)", correct: false},
        { text:"5(x+4)(x+1)", correct: false},
    ]
},
{
    question: "Solve for x: 2x - y = (3/4)x + 6",
    answers: [
        { text:"(y + 6)/5", correct: false},
        { text:"4(y + 6)/5", correct: true},
        { text:"(y + 6)", correct: false},
        { text:"4(y - 6)/5", correct: false},
    ]
},
{
    question: "Simplify:(4x2 - 2x) - (-5x2 - 8x)",
    answers: [
        { text:"3x(3x + 2)", correct: true},
        { text:"4x+5", correct: false},
        { text:"9x+7", correct: false},
        { text:"9x+2", correct: false},
    ]
},
{
    question: "Which is the smallest?",
    answers: [
        { text:" -1,", correct: true},
        { text:" -1/2", correct: false},
        { text:"0", correct:false},
        { text:"3", correct: false}
    ]
}
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}
function showQuestion (){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
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
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
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
});

startQuiz ();