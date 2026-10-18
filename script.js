
/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !navbar.classList.contains("show"));
            icon.classList.toggle("fa-xmark", navbar.classList.contains("show"));
        }
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("show");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });
}


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* =========================
   BACK TO TOP
========================= */

const backTop = document.getElementById("backTop");

if (backTop) {
    window.addEventListener("scroll", () => {
        backTop.classList.toggle("show", window.scrollY > 500);
    });

    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");

// IMPORTANT: Replace the URL below with your deployed Apps Script URL.
const scriptURL = "https://script.google.com/macros/s/AKfycbxpv0LdFopCGXX5MYLu8V_pM8i7IwO6lLljujWEzKkocqYko_PjcfrC-WtT-M-41VtBvw/exec";

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in your name, email, and message.");
            return;
        }

        if (scriptURL === "PASTE_YOUR_WEB_APP_URL_HERE") {
            alert("Please configure the contact form URL first.");
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        const originalButtonText = submitButton
            ? (submitButton.tagName === "INPUT"
                ? submitButton.value
                : submitButton.textContent)
            : "";

        try {
            if (submitButton) {
                submitButton.disabled = true;

                if (submitButton.tagName === "INPUT") {
                    submitButton.value = "Sending...";
                } else {
                    submitButton.textContent = "Sending...";
                }
            }

            const formData = new URLSearchParams({
                name: name,
                email: email,
                subject: subject || "New Contact Form Message",
                message: message
            });

            // Send form data to Google Apps Script.
            // no-cors prevents reading the server response.
            await fetch(scriptURL, {
                method: "POST",
                mode: "no-cors",
                body: formData
            });

            alert(
                "Your form submission was sent. " +
                "Please verify email delivery."
            );

            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);

            alert(
                "Unable to submit the form. " +
                "Please check your internet connection and try again."
            );

        } finally {
            if (submitButton) {
                submitButton.disabled = false;

                if (submitButton.tagName === "INPUT") {
                    submitButton.value = originalButtonText;
                } else {
                    submitButton.textContent = originalButtonText;
                }
            }
        }
    });
}


/* =========================
   CURRENT YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   SIMPLE SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".service-card, .portfolio-card, .tool, .about-content, .skills-content"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
}
