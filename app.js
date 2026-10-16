const chatBox   = document.getElementById("chat-box");
const input     = document.getElementById("user-input");
const sendBtn   = document.getElementById("send-btn");

// Send on button click
sendBtn.addEventListener("click", sendMessage);

// Send on Enter (Shift+Enter = new line)
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function addBubble(text, type) {
  const div = document.createElement("div");
  div.className = `bubble ${type}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return div;
}

async function sendMessage() {
  const prompt = input.value.trim();
  if (!prompt) return;

  // Show user message
  addBubble(prompt, "user");
  input.value = "";
  sendBtn.disabled = true;

  // Show typing indicator
  const typingBubble = addBubble("Gemini is thinking...", "ai typing");

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    typingBubble.remove();

    if (data.error) {
      addBubble("⚠️ " + data.error, "error");
    } else {
      addBubble(data.result, "ai");
    }

  } catch (err) {
    typingBubble.remove();
    addBubble("⚠️ Could not connect to the server.", "error");
  }

  sendBtn.disabled = false;
  input.focus();
}
