fetch('http://localhost:5050/api/tickets')
  .then(res => res.json())
  .then(tickets => {
    console.log('Tickets:', tickets);

    const ctx = document.getElementById('sentimentChart').getContext('2d');

    const emotionCounts = {};
    tickets.forEach(t => {
      if (!emotionCounts[t.emotion]) {
        emotionCounts[t.emotion] = 0;
      }
      emotionCounts[t.emotion]++;
    });

    const labels = Object.keys(emotionCounts);
    const data = Object.values(emotionCounts);

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#F44336', '#4CAF50', '#FF9800', '#9C27B0', '#2196F3', '#00BCD4']
        }]
      }
    });

    const list = document.getElementById('ticketList');
    tickets.forEach(t => {
      const li = document.createElement('li');
      li.innerText = `${t.emotion} (${(t.score * 100).toFixed(2)}%): ${t.message}`;
      list.appendChild(li);
    });
  });
