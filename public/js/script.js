
const app = document.getElementById("app");

const pages = [
  {
    message: "I know I’ve made mistakes in the past — and I’m genuinely sorry for the ways I hurt you or made you feel exhausted.",
    options: ["Next", "Not Ready"]
  },
  {
    message: "I’ve had time to reflect, and I truly regret not being better when it mattered most.",
    options: ["I’m listening", "Still hurts"]
  },
  {
    message: "I’ve started working on myself — not just for us, but for me. I’m learning calmness, maturity, and consistency.",
    options: ["Go on", "Too late"]
  },
  {
    message: "I’m not trying to fix the past or force anything. But if there’s even a small space to start fresh — from peace, not pressure — I’d be grateful to explore that.",
    options: ["Maybe", "I need time"]
  },
  {
    message: "Only if your heart is open to it. If not, I understand and still wish you love and clarity.",
    options: ["That means a lot", "Goodbye"]
  },
  {
    message: "Thank you for reading this with an open heart. No matter what, I’ll carry respect for you always.",
    options: ["See Full Message"]
  },
  {
    message: `I know I’ve made mistakes in the past — and I’m genuinely sorry for the ways I hurt you or made you feel exhausted.\n\nI’ve had time to reflect, and I truly regret not being better when it mattered most.\n\nI’ve started working on myself — not just for us, but for me. For the first time, I’m really understanding what it means to grow with calmness, maturity, and consistency.\n\nI’m not trying to fix the past or force anything. But if there’s even a small space to start fresh — from pe...
    full: true
  }
];

let currentPage = 0;
const chosen = [];

function renderPage(index) {
  const page = pages[index];
  app.innerHTML = `
    <div class="message">${page.message.replace(/\n/g, "<br>")}</div>
    ${!page.full ? `
      <div class="buttons">
        <button class="primary" onclick="handleChoice(0)">${page.options[0]}</button>
        <button class="secondary" onclick="handleChoice(1)">${page.options[1]}</button>
      </div>` : ''}
  `;

  if (page.full) {
    for (let i = 0; i < 30; i++) {
      const emoji = document.createElement("div");
      emoji.className = "emoji";
      emoji.style.left = Math.random() * 100 + "vw";
      emoji.style.animationDuration = 5 + Math.random() * 5 + "s";
      emoji.style.top = Math.random() * 100 + "vh";
      emoji.innerHTML = "😔";
      app.appendChild(emoji);
    }

    fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: new Date(), choices: chosen })
    });
  }
}

function handleChoice(optionIndex) {
  chosen.push({ page: currentPage, choice: optionIndex });
  currentPage++;
  if (currentPage < pages.length) {
    renderPage(currentPage);
  }
}

renderPage(currentPage);
