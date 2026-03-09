const dictionary = {
    en: {
        nav_home: "Home", nav_why: "Why Thailand?",
        nav_hotels: "Hotels", nav_recs: "Recommendation Corner",
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
        nav_hotels: "ที่พัก", nav_recs: "มุมแนะนำ",
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
        nav_hotels: "호텔", nav_recs: "추천 코너",
        nav_faq: "FAQ", nav_rsvp: "참석여부",
        nav_events: "일정",
        schedule_welcome_title: "사랑하는 가족과 친구들에게",
        schedule_welcome_text: "저희와 함께 축하해 주시기 위해 멀리 태국까지 와 주셔서 진심으로 기쁘고 감사합니다. 치앙마이는 저희 두 사람의 마음속에 특별한 의미가 있는 곳이며, 이곳에서 여러분과 함께할 수 있다는 사실이 저희에겐 무엇보다 소중합니다. 저희의 소중한 순간에 함께하기 위해 먼 길을 와 주신 여러분의 정성과 사랑에 깊이 감사드립니다.",
        event1_title: "웰컴 런치: 무카타 (태국식 바베큐)",
        event2_title: "결혼식 및 피로연",
        event3_title: "굿바이 브런치"
    }

};

const globalHeader = `
    <nav class="nav-container">
        <div class="top-bar">
            <div class="lang-switcher">
                <button id="btn-en" class="lang-btn" onclick="updateLanguage('en')">EN</button>
                <button id="btn-th" class="lang-btn" onclick="updateLanguage('th')">TH</button>
                <button id="btn-ko" class="lang-btn" onclick="updateLanguage('ko')">KO</button>
            </div>
        </div>
        <a href="why.html" class="nav-logo">Pet and Hannah Have a Wedding!</a>
        <div class="nav-links">
            <a href="why.html" data-i18n="nav_why">Why Thailand?</a>
            <a href="schedule.html" data-i18n="nav_events">Schedule</a>
            <a href="hotels.html" data-i18n="nav_hotels">Hotels</a>
            <a href="recommendation-corner.html" data-i18n="nav_recs">Recommendation Corner</a>
            <a href="faq.html" data-i18n="nav_faq">FAQ</a>
            <a href="rsvp.html" data-i18n="nav_rsvp">RSVP</a>
        </div>
    </nav>
`;

const globalFooter = `
    <footer class="footer-container">
        <div class="footer-divider" style="height: 1px; background: rgba(100, 17, 27, 0.2); width: 100px; margin: 0 auto 30px;"></div>
        <p class="footer-names">Made by Pet (and Hannah helped)</p>
        <p class="footer-date">Nov 6, 2027 — CHIANG MAI</p>
    </footer>
`;

function updateLanguage(lang) {
    localStorage.setItem('wedding_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[lang][key]) el.innerText = dictionary[lang][key];
    });
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${lang}`)?.classList.add('active');
}

function init() {
    const isAuth = localStorage.getItem('wedding_auth');
    const path = window.location.pathname;
    const isLandingPage = path.endsWith('index.html') || path === '/' || path.endsWith('/and-hannah/');
    const isLoginPage = path.endsWith('login.html');

    // Add the class dynamically to body
    if (isLandingPage || isLoginPage) {
        document.body.className = isLandingPage ? 'landing-body' : 'login-body';
    } else {
        document.body.className = 'main-page';
    }

    // Only inject header/footer and check language if it's NOT the landing page
    if (!isLandingPage) {
        const hPlace = document.getElementById('header-placeholder');
        const fPlace = document.getElementById('footer-placeholder');
        if (hPlace) hPlace.innerHTML = globalHeader;
        if (fPlace) fPlace.innerHTML = globalFooter;

        const savedLang = localStorage.getItem('wedding_lang') || 'en';
        updateLanguage(savedLang);

        const btn = document.getElementById('menuToggle');
        if (btn) btn.onclick = toggleMenu;
    }
}

window.onload = init;