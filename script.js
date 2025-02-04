// Function to handle mod upload
async function uploadMod() {
    const modName = document.getElementById("modName").value.trim();
    const modGitHub = document.getElementById("modGitHub").value.trim();

    if (!modName || !modGitHub) {
        alert("Please fill in all fields.");
        return;
    }

    const formData = {
        mod_name: modName,
        mod_link: modGitHub,
    };
    
    console.log("Form data being sent:", formData);  // Log the form data being sent
    
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzVvtUF5uvxeut6tHLHk6Y88OLZLLGokxXbVxoqhps1oe8MeT05wCg7VR21ts5c0vQAwA/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
    
        const responseData = await response.json(); // Ensure the response is valid JSON
        console.log("Response from Google Apps Script:", responseData);  // Log response for debugging
        
        if (response.ok) {
            alert("Mod uploaded successfully!");
            loadMods();
            document.getElementById("uploadModal").classList.remove("show");
        } else {
            alert("Failed to upload mod.");
        }
    } catch (error) {
        console.error("Upload error:", error);
    }
    
}

// Function to load mods
// Function to load mods from the Google Apps Script Web App
// Function to load mods from the Google Apps Script Web App
async function loadMods() {
    try {
        console.log("Fetching mod data...");
        const response = await fetch("https://script.google.com/macros/s/AKfycbygU3KnE4Ix7pGupmrxqMlFSzpcEYSLxWGiWfdRu2BnpW4gY4IJZ7LjhPqoeBVIOmM0/exec");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const mods = await response.json();
        console.log("Mods loaded:", mods);

        if (!Array.isArray(mods)) {
            console.error("Invalid data format:", mods);
            return;
        }

        const modList = document.getElementById("modList");
        modList.innerHTML = ""; // Clear current list

        mods.forEach(mod => {
            const modItem = document.createElement("div");
            modItem.classList.add("mod-item");
            modItem.innerHTML = `
                <h3>${mod.name}</h3>
                <a href="${mod.link}" target="_blank">Download</a>
            `;
            modList.appendChild(modItem);
        });
    } catch (error) {
        console.error("Error loading mods:", error);
    }
}

// Function to handle mod upload (only one definition)
async function uploadMod() {
    const modName = document.getElementById("modName").value.trim();
    const modGitHub = document.getElementById("modGitHub").value.trim();

    if (!modName || !modGitHub) {
        alert("Please fill in all fields.");
        return;
    }

    const formData = {
        mod_name: modName,
        mod_link: modGitHub
    };

    console.log("Uploading mod...", formData);

    try {
        // Use your deployed Google Apps Script URL here:
        const response = await fetch("https://script.google.com/macros/s/AKfycbygU3KnE4Ix7pGupmrxqMlFSzpcEYSLxWGiWfdRu2BnpW4gY4IJZ7LjhPqoeBVIOmM0/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        // Since your doPost returns plain text ("Success"), we use response.text()
        const result = await response.text();
        console.log("Upload response:", result);

        if (response.ok && result.trim() === "Success") {
            alert("Mod uploaded successfully!");
            loadMods(); // Reload mods list to include the new mod
            // Clear the input fields
            document.getElementById("modName").value = "";
            document.getElementById("modGitHub").value = "";
            // Hide the modal (assuming you use a CSS class "show" to display it)
            document.getElementById("uploadModal").classList.remove("show");
        } else {
            alert("Failed to upload mod.");
        }
    } catch (error) {
        console.error("Upload error:", error);
    }
}

// Modal handling: Show and hide the upload modal
document.getElementById("uploadModButton").addEventListener("click", () => {
    document.getElementById("uploadModal").classList.add("show");
});
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("uploadModal").classList.remove("show");
});

// Bind the upload button click to the uploadMod function
document.getElementById("submitMod").addEventListener("click", uploadMod);

// Load mods when the page loads
window.onload = loadMods;
