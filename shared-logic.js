const dictionary = {
    en: { nav_home: "Home", nav_why: "Why Thailand", nav_events: "Details", nav_hotels: "Hotels", nav_pet: "Pet's Picks", nav_hannah: "Hannah's Picks", nav_faq: "FAQ", nav_rsvp: "RSVP" },
    th: { nav_home: "หน้าแรก", nav_why: "ทำไมต้องไทย", nav_events: "กำหนดการ", nav_hotels: "ที่พัก", nav_pet: "มุมของเพชร", nav_hannah: "มุมของฮันนาห์", nav_faq: "คำถาม", nav_rsvp: "ลงทะเบียน" },
    ko: { nav_home: "홈", nav_why: "왜 태국인가요", nav_events: "일정", nav_hotels: "호텔", nav_pet: "펫의 추천", nav_hannah: "한나의 추천", nav_faq: "FAQ", nav_rsvp: "참석여부" }
};

function init() {
    // Auth Check
    if (!localStorage.getItem('wedding_auth') && !window.location.href.includes('index.html')) {
        window.location.href = 'index.html';
    }

    // Language Init
    const lang = localStorage.getItem('wedding_lang') || 'en';
    updateLanguage(lang);

    // Menu Toggle
    const toggle = document.getElementById('menuToggle');
    if(toggle) toggle.onclick = () => {
        const menu = document.getElementById('menu');
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    };
}

function updateLanguage(lang) {
    localStorage.setItem('wedding_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[lang][key]) el.innerText = dictionary[lang][key];
    });
    // Visual toggle for buttons
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${lang}`)?.classList.add('active');
}

window.onload = init;
