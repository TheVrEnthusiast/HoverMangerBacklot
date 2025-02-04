document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("uploadModButton");
    const modal = document.getElementById("uploadModal");
    const closeModal = document.querySelector(".close");
    const submitButton = document.getElementById("submitMod");
    const modNameInput = document.getElementById("modName");
    const modGitHubInput = document.getElementById("modGitHub");
    const modsContainer = document.getElementById("modsContainer");

    // Show the upload modal when the button is clicked
    uploadButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close the modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal if clicked outside
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Function to upload mod to the server
    async function uploadMod(modName, modGitHub) {
        const response = await fetch('/upload-mod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mod_name: modName, mod_link: modGitHub }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Mod uploaded successfully!');
            loadMods();
        } else {
            alert(`Error: ${data.error}`);
        }
    }

    // Submit the mod upload form
    submitButton.addEventListener("click", () => {
        const modName = modNameInput.value.trim();
        const modGitHub = modGitHubInput.value.trim();

        if (modName && modGitHub) {
            uploadMod(modName, modGitHub);
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Load the list of mods from the server
    async function loadMods() {
        const response = await fetch('/mods');
        const data = await response.json();
        modsContainer.innerHTML = '';

        data.mods.forEach(mod => {
            const modElement = document.createElement("div");
            modElement.classList.add("mod-item");
            modElement.innerHTML = `<h3>${mod.split(' | ')[0]}</h3><a href="${mod.split(' | ')[1]}" target="_blank">GitHub</a>`;
            modsContainer.appendChild(modElement);
        });
    }

    // Load mods on page load
    loadMods();
});
