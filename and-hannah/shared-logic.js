const dictionary = {
    en: {
        nav_home: "Home", nav_why: "Why Thailand",
        nav_hotels: "Hotels", nav_pet: "Pet's Picks", nav_hannah: "Hannah's Picks",
        nav_faq: "FAQ", nav_rsvp: "RSVP",
        nav_events: "Schedule",
        schedule_welcome_title: "To Our Family & Friends",
        schedule_welcome_text: "We are so incredibly excited that you are traveling so far to celebrate with us. Chiang Mai is a place that holds so much of our hearts, and having you all here with us means the world. We appreciate the time, distance, and effort you've taken to be part of our story.",
        event1_title: "Welcome Late Lunch: Moo Krata",
        event2_title: "The Wedding Ceremony & Reception",
        event3_title: "Goodbye Brunch"
    },
    th: {
        nav_home: "หน้าแรก", nav_why: "ทำไมต้องไทย",
        nav_hotels: "ที่พัก", nav_pet: "มุมของเพชร", nav_hannah: "มุมของฮันนาห์",
        nav_faq: "คำถาม", nav_rsvp: "ลงทะเบียน",
        nav_events: "กำหนดการ",
        schedule_welcome_title: "ถึงครอบครัวและเพื่อนที่รักทุกท่าน",
        schedule_welcome_text: "เรารู้สึกตื่นเต้นและดีใจเป็นอย่างยิ่งที่คุณเดินทางมาไกลเพื่อมาร่วมฉลองกับเรา เชียงใหม่เป็นเมืองที่มีความหมายต่อใจเราทั้งคู่มาก และการที่มีทุกคนอยู่ที่นี่กับเรามีความหมายที่สุดสำหรับเรา ขอบคุณสำหรับเวลา และความพยายามในการเดินทางเพื่อมาเป็นส่วนหนึ่งในเรื่องราวของเรา",
        event1_title: "เลี้ยงต้อนรับมื้อบ่าย: หมูกระทะ",
        event2_title: "พิธีฉลองมงคลสมรสและงานเลี้ยงฉลอง",
        event3_title: "มื้อสายอำลา"
    },
    ko: {
        nav_home: "홈", nav_why: "왜 태국인가요", nav_events: "일정",
        nav_hotels: "호텔", nav_pet: "펫의 추천", nav_hannah: "한나의 추천",
        nav_faq: "FAQ", nav_rsvp: "참석여부",
        nav_events: "일정",
        schedule_welcome_title: "사랑하는 가족과 친구들에게",
        schedule_welcome_text: "저희와 함께 축하해 주시기 위해 멀리 태국까지 와 주셔서 진심으로 기쁘고 감사합니다. 치앙마이는 저희 두 사람의 마음속에 특별한 의미가 있는 곳이며, 이곳에서 여러분과 함께할 수 있다는 사실이 저희에겐 무엇보다 소중합니다. 저희의 소중한 순간에 함께하기 위해 먼 길을 와 주신 여러분의 정성과 사랑에 깊이 감사드립니다.",
        event1_title: "웰컴 런치: 무카타 (태국식 바베큐)",
        event2_title: "결혼식 및 피로연",
        event3_title: "굿바이 브런치"
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
