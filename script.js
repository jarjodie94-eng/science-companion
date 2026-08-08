// ==============================
// Science Companion Main Script
// ==============================


// XP SYSTEM

let xp = Number(localStorage.getItem("xp")) || 0;

let achievements =
JSON.parse(localStorage.getItem("achievements")) || [];



function updateXP() {

    const level =
    Math.floor(xp / 100) + 1;

    const currentXP =
    xp % 100;


    const levelText =
    document.getElementById("levelText");


    const xpText =
    document.getElementById("xpText");


    if(levelText){

        levelText.textContent =
        "Level " + level;

    }


    if(xpText){

        xpText.textContent =
        "XP: " + currentXP + " / 100";

    }

}



function addXP(amount){

    xp += amount;

    localStorage.setItem(
        "xp",
        xp
    );

    updateXP();

}




// ==============================
// ACHIEVEMENTS
// ==============================


function unlockAchievement(
    id,
    title,
    description,
    reward
){


    if(achievements.includes(id)){

        return;

    }


    achievements.push(id);


    localStorage.setItem(
        "achievements",
        JSON.stringify(achievements)
    );



    const popup =
    document.getElementById(
        "achievementPopup"
    );



    if(popup){


        popup.innerHTML = `

        <h3>🏆 Achievement Unlocked!</h3>

        <p>${title}</p>

        <p>${description}</p>

        <strong>+${reward} XP</strong>

        `;


        popup.style.display =
        "block";


        setTimeout(function(){

            popup.style.display =
            "none";

        },4000);


    }


    addXP(reward);


}





// ==============================
// UNIT 00 CHECKLIST
// ==============================


const tasks = [
"task1",
"task2",
"task3",
"task4"
];



function updateUnitProgress(){


    let completed = 0;


    tasks.forEach(function(task){


        if(
        localStorage.getItem(task)
        === "completed"
        ){

            completed++;

        }


    });



    const text =
    document.getElementById(
        "unitProgressText"
    );


    if(text){

        text.textContent =
        completed + " / 4 tasks completed";

    }



    const bar =
    document.getElementById(
        "unitProgressFill"
    );


    if(bar){

        bar.style.width =
        (completed / 4 * 100) + "%";

    }


}




function checkUnitCompletion(){


    let completed = 0;


    tasks.forEach(function(task){


        if(
        localStorage.getItem(task)
        === "completed"
        ){

            completed++;

        }


    });



    if(completed === 4){


        if(
        !localStorage.getItem(
            "unit00Complete"
        )
        ){


            localStorage.setItem(
                "unit00Complete",
                "true"
            );



            unlockAchievement(
                "unitExplorer",
                "📖 First Unit Complete",
                "Completed S111 Unit 00!",
                50
            );


        }


    }


}





tasks.forEach(function(task){


    const button =
    document.getElementById(task);



    if(button){


        if(
        localStorage.getItem(task)
        === "completed"
        ){

            button.textContent =
            "✅ Completed";

        }



        button.onclick = function(){


            if(
            localStorage.getItem(task)
            === "completed"
            ){

                return;

            }



            localStorage.setItem(
                task,
                "completed"
            );


            button.textContent =
            "✅ Completed";


            addXP(10);


            updateUnitProgress();


            checkUnitCompletion();


        };


    }


});





// ==============================
// NOTES SAVING
// ==============================


const notes =
document.getElementById(
"unitNotes"
);



if(notes){


    notes.value =
    localStorage.getItem(
        "unit00Notes"
    ) || "";



    notes.oninput = function(){


        localStorage.setItem(
            "unit00Notes",
            notes.value
        );


    };


}





// ==============================
// FLASHCARDS
// ==============================


function toggleCard(card){

    card.classList.toggle(
        "show"
    );

}





// ==============================
// QUIZ SYSTEM
// ==============================


function checkQuiz(){


    let score = 0;


    const questions = [
        "q1",
        "q2",
        "q3",
        "q4",
        "q5"
    ];



    questions.forEach(function(question){


        const answer =
        document.querySelector(
        'input[name="' + question + '"]:checked'
        );



        if(
        answer &&
        answer.value === "correct"
        ){

            score++;

        }


    });



    const result =
    document.getElementById(
        "result"
    );



    if(score === 5){


        result.textContent =
        "🏆 Perfect score! 5/5 +50 XP";


        addXP(50);


        unlockAchievement(
            "quizMaster",
            "🧠 Quiz Master",
            "Scored 100% on a quiz!",
            25
        );


    }


    else if(score >= 3){


        result.textContent =
        "⭐ Great work! " + score + "/5 +20 XP";


        addXP(20);


    }


    else{


        result.textContent =
        "📚 Keep practising! " + score + "/5 +10 XP";


        addXP(10);


    }


}





// ==============================
// ACHIEVEMENT PAGE
// ==============================


const achievementList =
document.getElementById(
"achievementList"
);



