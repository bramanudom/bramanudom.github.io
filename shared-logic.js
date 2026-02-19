const dictionary = {
    en: { 
        nav_home: "Home", nav_why: "Why Thailand", nav_events: "Details", 
        nav_hotels: "Hotels", nav_pet: "Pet's Picks", nav_hannah: "Hannah's Picks", 
        nav_faq: "FAQ", nav_rsvp: "RSVP" 
    },
    th: { 
        nav_home: "หน้าแรก", nav_why: "ทำไมต้องไทย", nav_events: "กำหนดการ", 
        nav_hotels: "ที่พัก", nav_pet: "มุมของเพชร", nav_hannah: "มุมของฮันนาห์", 
        nav_faq: "คำถาม", nav_rsvp: "ลงทะเบียน" 
    },
    ko: { 
        nav_home: "홈", nav_why: "왜 태국인가요", nav_events: "일정", 
        nav_hotels: "호텔", nav_pet: "펫의 추천", nav_hannah: "한나의 추천", 
        nav_faq: "FAQ", nav_rsvp: "참석여부" 
    }
};

// 1. Unified Toggle Function
function toggleMenu() {
    const menu = document.getElementById('menu');
    if (!menu) return;
    
    // Check computed style to see what the browser actually sees
    const isHidden = window.getComputedStyle(menu).display === 'none';
    menu.style.display = isHidden ? 'flex' : 'none';
}

// 2. Language Function
function updateLanguage(lang) {
    localStorage.setItem('wedding_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[lang] && dictionary[lang][key]) {
            el.innerText = dictionary[lang][key];
        }
    });
    
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
}

// 3. Single Initialization Point
function init() {
    // Auth Check
    const isAuth = localStorage.getItem('wedding_auth');
    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    
    if (!isAuth && !isIndex) {
        window.location.href = 'index.html';
        return;
    }

    // Language Init
    const savedLang = localStorage.getItem('wedding_lang') || 'en';
    updateLanguage(savedLang);

    // Menu Toggle - Only set it once here
    const btn = document.getElementById('menuToggle');
    if (btn) {
        btn.onclick = (e) => {
            e.preventDefault();
            toggleMenu();
        };
    }
    
    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll('#menu a');
    menuLinks.forEach(link => {
        link.onclick = () => {
            document.getElementById('menu').style.display = 'none';
        };
    });
}

// Run everything when the window loads
window.onload = init;
