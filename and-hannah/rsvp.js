const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyM57GVG5lXcQLi96KXUWzMsRctzq4Qfyk1qzrpYUoRfuSqdyI-BKkQ7mZ31M2IngQl/exec";

// ... (keep your existing element constants) ...

// STEP 1: SEARCH GUEST
findBtn.onclick = () => {
    const name = nameInput.value.trim();
    if (!name) return;

    findBtn.disabled = true;
    findBtn.innerText = "...";

    // Added action parameter to match script logic
    fetch(`${SCRIPT_URL}?name=${encodeURIComponent(name)}`)
        .then(res => res.json())
        .then(guest => {
            // Note: Updated check to 'guest' directly based on script return
            if (guest && guest.name) { 
                lookupSection.style.display = 'none';
                rsvpForm.style.display = 'block';

                document.getElementById('guest1Header').innerText = guest.name;
                document.getElementById('hiddenName1').value = guest.name;

                if (guest.plusOne) {
                    document.getElementById('plusOneCard').style.display = 'block';
                    document.getElementById('guest2Header').innerText = guest.plusOne;
                    document.getElementById('hiddenName2').value = guest.plusOne;
                }
            } else {
                document.getElementById('lookupError').style.display = 'block';
                findBtn.disabled = false;
                findBtn.innerText = "Find Invitation";
            }
        })
        .catch(err => {
            console.error(err);
            findBtn.disabled = false;
        });
};

// STEP 2: SUBMIT DATA
rsvpForm.onsubmit = (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    // Convert FormData to a plain JSON object for the App Script
    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData.entries());
    data.Language = localStorage.getItem('wedding_lang') || 'en';

    fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors', // Essential for Google Apps Script redirects
        body: JSON.stringify(data) 
    })
    .then(() => {
        rsvpForm.style.display = 'none';
        successMsg.style.display = 'block';
    })
    .catch(err => {
        alert("Error submitting. Please try again.");
        submitBtn.disabled = false;
    });
};