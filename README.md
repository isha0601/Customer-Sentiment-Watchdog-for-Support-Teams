# Customer-Sentiment-Watchdog-for-Support-Teams

# 📈 Customer Sentiment Watchdog for Support Teams

**Problem:**  
Customer support teams struggle to detect rising frustration or satisfaction trends hidden across emails, live chats, or support tickets. Missing early warning signs means lower customer happiness and lost trust.

---

## ✅ Solution

**Customer Sentiment Watchdog** is an **AI agent** that:
- Analyzes incoming support tickets & live chats in **real-time**
- Tags each message with an **emotional tone** — anger, sadness, fear, joy, surprise, or love
- Stores every message in a **MongoDB database**
- Visualizes trends in a live **dashboard** (Pie chart + ticket log)
- Detects **negative emotion spikes** (like sudden anger) and triggers an alert

---

## 🚀 How It Works

1. **Frontend:**  
   - Simple web form to simulate incoming tickets or chat messages.
   - Shows detected emotion & confidence.
   - Automatic bot reply (e.g., _"We're sorry to hear that!"_).

2. **Backend (Node.js + Express):**  
   - Receives each message.
   - Spawns a **Python** process that runs a `transformers` model for **multi-emotion classification** (`nateraw/bert-base-uncased-emotion`).
   - Saves results to **MongoDB**.
   - Checks the last 10 tickets — if negative emotions exceed threshold, logs an **ALERT 🚨** (Slack/Gmail webhook ready to plug in).

3. **Dashboard:**  
   - Live Pie Chart showing emotion trends.
   - Full list of all analyzed messages with emotions & scores.

---

## 🧩 Tech Stack

- **Frontend:** HTML, CSS, Vanilla JS
- **Backend:** Node.js, Express.js
- **ML Service:** Python, Hugging Face `transformers`
- **Database:** MongoDB

---

