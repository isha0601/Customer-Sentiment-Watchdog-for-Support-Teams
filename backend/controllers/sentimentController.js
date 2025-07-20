const Ticket = require('../models/Ticket');
const { spawn } = require('child_process');

exports.analyzeSentiment = async (req, res) => {
  const { message } = req.body;

  const python = spawn('python', ['ai_service/sentiment.py']); // using 'python', not 'python3'

  let dataToSend = '';

  python.stdin.write(message);
  python.stdin.end();

  python.stdout.on('data', (data) => {
    console.log('Python STDOUT:', data.toString());
    dataToSend += data.toString();
  });

  python.stderr.on('data', (data) => {
    console.error(`Python STDERR: ${data}`);
  });

  python.on('close', async () => {
    if (!dataToSend) {
      console.error('Python returned nothing.');
      return res.status(500).json({ error: 'No output from Python' });
    }

    try {
      const result = JSON.parse(dataToSend);
      console.log('Python result:', result);

      const ticket = new Ticket({
        message,
        emotion: result.label,
        score: result.score
      });

      await ticket.save();

      // 👉 Trend checker: last 10 tickets, count negatives
      const recent = await Ticket.find().sort({ createdAt: -1 }).limit(10);
      const negatives = recent.filter(t => t.emotion === 'anger' || t.emotion === 'sadness' || t.emotion === 'fear').length;

      if (negatives >= process.env.NEGATIVE_THRESHOLD) {
        console.log(`🚨 ALERT: High negative emotions detected! Recent negatives: ${negatives}`);
        // 👉 You could plug in Slack webhook here
      }

      res.json({
        emotion: result.label,
        score: result.score
      });

    } catch (err) {
      console.error('JSON parse failed:', err);
      res.status(500).json({ error: 'Could not parse Python output.' });
    }
  });
};

exports.getTickets = async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.json(tickets);
};
