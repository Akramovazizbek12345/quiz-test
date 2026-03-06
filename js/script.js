function showLogin(){
    document.getElementById("loginForm").style.display="block"
    document.getElementById("registerForm").style.display="none"
}

function showRegister(){
    document.getElementById("loginForm").style.display="none"
    document.getElementById("registerForm").style.display="block"
}

// --- USERS ARRAY ---
let users = JSON.parse(localStorage.getItem("users")) || []

// --- REGISTER ---
document.getElementById("registerForm").addEventListener("submit", function(e){
    e.preventDefault()

    let user = document.getElementById("regUser").value
    let pass = document.getElementById("regPass").value

    users.push({
        username: user,
        password: pass
    })

    localStorage.setItem("users", JSON.stringify(users))

    // eski usul ham saqlanadi
    localStorage.setItem("user", user)
    localStorage.setItem("pass", pass)

    alert("Registered")
})

// --- LOGIN ---
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault()

    let user = document.getElementById("loginUser").value
    let pass = document.getElementById("loginPass").value

    let savedUser = localStorage.getItem("user")
    let savedPass = localStorage.getItem("pass")

    // Admin login
    if(user === "azizbek1230" && pass === "azizbek1230"){
        window.location = "pages/admin.html"
        return
    }

    // users arraydan tekshirish
    let foundUser = users.find(u => u.username === user && u.password === pass)

    if(foundUser || (user === savedUser && pass === savedPass)){

        // Visitor counter
        let visitors = parseInt(localStorage.getItem("visitors")) || 0
        visitors++
        localStorage.setItem("visitors", visitors)

        localStorage.setItem("currentUser", user)
        window.location = "pages/quiz.html"

    }else{
        alert("Login yoki parol xato!")
    }
})