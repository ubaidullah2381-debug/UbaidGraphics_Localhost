const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer'); // nodemailer شامل کیا
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true })); // فارم ڈیٹا کے لیے ضروری
app.use(express.static(__dirname));

// ── Nodemailer Transporter ─────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ubaidullah2381@gmail.com',
        pass: 'gneu wzva wyer jhfa' // اپنا 16 ہندسوں کا پاسورڈ یہاں لگائیں
    }
});

// ── Contact Form Route ─────────────────────────────────────────────
app.post('/send-message', (req, res) => {
    const { name, email, service, message } = req.body;
    
    const mailOptions = {
        from: email,
        to: 'ubaidullah2381@gmail.com',
        subject: `نئی انکوائری: ${service}`,
        text: `نام: ${name}\nای میل: ${email}\nسروس: ${service}\n\nپیغام:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('ای میل بھیجنے میں خرابی ہوئی!');
        }
        res.send('آپ کا پیغام کامیابی سے بھیج دیا گیا ہے!');
    });
});

// ── SSE clients for live reload ────────────────────────────────────
let clients = [];
app.get('/api/live', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();
  clients.push(res);
  req.on('close', () => { clients = clients.filter(c => c !== res); });
});
function notifyClients() {
  clients.forEach(c => c.write(`data: reload\n\n`));
}

// ── Save data.json ─────────────────────────────────────────────────
app.post('/api/save', (req, res) => {
  try {
    const json = JSON.stringify(req.body, null, 2);
    fs.writeFileSync(DATA_FILE, json, 'utf8');
    notifyClients();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── Read data.json ───────────────────────────────────────────────
app.get('/data.json', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(data);
  } catch (e) {
    res.status(404).json({});
  }
});

app.listen(PORT, () => {
  console.log('\n');
  console.log('  ╔══════════════════════════════════════════╗');
  console.log('  ║    عبید گرافکس — لوکل سرور            ║');
  console.log('  ╠══════════════════════════════════════════╣');
  console.log(`  ║  🌐 ویب سائٹ :   http://localhost:${PORT}      ║`);
  console.log(`  ║  🔧 ایڈمن پینل: http://localhost:${PORT}/admin.html ║`);
  console.log('  ║                                          ║');
  console.log('  ║  بند کرنے کے لیے Ctrl + C دبائیں        ║');
  console.log('  ╚══════════════════════════════════════════╝');
  console.log('\n');
});