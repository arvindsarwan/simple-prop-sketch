const paths = document.querySelectorAll(".sketch path");
const pencil = document.querySelector(".pencil");
const message = document.querySelector(".message");

const tl = gsap.timeline();

// show pencil
tl.to(pencil, { opacity: 1, duration: 0.3 });

// fake sketching
paths.forEach((path, i) => {
  tl.to(path, {
    strokeDashoffset: 0,
    duration: 1,
    ease: "power1.inOut"
  }, i);
});

// stop mid-way (intentional pause)
tl.to({}, { duration: 0.5 });

// reveal message
tl.to(message, {
  opacity: 1,
  duration: 1.5,
  ease: "power2.out"
});
