const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz7ayEmGWqO0rED2qEqydRXuyQUmiiAAt7zBv2p76lupbfd-9or5SYap-J8pNGLwz81/exec";

const lookupSection = document.getElementById('lookupSection');
const rsvpForm = document.getElementById('rsvpForm');
const successMsg = document.getElementById('successMsg');
const findBtn = document.getElementById('findBtn');
const nameInput = document.getElementById('nameInput');

// STEP 1: SEARCH GUEST
findBtn.onclick = () => {
    const name = nameInput.value.trim();
    if (!name) return;

    findBtn.disabled = true;
    findBtn.innerText = "...";

    fetch(`${SCRIPT_URL}?action=search&name=${encodeURIComponent(name)}`)
        .then(res => res.json())
        .then(guest => {
            if (guest && guest.found) {
                lookupSection.style.display = 'none';
                rsvpForm.style.display = 'block';

                // Populate Guest 1
                document.getElementById('guest1Header').innerText = guest.name;
                document.getElementById('hiddenName1').value = guest.name;

                // Populate Guest 2 (+1) if exists
                if (guest.plusOne) {
                    const p1Card = document.getElementById('plusOneCard');
                    p1Card.style.display = 'block';
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

    const formData = new FormData(rsvpForm);
    // Append the language used for the spreadsheet records
    formData.append("Language", localStorage.getItem('wedding_lang') || 'en');

    fetch(SCRIPT_URL, { method: 'POST', body: formData })
        .then(() => {
            rsvpForm.style.display = 'none';
            successMsg.style.display = 'block';
        })
        .catch(err => {
            alert("Error submitting. Please try again.");
            submitBtn.disabled = false;
        });
};
