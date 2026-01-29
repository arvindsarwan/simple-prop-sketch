// -----------------------------
// Configuration
// -----------------------------
const PERSON_NAME = "Aisha";
const quoteText = "You are so beautiful that I can’t draw you even with my hand,\nthen how would a computer be able to draw you?";

// -----------------------------
// DOM Elements
// -----------------------------
const paths = document.querySelectorAll(".sketch path");
const pencil = document.querySelector(".pencil");
const message = document.querySelector(".message");
const nameEl = document.querySelector(".name");
const quoteEl = document.querySelector(".quote");

// Set the name dynamically
nameEl.textContent = PERSON_NAME;

// -----------------------------
// Typewriter Function
// -----------------------------
function typeWriter(text, element, speed = 40) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text[i] === "\n" ? "<br>" : text[i];
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// -----------------------------
// GSAP Animation
// -----------------------------
gsap.registerPlugin(MotionPathPlugin);

const tl = gsap.timeline();

// Show pencil
tl.to(pencil, { opacity: 1, duration: 0.3 });

// Draw first two paths (stop midway intentionally)
paths.forEach((path, i) => {
  if (i > 1) return; // stop halfway

  // Draw the path
  tl.to(path, {
    strokeDashoffset: 0,
    duration: 1,
    ease: "power1.inOut"
  }, "+=0.2");

  // Move pencil along path
  tl.to(pencil, {
    motionPath: {
      path: path,
      align: path,
      autoRotate: true,
      alignOrigin: [0.5, 0.5]
    },
    duration: 1,
    ease: "power1.inOut"
  }, "<"); // "<" = sync with path animation
});

// Pause for dramatic effect
tl.to({}, { duration: 0.6 });

// Reveal message container
tl.to(message, {
  opacity: 1,
  duration: 1.5,
  ease: "power2.out"
});

// Start typewriter effect after sketch + pause
tl.call(() => typeWriter(quoteText, quoteEl), null, "-=1.2");
