// ======================================
// 📅 SCIENCE COMPANION STUDY PLANNER
// ======================================


// Get saved study sessions

let plannerSessionsData =
JSON.parse(localStorage.getItem("studySessions")) || [];


// Page elements

const plannerModuleInput =
document.getElementById("plannerModule");

const plannerGoalInput =
document.getElementById("plannerGoal");

const plannerDateInput =
document.getElementById("plannerDate");

const plannerTimeInput =
document.getElementById("plannerTime");

const plannerSessionsBox =
document.getElementById("studySessions");

const completedSessionText =
document.getElementById("completedSessionCount");

const streakText =
document.getElementById("studyStreak");


// --------------------------------------
// Replace Save button
// This prevents old planner code in
// script.js from running twice.
// --------------------------------------

const oldSaveButton =
document.getElementById("saveStudySession");

let plannerSaveButton = null;

if (oldSaveButton) {

    plannerSaveButton =
    oldSaveButton.cloneNode(true);

    oldSaveButton.replaceWith(
        plannerSaveButton
    );

}


// --------------------------------------
// Save sessions
// --------------------------------------

function savePlannerSessions() {

    localStorage.setItem(
        "studySessions",
        JSON.stringify(plannerSessionsData)
    );

}


// --------------------------------------
// Add study session
// --------------------------------------

if (plannerSaveButton) {

    plannerSaveButton.addEventListener(
        "click",
        function() {

            const module =
            plannerModuleInput.value;

            const goal =
            plannerGoalInput.value.trim();

const date =
plannerDateInput.value;

            const time =
            plannerTimeInput.value;


            if (goal === "") {

                alert(
                    "🎯 Add a study goal first."
                );

                return;

            }


            if (date === "") {

                alert(
                    "📅 Choose a study date."
                );

                return;

            }


            if (time === "") {

                alert(
                    "⏰ Choose a study time."
                );

                return;

            }


            plannerSessionsData.push({

                module: module,

                goal: goal,

                date: date,

                time: time,

                completed: false,

                completedDate: null

            });


            savePlannerSessions();


            plannerGoalInput.value = "";

            plannerDateInput.value = "";

            plannerTimeInput.value = "";


            displayPlannerSessions();

            updatePlannerStats();

        }
    );

}


// --------------------------------------
// Display study sessions
// --------------------------------------

function displayPlannerSessions() {

    if (!plannerSessionsBox) {

        return;

    }


    const upcoming =
    plannerSessionsData
    .map(function(session, index) {

        return {
            session: session,
            index: index
        };

    })
    .filter(function(item) {

        return !item.session.completed;

    })
    .sort(function(a, b) {

        const first =
        a.session.date + "T" +
        a.session.time;

        const second =
        b.session.date + "T" +
        b.session.time;

        return first.localeCompare(second);

    });


    if (upcoming.length === 0) {

        plannerSessionsBox.innerHTML = `

        <p>
        🌱 No upcoming study sessions.
        </p>

        <p>
        Plan one above when you're ready.
        </p>

        `;

        return;

    }


    plannerSessionsBox.innerHTML = "";


    upcoming.forEach(function(item) {

        const session =
        item.session;

        const index =
        item.index;


        plannerSessionsBox.innerHTML += `

        <div class="card">

            <h3>
            ${session.module}
            </h3>

            <p>
            🎯 ${session.goal || "Study session"}
            </p>

            <p>
            📅 ${formatPlannerDate(session.date)}
            </p>

            <p>
            ⏰ ${session.time}
            </p>

            <br>

            <button
            onclick="completePlannerSession(${index})">

            ✅ Complete Session

            </button>

            <button
            onclick="removePlannerSession(${index})">

            🗑 Remove

            </button>

        </div>

        `;

    });

}


// --------------------------------------
// Complete a session
// --------------------------------------

function completePlannerSession(index) {

    const session =
    plannerSessionsData[index];


    if (!session || session.completed) {

        return;

    }


    session.completed = true;

    session.completedDate =
    getTodayPlannerDate();


    savePlannerSessions();
if (
    typeof unlockAchievement === "function"
) {

    unlockAchievement(
    "firstSteps",
    "📚 First Study Session",
    "Completed your first study session!",
    25
);

}

    // XP reward

    if (typeof addXP === "function") {

        addXP(20);

    }


    alert(
        "🎉 Study session complete! +20 XP"
    );


    displayPlannerSessions();

    updatePlannerStats();

}


// --------------------------------------
// Remove session
// --------------------------------------

function removePlannerSession(index) {

    plannerSessionsData.splice(
        index,
        1
    );


    savePlannerSessions();

    displayPlannerSessions();

    updatePlannerStats();

}


// --------------------------------------
// Planner statistics
// --------------------------------------

function updatePlannerStats() {

    const completed =
    plannerSessionsData.filter(
        function(session) {

            return session.completed;

        }
    );


    if (completedSessionText) {

        completedSessionText.textContent =
        "✅ Completed study sessions: " +
        completed.length;

    }


    const streak =
    calculateStudyStreak(completed);


    if (streakText) {

        streakText.textContent =
        "🔥 Study streak: " +
        streak +
        (streak === 1 ? " day" : " days");

    }

}


// --------------------------------------
// Calculate study streak
// --------------------------------------

function calculateStudyStreak(completed) {

    const dates =
    completed
    .map(function(session) {

        return session.completedDate;

    })
    .filter(Boolean);


    const uniqueDates =
    [...new Set(dates)].sort().reverse();


    if (uniqueDates.length === 0) {

        return 0;

    }


    const today =
    new Date();

    today.setHours(0,0,0,0);


    const newest =
    new Date(
        uniqueDates[0] + "T00:00:00"
    );


    const difference =
    Math.round(
        (today - newest) /
        86400000
    );


    // Streak survives if last session
    // was today or yesterday.

    if (difference > 1) {

        return 0;

    }


    let streak = 1;


    for (
        let i = 1;
        i < uniqueDates.length;
        i++
    ) {

        const previous =
        new Date(
            uniqueDates[i - 1] +
            "T00:00:00"
        );


        const current =
        new Date(
            uniqueDates[i] +
            "T00:00:00"
        );


        const gap =
        Math.round(
            (previous - current) /
            86400000
        );


        if (gap === 1) {

            streak++;

        }

        else {

            break;

        }

    }


    return streak;

}


// --------------------------------------
// Helpers
// --------------------------------------

function getTodayPlannerDate() {

    const today =
    new Date();


    const year =
    today.getFullYear();

    const month =
    String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day =
    String(
        today.getDate()
    ).padStart(2, "0");


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}


function formatPlannerDate(dateString) {

    const parts =
    dateString.split("-");

    if (parts.length !== 3) {
        return dateString;
    }

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return day + "/" + month + "/" + year;

}




// --------------------------------------
// Start planner
// --------------------------------------

displayPlannerSessions();

updatePlannerStats();