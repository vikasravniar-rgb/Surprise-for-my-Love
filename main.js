const openBtn = document.getElementById("openBtn");
const overlay = document.querySelector(".overlay");
const noBtn = document.getElementById("NoBtn");
const yesBtn = document.getElementById("YesBtn");

const questionBox = document.getElementById("questionBox");
const loveLetter = document.getElementById("loveLetter");
const typedText = document.getElementById("typedText");
const music = document.getElementById("loveMusic");
const celebrateGif = document.getElementById("celebrateGif");

/* Open popup */
openBtn.addEventListener("click", () => {
  overlay.classList.add("open");
});

/* NO button messages */
const messages = [
  "That's not good 😢",
  "I am going to cry 😭",
  "Don't try 😣",
  "It's hurting 💔"
];

let msgIndex = 0;
let yesScale = 1;

/* NO button logic */
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 300 - 150;
  const y = Math.random() * 300 - 150;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  noBtn.textContent = messages[msgIndex];
  msgIndex = (msgIndex + 1) % messages.length;

  yesScale += 0.3;
  yesBtn.style.transform = `scale(${yesScale})`;

  if (yesScale > 6) {
    yesBtn.style.position = "fixed";
    yesBtn.style.top = "0";
    yesBtn.style.left = "0";
    yesBtn.style.width = "100vw";
    yesBtn.style.height = "100vh";
    yesBtn.style.fontSize = "40px";
    yesBtn.style.borderRadius = "0";
    yesBtn.textContent = "YES 💖";
  }
});

/* YES click */
yesBtn.addEventListener("click", () => {
  questionBox.style.display = "none";
  loveLetter.style.display = "block";
  music.play();
  typeText();
  startConfetti();
});

/* Typing effect */
const text = typedText.innerHTML;
typedText.innerHTML = "";
let i = 0;

function typeText() {
  if (i < text.length) {
    typedText.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeText, 35);
  } else {
    celebrateGif.style.display = "block"; // 🎉 show GIF
  }
}

/* Confetti */
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 6 + 4,
      c: `hsl(${Math.random() * 360},100%,50%)`
    });
  }
  drawConfetti();
}

function drawConfetti() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetti.forEach((p,i) => {
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = p.c;
    ctx.fill();
    p.y += p.d;
    if (p.y > canvas.height) confetti.splice(i,1);
  });
  if (confetti.length) requestAnimationFrame(drawConfetti);
}
