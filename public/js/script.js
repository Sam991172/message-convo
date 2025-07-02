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
    message: `
      I know I’ve made mistakes in the past — and I’m genuinely sorry for the ways I hurt you or made you feel exhausted.<br><br>
      I’ve had time to reflect, and I truly regret not being better when it mattered most.<br><br>
      I’ve started working on myself — not just for us, but for me. For the first time, I’m really understanding what it means to grow with calmness, maturity, and consistency.<br><br>
      I’m not trying to fix the past or force anything. But if there’s even a small space to start fresh — from peace, not pressure — I’d be grateful to explore that, slowly and honestly. Only if your heart is open to it.<br><br>
      If not, I’ll completely understand and still wish you only love and clarity. Just wanted to say this from a place of respect, not expectation.
    `,
    full: true
  }
];

let currentPage = 0;
const chosen = [];

function renderPage(index) {
  const page = pages[index];

  // Build message HTML
  let html = `<div class="message">${page.message}</div>`;

  // If options exist
  if (!page.full && page.options) {
    html += `
      <div class="buttons">
        <button class="primary" onclick="handleChoice(0)">${page.options[0]}</button>
        <button class="secondary" onclick="handleChoice(1)">${page.options[1]}</button>
      </div>
    `;
  }

  app.innerHTML = html;

  // Final page animations
  if (page.full) {
    for (let i = 0; i < 30; i++) {
      const emoji = document.createElement("div");
      emoji.className = "emoji";
      emoji.innerText = "😔";
      emoji.style.position = "fixed";
      emoji.style.left = Math.random() * 100 + "vw";
      emoji.style.top = "-50px";
      emoji.style.fontSize = "24px";
      emoji.style.opacity = 0.8;
      emoji.style.animation = `fall ${3 + Math.random() * 5}s linear infinite`;
      document.body.appendChild(emoji);
    }

    // Send choice data to backend
    fetch("https://message-convo.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        choices: chosen
      })
    }).catch(err => console.error("Submission failed:", err));
  }
}

function handleChoice(optionIndex) {
  chosen.push({
    page: currentPage,
    choice: pages[currentPage].options[optionIndex]
  });
  currentPage++;
  if (currentPage < pages.length) {
    renderPage(currentPage);
  }
}

// Start app
renderPage(currentPage);
