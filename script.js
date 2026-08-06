let xp = Number(localStorage.getItem("xp")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;

function updateDashboard() {
    const xpElement = document.getElementById("xp");
    const streakElement = document.getElementById("streak");

    if (xpElement) {
        xpElement.textContent = "⭐ XP: " + xp;
    }

    if (streakElement) {
        streakElement.textContent = "🔥 Study Streak: " + streak + " days";
    }
}

function addXP(amount) {
    xp += amount;
    localStorage.setItem("xp", xp);
    updateDashboard();
}

function continueStudy() {
    window.location.href = "units.html";
}

function changeGoal() {
    const goals = [
        "Complete one lesson from S111.",
        "Read one section of S112.",
        "Spend 30 minutes studying.",
        "Review your notes."
    ];

    const random = Math.floor(Math.random() * goals.length);

    const goal = document.getElementById("goal");

    if (goal) {
        goal.textContent = goals[random];
    }
}

function checkQuiz() {

    const answer = document.querySelector('input[name="q1"]:checked');

    if (!answer) {
        document.getElementById("result").textContent =
        "❌ Please choose an answer.";
        return;
    }

    if (answer.value === "correct") {

        document.getElementById("result").textContent =
        "🎉 Correct! +50 XP";

        addXP(50);

        localStorage.setItem("unit00Complete", "true");

    } else {

        document.getElementById("result").textContent =
        "❌ Not quite. Try again.";

    }

}

window.onload = function () {
    updateDashboard();

    const unit = document.getElementById("unit00");

    if (unit && localStorage.getItem("unit00Complete") === "true") {
        unit.textContent = "✅ Unit 00 - Completed";
    }
};