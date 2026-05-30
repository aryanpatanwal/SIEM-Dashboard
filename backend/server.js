require('dotenv').config();
const fs = require('fs');
const chokidar = require('chokidar');

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Log = require('./models/Log');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI environment variable');
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error('Missing JWT_SECRET environment variable');
  process.exit(1);
}

if (!CLIENT_URL) {
  console.error('Missing CLIENT_URL environment variable');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({
  origin: CLIENT_URL
}));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: CLIENT_URL,
    }
});


const failedAttempts = {};


app.get('/', (req, res) => {
    res.send('SIEM Backend Running');
});
app.get('/logs',auth , async (req, res) => {

    try {

        const logs = await Log.find().sort({ _id: -1 }).limit(50);

        res.json(logs);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
});
app.post('/register', async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const existingUser =
          await User.findOne({
            email
          });

        if (existingUser) {

          return res.status(400).json({
            message:
              'Email already exists'
          });

        }

        const hashedPassword =
          await bcrypt.hash(
            password,
            10
          );

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({ message: 'User registered successfully' });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
});
app.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            username: user.username
        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
});
const logFile = '/var/log/auth.log';

let lastSize = 0;

function parseLogLine(line) {

  let severity = 'LOW';

  let event = 'System Activity';

  let user = extractUser(line);

  let ip = extractIP(line);

  const lowerLine =
    line.toLowerCase();

  if (
  lowerLine.includes('cron') &&
  lowerLine.includes('session opened')
) {
  return null;
}

  if (

  !lowerLine.includes('authentication failure') &&
  !lowerLine.includes('failed password') &&
  !lowerLine.includes('password check failed') &&
  !lowerLine.includes('maximum 3 incorrect authentication attempts') &&
  !lowerLine.includes('session opened') &&
  !lowerLine.includes('accepted password') &&
  !lowerLine.includes('invalid user') &&
  !lowerLine.includes('sudo')

) {

  return null;

}

  else if (

    lowerLine.includes('password check failed') ||
    lowerLine.includes('failed password') ||
    lowerLine.includes('incorrect password') ||
    lowerLine.includes('maximum 3 incorrect authentication attempts')

) {

    event =
      'Authentication Failure';

    severity = 'HIGH';

}

  else if (
    lowerLine.includes(
      'session opened'
    )
  ) {

    event = 'Session Opened';

    severity = 'LOW';

  }

  else if (

  lowerLine.includes('sudo') &&

  !lowerLine.includes('authentication failure') &&

  !lowerLine.includes('failed') &&

  !lowerLine.includes('incorrect authentication')

) {

    event =
      'Sudo Command Executed';

    severity = 'MEDIUM';

  }

  else if (
    lowerLine.includes(
      'invalid user'
    )
  ) {

    event =
      'Invalid User Attempt';

    severity = 'HIGH';

  }

  else if (
    lowerLine.includes(
      'accepted password'
    )
  ) {

    event =
      'Successful SSH Login';

    severity = 'LOW';

  }
  return {

    id: Date.now(),

    event,

    severity,

    ip,

    user,

    rawLog: line,

    timestamp:
  new Date().toLocaleTimeString(
    'en-IN',
    {
      hour: '2-digit',
      timeZone: 'Asia/Kolkata',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }
  )

  };

}

function extractIP(line) {

  const ipRegex =
    /(\d+\.\d+\.\d+\.\d+)/;

  const match =
    line.match(ipRegex);

  if (match) {
  return match[0];
}

if (
  line.includes('sudo') ||
  line.includes('pam_unix') ||
  line.includes('tty')
) {
  return '127.0.0.1';
}

return '127.0.0.1';

}

function extractUser(line) {

  const patterns = [

    /user \(([^)]+)\)/,
    /ruser=([a-zA-Z0-9_-]+)/,
    /user=([a-zA-Z0-9_-]+)/,
    /user ([a-zA-Z0-9_-]+)/,
    /for user ([a-zA-Z0-9_-]+)/,
    /for ([a-zA-Z0-9_-]+)/,
    /logname=([a-zA-Z0-9_-]+)/

  ];

  for (const pattern of patterns) {

    const match = line.match(pattern);

    if (
      match &&
      match[1] &&
      match[1] !== 'sudo' &&
      match[1] !== 'systemd'
    ) {

      return match[1];

    }

  }

  return 'unknown';

}

if (fs.existsSync(logFile)) {

  lastSize =
    fs.statSync(logFile).size;

}

chokidar.watch(logFile).on(
  'change',
  () => {

    const stats = fs.statSync(logFile);

    let start = lastSize;
    if (stats.size < lastSize) {
      start = 0;
    }

    const stream = fs.createReadStream(logFile, {
      start,
      end: stats.size
    });

    let newData = '';

    stream.on('data', (chunk) => {
      newData += chunk;
    });

    stream.on('end', async () => {

      const lines =
        newData
          .split('\n')
          .filter((line) => line);

      for (const line of lines) {

        const log =
          parseLogLine(line);

           if (!log) continue;

if (
  log.event === 'Authentication Failure'
) {

  const now = Date.now();

  const user = log.user;

  if (!failedAttempts[user]) {
    failedAttempts[user] = [];
  }

  failedAttempts[user].push(now);

  failedAttempts[user] =
    failedAttempts[user].filter(
      time => now - time < 15000
    );

  if (
    failedAttempts[user].length >= 3
  ) {

    const bruteForceLog = {

      id: Date.now(),

      event:
        'BRUTE FORCE DETECTED',

      severity: 'HIGH',

      ip:
        log.ip || '127.0.0.1',

      user,

      timestamp:
        new Date().toLocaleTimeString(
          'en-IN',
          {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
          }
        )

    };

    const bruteLog =
      new Log(bruteForceLog);

    await bruteLog.save();

    io.emit(
      'newLog',
      bruteForceLog
    );

    failedAttempts[user] = [];

    continue;

  }

}


        const newLog =
          new Log(log);

        await newLog.save();

        io.emit('newLog', log);

      }

      lastSize = stats.size;

    });

  }
);
const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});