if(achievementList){


    const allAchievements = [


    {
        id:"firstSteps",
        title:"🏆 First Steps",
        description:"Completed your first study session!"
    },


    {
        id:"unitExplorer",
        title:"📖 First Unit Complete",
        description:"Completed S111 Unit 00!"
    },


    {
        id:"quizMaster",
        title:"🧠 Quiz Master",
        description:"Scored 100% on a quiz!"
    }


    ];



    achievementList.innerHTML="";



    allAchievements.forEach(function(a){


        if(
        achievements.includes(a.id)
        ){


            achievementList.innerHTML += `

            <div class="card">

            <h3>${a.title}</h3>

            <p>${a.description}</p>

            </div>

            `;


        }

        else{


            achievementList.innerHTML += `

            <div class="card">

            <h3>🔒 Locked</h3>

            <p>${a.description}</p>

            </div>

            `;


        }


    });


}




updateXP();

updateUnitProgress();// ==============================
// DASHBOARD STATISTICS
// ==============================

function updateDashboard() {

    // Achievements

    const achievementCount =
        achievements.length;

    const achievementText =
        document.getElementById("statsAchievements");

    if (achievementText) {

        achievementText.textContent =
            "🏆 Achievements: " + achievementCount;

    }


    // Units completed

    const unitsCompleted =
        localStorage.getItem("unit00Complete")
        ? 1
        : 0;

    const unitText =
        document.getElementById("statsUnits");

    if (unitText) {

        unitText.textContent =
            "📖 Units Completed: " + unitsCompleted;

    }


    // Quizzes passed

    const quizzesPassed =
        achievements.includes("quizMaster")
        ? 1
        : 0;

    const quizText =
        document.getElementById("statsQuizzes");

    if (quizText) {

        quizText.textContent =
            "❓ Quizzes Passed: " + quizzesPassed;

    }


    // Next goal

    const nextGoal =
        document.getElementById("nextGoal");

    if (nextGoal) {

        if (!localStorage.getItem("unit00Complete")) {

            nextGoal.textContent =
                "Complete Unit 00 to unlock Unit 01.";

        }

        else if (!achievements.includes("quizMaster")) {

            nextGoal.textContent =
                "Score 100% on the Unit 00 Quiz.";

        }

        else {

            nextGoal.textContent =
                "🎉 Fantastic! You're ready to start Unit 01.";

        }

    }

}


updateDashboard();// ======================================
// DAILY MISSIONS
// ======================================

const missions = [

"📚 Study for 20 minutes",

"🧪 Complete one lesson",

"📝 Review your notes",

"❓ Finish one quiz",

"🔬 Read a science article",

"🌍 Revise one completed unit"

];

const missionText =
document.getElementById("dailyMission");

if(missionText){

const today =
new Date().getDate();

missionText.textContent =
missions[today % missions.length];

}

const missionButton =
document.getElementById("missionButton");

if(missionButton){

missionButton.addEventListener("click",function(){

let xp =
parseInt(localStorage.getItem("xp")) || 0;

xp += 25;

localStorage.setItem("xp",xp);

const reward =
document.getElementById("missionReward");

reward.innerHTML =
"🎉 Mission Complete! +25 XP";

missionButton.disabled=true;

missionButton.innerHTML=
"✅ Completed";

showAchievement(
"🎯 Daily Mission Complete!"
);

});

}// ======================================
// STUDY PLANNER
// ======================================

let studySessions =
JSON.parse(localStorage.getItem("studySessions")) || [];

const plannerModule =
document.getElementById("plannerModule");

const plannerDate =
document.getElementById("plannerDate");

const plannerTime =
document.getElementById("plannerTime");

const saveStudySession =
document.getElementById("saveStudySession");

const studySessionsDiv =
document.getElementById("studySessions");

function displayStudySessions(){

if(!studySessionsDiv) return;

studySessionsDiv.innerHTML="";

if(studySessions.length===0){

studySessionsDiv.innerHTML=
"<p>No study sessions planned yet.</p>";

return;

}

studySessions.forEach((session,index)=>{

studySessionsDiv.innerHTML+=`

<div class="card">

<h3>${session.module}</h3>

<p>📅 ${session.date}</p>

<p>⏰ ${session.time}</p>

<button onclick="deleteStudySession(${index})">

🗑 Remove

</button>

</div>

`;

});

}

if(saveStudySession){

saveStudySession.addEventListener("click",()=>{

if(
plannerDate.value==="" ||
plannerTime.value===""
){

alert("Please choose a date and time.");

return;

}

studySessions.push({

module:plannerModule.value,

date:plannerDate.value,

time:plannerTime.value

});

localStorage.setItem(

"studySessions",

JSON.stringify(studySessions)

);

plannerDate.value="";

plannerTime.value="";

displayStudySessions();

});

}

function deleteStudySession(index){

studySessions.splice(index,1);

localStorage.setItem(

"studySessions",

JSON.stringify(studySessions)

);

displayStudySessions();

}

displayStudySessions();// ======================================
// NEXT STUDY SESSION WIDGET
// ======================================

const nextStudy =
document.getElementById("nextStudySession");

if(nextStudy){

const sessions =
JSON.parse(localStorage.getItem("studySessions")) || [];

if(sessions.length===0){

nextStudy.innerHTML=
"<p>No study sessions planned.</p>";

}else{

const session=sessions[0];

nextStudy.innerHTML=`

<h3>${session.module}</h3>

<p>📅 ${session.date}</p>

<p>⏰ ${session.time}</p>

<button onclick="location.href='planner.html'">

🚀 Open Planner

</button>

`;

}

}