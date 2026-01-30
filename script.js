// -------- CONFIG --------
const PERSON_NAME = "Aisha";
const QUOTE =
  "You are so beautiful that I can’t draw you even with my hand,\nthen how would a computer be able to draw you?";

// -------- ELEMENTS --------
const paths = document.querySelectorAll(".sketch path");
const pencil = document.querySelector(".pencil");
const message = document.querySelector(".message");
const quoteEl = document.querySelector(".quote");
const nameEl = document.querySelector(".name");

nameEl.textContent = PERSON_NAME;

// -------- TYPEWRITER --------
function typeWriter(text, el, speed = 35) {
  let i = 0;
  function type() {
    if (i < text.length) {
      el.innerHTML += text[i] === "\n" ? "<br>" : text[i];
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// -------- GSAP --------
gsap.registerPlugin(MotionPathPlugin);

const tl = gsap.timeline({ defaults: { ease: "none" } });

// Show pencil
tl.to(pencil, { opacity: 1, duration: 0.3 });

// Draw paths in order
paths.forEach((path) => {
  const length = path.getTotalLength();

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
  });

  const duration = length / 120;

  tl.to(path, { strokeDashoffset: 0, duration });
  tl.to(pencil, {
    motionPath: {
      path,
      align: path,
      autoRotate: true,
      alignOrigin: [0.5, 0.5]
    },
    duration
  }, "<");
});

// Pencil gives up
tl.to(pencil, {
  rotation: 20,
  y: "+=15",
  opacity: 0,
  duration: 0.6,
  ease: "power2.out"
});

// Glow intensifies
tl.to(".sketch", {
  filter: "drop-shadow(0 0 16px rgba(255,182,193,0.6))",
  duration: 1
});

// Show text
tl.to(message, { opacity: 1, duration: 1.2 });
tl.call(() => typeWriter(QUOTE, quoteEl), null, "-=0.8");
