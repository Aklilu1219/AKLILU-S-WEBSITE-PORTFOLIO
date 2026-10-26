/* ==========================================================================
   Aklilu Workineh - Full Stack Developer Portfolio
   External JavaScript (script.js)
   ========================================================================== */

/* 1. Typing Animation Effect */
const words = [
    "Full Stack Web Applications",
    "Node.js & Express REST APIs",
    "Modern React & TypeScript SPAs",
    "Scalable Database Architectures",
    "Academic Management Systems"
    "UI/UX designer",
    "E_Commerence System"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

/* 2. Seasonal Aurora Palettes */
const SEASONS = [
    { key: "spring", label: "Spring build", icon: "fa-seedling" },
    { key: "summer", label: "Summer build", icon: "fa-sun" },
    { key: "autumn", label: "Autumn build", icon: "fa-leaf" },
    { key: "winter", label: "Winter build", icon: "fa-snowflake" }
];

let seasonIndex = 0;

function applySeason(index) {
    const season = SEASONS[index];
    document.documentElement.setAttribute("data-season", season.key);

    const tag = document.getElementById("season-tag");
    if (tag) {
        tag.innerHTML = `<i class="fas ${season.icon}"></i> ${season.label}`;
    }
}

function startSeasonCycle() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        applySeason(0);
        return;
    }
    applySeason(seasonIndex);
    setInterval(() => {
        seasonIndex = (seasonIndex + 1) % SEASONS.length;
        applySeason(seasonIndex);
    }, 8000);
}

/* 3. Theme Toggle (Dark / Light) */
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("portfolio_theme", next);

    const icon = document.getElementById("theme-icon");
    if (icon) {
        icon.className = next === "light" ? "fas fa-sun" : "fas fa-moon";
    }
}

function initTheme() {
    const saved = localStorage.getItem("portfolio_theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    const icon = document.getElementById("theme-icon");
    if (icon) {
        icon.className = saved === "light" ? "fas fa-sun" : "fas fa-moon";
    }
}

/* 4. Navigation & Mobile Menu */
function toggleMobileNav() {
    const navList = document.getElementById("nav-list");
    const menuToggle = document.getElementById("menu-toggle");
    if (!navList) return;

    const isOpen = navList.classList.toggle("responsive");
    if (menuToggle) {
        menuToggle.innerHTML = isOpen ? "&#10005;" : "&#9776;";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll("#nav-list a");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const navList = document.getElementById("nav-list");
            if (navList) navList.classList.remove("responsive");
            const menuToggle = document.getElementById("menu-toggle");
            if (menuToggle) menuToggle.innerHTML = "&#9776;";
        });
    });

    // Back to top button
    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
        backToTop.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Scroll spy
    if ("IntersectionObserver" in window) {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("id");
                        navLinks.forEach((l) => {
                            l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
                        });
                    }
                });
            },
            { rootMargin: "-40% 0px -50% 0px" }
        );
        sections.forEach((sec) => observer.observe(sec));
    }
}

/* 5. Live In-Browser Document Viewer (CV & Cover Letter) */
let currentDoc = "cv";
let isEditingDoc = false;

function openDocModal(type) {
    currentDoc = type || "cv";
    switchDocTab(currentDoc);
    const modal = document.getElementById("doc-modal");
    if (modal) modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeDocModal() {
    const modal = document.getElementById("doc-modal");
    if (modal) modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function switchDocTab(type) {
    currentDoc = type;
    const cvTabBtn = document.getElementById("tab-btn-cv");
    const clTabBtn = document.getElementById("tab-btn-cl");
    const cvContent = document.getElementById("doc-content-cv");
    const clContent = document.getElementById("doc-content-cl");
    const modalTitle = document.getElementById("doc-modal-title");

    if (type === "cv") {
        if (cvTabBtn) cvTabBtn.classList.add("active");
        if (clTabBtn) clTabBtn.classList.remove("active");
        if (cvContent) cvContent.style.display = "block";
        if (clContent) clContent.style.display = "none";
        if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-file-alt"></i> Curriculum Vitae (CV)';
    } else {
        if (clTabBtn) clTabBtn.classList.add("active");
        if (cvTabBtn) cvTabBtn.classList.remove("active");
        if (clContent) clContent.style.display = "block";
        if (cvContent) cvContent.style.display = "none";
        if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-envelope-open-text"></i> Cover Letter';
    }
}

function toggleEditDoc() {
    isEditingDoc = !isEditingDoc;
    const paper = document.getElementById("paper-canvas");
    const editBtn = document.getElementById("btn-edit-doc");
    if (!paper) return;

    paper.classList.toggle("is-editing", isEditingDoc);
    const editableFields = paper.querySelectorAll(".editable-field");

    editableFields.forEach((field) => {
        field.contentEditable = String(isEditingDoc);
    });

    if (editBtn) {
        editBtn.innerHTML = isEditingDoc
            ? '<i class="fas fa-eye"></i> View Mode'
            : '<i class="fas fa-edit"></i> Edit Mode';
    }
}

function printDocument() {
    window.print();
}

function copyDocumentText() {
    let text = "";
    if (currentDoc === "cv") {
        const cvEl = document.getElementById("doc-content-cv");
        text = cvEl ? cvEl.innerText : "";
    } else {
        const clEl = document.getElementById("doc-content-cl");
        text = clEl ? clEl.innerText : "";
    }

    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.getElementById("btn-copy-doc");
        if (copyBtn) {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => { copyBtn.innerHTML = original; }, 2000);
        }
    });
}

function downloadDocumentText() {
    const filename = currentDoc === "cv" ? "Aklilu_Workineh_CV.txt" : "Aklilu_Workineh_Cover_Letter.txt";
    let text = "";
    if (currentDoc === "cv") {
        const cvEl = document.getElementById("doc-content-cv");
        text = cvEl ? cvEl.innerText : "";
    } else {
        const clEl = document.getElementById("doc-content-cl");
        text = clEl ? clEl.innerText : "";
    }

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function openCleanTab() {
    const url = currentDoc === "cv" ? "cv.html" : "cover-letter.html";
    window.open(url, "_blank");
}

/* 6. Contact Form Dispatcher */
function handleContactSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        document.getElementById("email").focus();
        return;
    }

    const subject = `Portfolio Inquiry from ${name}`;
    const body = `${message}\n\n— Sent by: ${name} (${email})`;
    const mailto = `mailto:akliluworkineh699@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    document.getElementById("contact-form").reset();
    alert("Thank you! Your default mail client has been opened to send this message.");
}

/* Modal ESC Key and Backdrop Clicks */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeDocModal();
        closeVsCodeModal();
    }
});

document.addEventListener("click", (e) => {
    const docModal = document.getElementById("doc-modal");
    const vsModal = document.getElementById("vscode-modal");
    if (e.target === docModal) closeDocModal();
    if (e.target === vsModal) closeVsCodeModal();
});

/* Lifecycle Initialization */
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    startSeasonCycle();
    typeEffect();
    initNavigation();
});
