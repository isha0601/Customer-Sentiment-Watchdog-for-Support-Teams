async function analyze() {
  const message = document.getElementById('message').value.trim();
  if (!message) {
    showToast("Please enter a message!", true);
    return;
  }

  try {
    const res = await fetch('http://localhost:5050/api/tickets/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    console.log('Frontend got:', data);

    const resultDiv = document.getElementById('result');
    resultDiv.innerText = `Emotion: ${data.emotion}\nConfidence: ${(data.score * 100).toFixed(2)}%`;

    showToast("Analysis Complete ✅");
  } catch (error) {
    showToast("Error analyzing message!", true);
  }
}

function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.style.background = isError ? "#e63946" : "#333";
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
