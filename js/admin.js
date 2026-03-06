// --- Questions ---
let questions = JSON.parse(localStorage.getItem("questions")) || []

function addQuestion(){
    let q=document.getElementById("question").value
    let o1=document.getElementById("o1").value
    let o2=document.getElementById("o2").value
    let o3=document.getElementById("o3").value
    let o4=document.getElementById("o4").value
    let correct=document.getElementById("correct").value-1

    questions.push({question:q, options:[o1,o2,o3,o4], correct:correct})
    localStorage.setItem("questions", JSON.stringify(questions))
    renderQuestions()
}

function renderQuestions(){
    let table=document.getElementById("questionsTable")
    table.innerHTML=""
    questions.forEach((q,index)=>{
        table.innerHTML+=
        `<tr>
            <td>${q.question}</td>
            <td>
                <button onclick="editQuestion(${index})">Edit</button>
                <button onclick="deleteQuestion(${index})">Delete</button>
            </td>
        </tr>`
    })
}

function deleteQuestion(index){
    questions.splice(index,1)
    localStorage.setItem("questions", JSON.stringify(questions))
    renderQuestions()
}

function editQuestion(index){
    let newQ=prompt("Edit question",questions[index].question)
    if(newQ){
        questions[index].question=newQ
        localStorage.setItem("questions", JSON.stringify(questions))
        renderQuestions()
    }
}

renderQuestions()

// --- Leaderboard ---
let board=JSON.parse(localStorage.getItem("leaderboard")) || []

function renderLeaderboard(){
    board.sort((a,b)=>b.score-a.score)
    let table=document.getElementById("leaderboard")
    table.innerHTML=""
    board.forEach((u,i)=>{
        table.innerHTML+=
        `<tr>
            <td>${i+1}</td>
            <td>${u.username}</td>
            <td>${u.score}</td>
            <td>
                <button onclick="deleteUser(${i})">Delete</button>
            </td>
        </tr>`
    })
}

function deleteUser(index){
    board.splice(index,1)
    localStorage.setItem("leaderboard", JSON.stringify(board))
    renderLeaderboard()
}

renderLeaderboard()

// --- Visitor Counter ---
let totalVisitors = localStorage.getItem("visitors") || 0
document.getElementById("total-visitors").innerText = totalVisitors