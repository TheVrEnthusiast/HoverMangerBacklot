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
async function loadMods() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzVvtUF5uvxeut6tHLHk6Y88OLZLLGokxXbVxoqhps1oe8MeT05wCg7VR21ts5c0vQAwA/exec");
        const mods = await response.json();

        if (!Array.isArray(mods)) {
            console.error("Invalid data format:", mods);
            return;
        }

        const modList = document.getElementById("modList");
        modList.innerHTML = ""; // Clear existing mod list

        mods.forEach(mod => {
            const modItem = document.createElement("div");
            modItem.classList.add("mod-item");
            modItem.innerHTML = `
                <h3>${mod.name}</h3>
                <div class="mod-buttons">
                    <a href="${mod.link}" target="_blank">Download</a>
                </div>
            `;
            modList.appendChild(modItem);
        });
    } catch (error) {
        console.error("Error loading mods:", error);
    }
}

// Show upload modal
document.getElementById("uploadModButton").addEventListener("click", function () {
    document.getElementById("uploadModal").classList.add("show");
});

// Close the upload modal
document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("uploadModal").classList.remove("show");
});

// Handle form submission for mod upload
document.getElementById("submitMod").addEventListener("click", uploadMod);

// Load mods on page load
window.onload = loadMods;
