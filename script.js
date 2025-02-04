document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("uploadModButton");
    const modal = document.getElementById("uploadModal");
    const closeModal = document.querySelector(".close");
    const submitButton = document.getElementById("submitMod");
    const modNameInput = document.getElementById("modName");
    const modGitHubInput = document.getElementById("modGitHub");
    const modsContainer = document.getElementById("modsContainer");

    // Open modal when upload button is clicked
    uploadButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close modal when close button or outside of modal is clicked
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Trigger the upload-mod route on the server
    async function triggerModUpload(modName, modGitHub) {
        const url = "http://localhost:5000/upload-mod"; // Your server URL

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mod_name: modName,
                    mod_link: modGitHub
                })
            });

            if (response.ok) {
                alert("Mod uploaded successfully! It may take a moment to appear.");
                loadMods(); // Refresh the mod list
            } else {
                const errorText = await response.text();
                alert("Error: Could not upload mod.");
                console.error("Upload Error:", errorText);
            }
        } catch (error) {
            console.error("Error uploading mod:", error);
        }
    }

    // Handle submit button click
    submitButton.addEventListener("click", () => {
        const modName = modNameInput.value.trim();
        const modGitHub = modGitHubInput.value.trim();

        if (modName && modGitHub) {
            triggerModUpload(modName, modGitHub); // Trigger mod upload
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Load mods from the server and display them
    function loadMods() {
        fetch("http://localhost:5000/get-mods") // Get mods from the server
            .then((response) => response.text())
            .then((data) => {
                modsContainer.innerHTML = ""; // Clear the container
                const mods = data.split("\n").filter((line) => line.trim() !== "");
                mods.forEach((modEntry) => {
                    const [modName, modLink] = modEntry.split(" | ");
                    const modElement = document.createElement("div");
                    modElement.classList.add("mod-item");
                    modElement.innerHTML = `<h3>${modName}</h3><a href="${modLink}" target="_blank">GitHub</a>`;
                    modsContainer.appendChild(modElement);
                });
            })
            .catch((error) => console.error("Error loading mods:", error));
    }

    loadMods(); // Load mods initially
});
