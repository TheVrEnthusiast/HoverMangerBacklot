document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("uploadModButton");
    const modal = document.getElementById("uploadModal");
    const closeModal = document.querySelector(".close");
    const submitButton = document.getElementById("submitMod");
    const modNameInput = document.getElementById("modName");
    const modGitHubInput = document.getElementById("modGitHub");
    const modsContainer = document.getElementById("modsContainer");

    // Open Upload Mod Menu
    uploadButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close Upload Mod Menu
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Function to trigger GitHub Action
    async function triggerGitHubAction(modName, modGitHub) {
    const url = "https://api.github.com/repos/TheVrEnthusiast/HoverMangerBacklot/actions/workflows/update-mods.yml/dispatches";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ref: "main",
                inputs: {
                    mod_name: modName,
                    mod_link: modGitHub
                }
            })
        });

        if (response.ok) {
            alert("Mod uploaded successfully! It may take a moment to appear.");
        } else {
            const errorText = await response.text();
            alert("Error: Could not trigger GitHub Action.");
            console.error("GitHub Action Response:", errorText);
        }
    } catch (error) {
        console.error("Error uploading mod:", error);
    }
}


    // Handle Upload Button Click
    submitButton.addEventListener("click", () => {
        const modName = modNameInput.value.trim();
        const modGitHub = modGitHubInput.value.trim();
        
        if (modName && modGitHub) {
            triggerGitHubAction(modName, modGitHub);
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Load Mods from mods.txt
    function loadMods() {
        fetch(`https://raw.githubusercontent.com/TheVrEnthusiast/HoverMangerBacklot/main/mods.txt`)
            .then(response => response.text())
            .then(data => {
                modsContainer.innerHTML = "";
                const mods = data.split("\n").filter(line => line.trim() !== "");
                mods.forEach(modEntry => {
                    const [modName, modLink] = modEntry.split(" | ");
                    const modElement = document.createElement("div");
                    modElement.classList.add("mod-item");
                    modElement.innerHTML = `<h3>${modName}</h3><a href="${modLink}" target="_blank">GitHub</a>`;
                    modsContainer.appendChild(modElement);
                });
            })
            .catch(error => console.error("Error loading mods:", error));
    }

    loadMods(); // Load mods when page loads
});
