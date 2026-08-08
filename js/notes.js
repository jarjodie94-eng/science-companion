// ======================================
// 📝 SCIENCE COMPANION NOTES
// ======================================


function setupAutoSave(
    textareaId,
    storageKey,
    statusId
) {

    const textarea =
    document.getElementById(textareaId);

    const status =
    document.getElementById(statusId);


    if (!textarea) {

        return;

    }


    textarea.value =
    localStorage.getItem(storageKey) || "";


    textarea.addEventListener(
        "input",
        function() {

            localStorage.setItem(
                storageKey,
                textarea.value
            );


            if (status) {

                status.textContent =
                "✅ Saved";

                clearTimeout(
                    status.saveTimer
                );


                status.saveTimer =
                setTimeout(function() {

                    status.textContent =
                    "💾 Auto-save ready";

                }, 1200);

            }

        }
    );

}


setupAutoSave(
    "s111Notes",
    "s111Notes",
    "s111SaveStatus"
);


setupAutoSave(
    "unit00PageNotes",
    "unit00Notes",
    "unit00SaveStatus"
);


setupAutoSave(
    "s112Notes",
    "s112Notes",
    "s112SaveStatus"
);
// ======================================
// 📝 UNIT 01 NOTES
// ======================================

const unit01Notes =
document.getElementById("unit01Notes");

if (unit01Notes) {

    const savedUnit01Notes =
    localStorage.getItem("unit01Notes");

    if (savedUnit01Notes) {

        unit01Notes.value =
        savedUnit01Notes;

    }

    unit01Notes.addEventListener(
        "input",
        function() {

            localStorage.setItem(
                "unit01Notes",
                unit01Notes.value
            );

        }
    );

}