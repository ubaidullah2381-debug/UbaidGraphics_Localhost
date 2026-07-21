const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ── Nodemailer Transporter ─────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ubaidullah2381@gmail.com',
        pass: 'gneu wzva wyer jhfa'
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
            return res.status(500).send('ای میل بھیجنے میں خرابی ہوئی!');
        }
        res.send('آپ کا پیغام کامیابی سے بھیج دیا گیا ہے!');
    });
});

// ── Save/Read data.json ──────────────────────────────────────────
app.post('/api/save', (req, res) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
});

app.get('/data.json', (req, res) => {
    if (fs.existsSync(DATA_FILE)) {
        res.sendFile(DATA_FILE);
    } else {
        res.json({});
    }
});

app.listen(PORT, () => {
    console.log(`ویب سائٹ لائیو ہے: http://localhost:${PORT}`);
});