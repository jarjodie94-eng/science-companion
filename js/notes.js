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
// ======================================
// 🛡️ STUDY DATA BACKUP
// ======================================

const backupDataButton =
document.getElementById("backupDataButton");

if (backupDataButton) {

    backupDataButton.addEventListener(
        "click",
        function() {

            const backup = {};

            for (let i = 0; i < localStorage.length; i++) {

                const key = localStorage.key(i);

                backup[key] =
                localStorage.getItem(key);

            }

            const backupFile =
            new Blob(
                [JSON.stringify(backup, null, 2)],
                { type: "application/json" }
            );

            const downloadLink =
            document.createElement("a");

            downloadLink.href =
            URL.createObjectURL(backupFile);

            downloadLink.download =
            "science-companion-backup.json";

            downloadLink.click();

            URL.revokeObjectURL(
                downloadLink.href
            );

        }
    );

}
// ======================================
// ♻️ RESTORE STUDY DATA
// ======================================

const restoreDataButton =
document.getElementById("restoreDataButton");

const restoreDataFile =
document.getElementById("restoreDataFile");

if (restoreDataButton && restoreDataFile) {

    restoreDataButton.addEventListener(
        "click",
        function() {

            const file =
            restoreDataFile.files[0];

            if (!file) {

                alert("📁 Choose a Science Companion backup file first.");

                return;

            }

            const reader =
            new FileReader();

            reader.onload =
            function(event) {

                try {

                    const backup =
                    JSON.parse(event.target.result);

                    Object.keys(backup).forEach(
                        function(key) {

                            localStorage.setItem(
                                key,
                                backup[key]
                            );

                        }
                    );

                    alert(
                        "🎉 Backup restored! Science Companion will now refresh."
                    );

                    location.reload();

                }

                catch (error) {

                    alert(
                        "⚠️ That file could not be restored."
                    );

                }

            };

            reader.readAsText(file);

        }
    );

}