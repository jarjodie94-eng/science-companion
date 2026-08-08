// ======================================
// 📘 UNIT 00 PROGRESS
// ======================================

const unit00Tasks = [
    {
        id: "task1",
        key: "unit00Task1",
        text: "Set up your study space"
    },
    {
        id: "task2",
        key: "unit00Task2",
        text: "Understand your module structure"
    },
    {
        id: "task3",
        key: "unit00Task3",
        text: "Plan your study time"
    },
    {
        id: "task4",
        key: "unit00Task4",
        text: "Practise making science notes"
    }
];


function updateUnit00Progress() {

    let completed = 0;

    unit00Tasks.forEach(function(task) {

        const button =
        document.getElementById(task.id);

        if (!button) {
            return;
        }

        const isDone =
        localStorage.getItem(task.key) === "true";


        if (isDone) {

            completed++;

            button.textContent =
            "✅ " + task.text;

            button.disabled = true;

        }

        else {

            button.textContent =
            "☐ " + task.text + " (+10 XP)";

            button.disabled = false;

        }

    });


    const progressText =
    document.getElementById("unitProgressText");

    const progressFill =
    document.getElementById("unitProgressFill");


    if (progressText) {

        progressText.textContent =
        completed + " / 4 tasks completed";

    }


    if (progressFill) {

        progressFill.style.width =
        (completed / 4 * 100) + "%";

    }


    if (completed === 4) {

        localStorage.setItem(
            "unit00Complete",
            "true"
        );

    }

}


unit00Tasks.forEach(function(task) {

    const button =
    document.getElementById(task.id);

    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function() {

            const alreadyDone =
            localStorage.getItem(task.key) === "true";


            if (alreadyDone) {
                return;
            }


            localStorage.setItem(
                task.key,
                "true"
            );


            if (typeof addXP === "function") {

                addXP(10);

            }


            updateUnit00Progress();

        }
    );

});


updateUnit00Progress();