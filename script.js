document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("uploadModButton");
    const modal = document.getElementById("uploadModal");
    const closeModal = document.querySelector(".close");
    const submitButton = document.getElementById("submitMod");
    const modNameInput = document.getElementById("modName");
    const modGitHubInput = document.getElementById("modGitHub");
    const modsContainer = document.getElementById("modsContainer");

    const SERVER_URL = "http://0.0.0.0:7000"; // Use your server's IP

    // Open modal when upload button is clicked
    uploadButton.addEventListener("click", () => {
        modal.classList.add("show"); // Display the modal
    });

    // Close modal when close button is clicked
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show"); // Hide the modal
    });

    // Close modal if clicked outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

    // Handle the form submission
    submitButton.addEventListener("click", () => {
        const modName = modNameInput.value.trim();
        const modGitHub = modGitHubInput.value.trim();

        if (modName && modGitHub) {
            triggerModUpload(modName, modGitHub);
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Function to trigger mod upload
    async function triggerModUpload(modName, modGitHub) {
        try {
            const response = await fetch(`${SERVER_URL}/upload-mod`, {
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
                modal.classList.remove("show"); // Hide modal after submission
            } else {
                const errorText = await response.text();
                alert("Error: Could not upload mod.");
                console.error("Upload Error:", errorText);
            }
        } catch (error) {
            console.error("Error uploading mod:", error);
        }
    }

    // Load mods from the server and display them
    function loadMods() {
        fetch(`${SERVER_URL}/get-mods`)
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
