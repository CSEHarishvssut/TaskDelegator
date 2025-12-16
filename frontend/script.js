function showStatusMsg() {
  const status = document.querySelector("input[name='status']:checked").value;
  const msg = document.getElementById("statusMsg");

  if (status === "selected") {
    msg.innerText = "🟢 Selection email will be sent to the candidate.";
  } else {
    msg.innerText = "🔴 Rejection email will be sent to the candidate.";
  }
}

async function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const position = document.getElementById("position").value;
  const statusInput = document.querySelector("input[name='status']:checked");
  const msgBox = document.getElementById("msg");

  if (!name || !email || !position || !statusInput) {
    msgBox.innerText = "⚠️ Please fill all fields";
    return;
  }

  const response = await fetch("http://localhost:3000/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      position,
      status: statusInput.value
    })
  });

  const data = await response.json();
  msgBox.innerText = data.msg;
}
