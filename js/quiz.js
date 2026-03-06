let questions = JSON.parse(localStorage.getItem("questions")) || [
    { question: "HTML nima?", options: ["Programming","Markup","Database","Server"], correct: 1 },
    { question: "CSS nima uchun?", options: ["Design","Programming","Server","Database"], correct: 0 }
]

let currentIndex = 0
let score = 0
let time = 30
let timerInterval

const startBtn = document.getElementById("start-btn")
const startScreen = document.getElementById("start-screen")
const questionScreen = document.getElementById("question-screen")
const questionEl = document.getElementById("question")
const optionsEl = document.getElementById("options")
const timerText = document.getElementById("timer-text")
const timerProgress = document.getElementById("timer-progress")

// Start quiz
startBtn.onclick = () => {
    startScreen.style.display = "none"
    questionScreen.style.display = "block"
    loadQuestion()
}

function loadQuestion(){
    if(currentIndex >= questions.length){
        finishQuiz()
        return
    }

    let q = questions[currentIndex]
    questionEl.innerText = q.question
    optionsEl.innerHTML = ""
    
    q.options.forEach((opt,i)=>{
        let btn = document.createElement("button")
        btn.className = "option-btn"
        btn.innerText = opt
        btn.onclick = ()=>answer(i)
        optionsEl.appendChild(btn)
    })

    time = 30
    timerProgress.style.width = "100%"
    timerText.innerText = `Time: ${time}s`
    
    clearInterval(timerInterval)
    timerInterval = setInterval(()=>{
        time--
        timerText.innerText =` Time: ${time}s`
        timerProgress.style.width = `${(time/30)*100}%`
        if(time <= 0){
            clearInterval(timerInterval)
            currentIndex++
            loadQuestion()
        }
    },1000)
}

function answer(option){
    clearInterval(timerInterval)
    if(option == questions[currentIndex].correct){
        score++
    }
    currentIndex++
    loadQuestion()
}

function finishQuiz(){
    document.getElementById("quiz-card").innerHTML = `<h2>Your Score: ${score}</h2>`
    let username = localStorage.getItem("currentUser")
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || []
    leaderboard.push({username, score})
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard))
}