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
    
    console.log("Form data being sent:", formData);
    
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzVvtUF5uvxeut6tHLHk6Y88OLZLLGokxXbVxoqhps1oe8MeT05wCg7VR21ts5c0vQAwA/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
    
        const responseData = await response.json();
        console.log("Response from Google Apps Script:", responseData); 
        
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
        modList.innerHTML = "";
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

// Function to upload a new mod
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

    try {
        console.log("Uploading mod...", formData);
        const response = await fetch("https://script.google.com/macros/s/AKfycbygU3KnE4Ix7pGupmrxqMlFSzpcEYSLxWGiWfdRu2BnpW4gY4IJZ7LjhPqoeBVIOmM0/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.text();
        console.log("Upload response:", result);

        if (response.ok) {
            alert("Mod uploaded successfully!");
            loadMods(); 
            document.getElementById("modName").value = "";
            document.getElementById("modGitHub").value = "";
            // Optionally close the modal if using one:
            document.getElementById("uploadModal").classList.remove("show");
        } else {
            alert("Failed to upload mod.");
        }
    } catch (error) {
        console.error("Upload error:", error);
    }
}

document.getElementById("uploadModButton").addEventListener("click", () => {
    document.getElementById("uploadModal").classList.add("show");
});
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("uploadModal").classList.remove("show");
});

document.getElementById("submitMod").addEventListener("click", uploadMod);

window.onload = loadMods;
