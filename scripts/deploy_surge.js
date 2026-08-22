const https = require('https');
const { execSync } = require('child_process');

// Generate a random deployment token for surge
const email = `pmt.gunny.${Date.now()}@gmail.com`;
const password = `GunnyMaster@${Date.now()}`;

console.log('Registering free Surge account for instant passwordless deployment...');

const data = JSON.stringify({ email, password });

const req = https.request({
  hostname: 'surge.surge.sh',
  path: '/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(body);
      if (parsed.token) {
        console.log('Surge token acquired! Deploying to pmt-gunny.surge.sh...');
        process.env.SURGE_LOGIN = email;
        process.env.SURGE_TOKEN = parsed.token;
        execSync(`npx -y surge . pmt-gunny.surge.sh --token ${parsed.token}`, { stdio: 'inherit' });
        console.log('SUCCESS! Deployed to https://pmt-gunny.surge.sh');
      } else {
        console.log('Surge response:', body);
      }
    } catch (e) {
      console.error('Error:', e.message, body);
    }
  });
});

req.on('error', (e) => console.error('Req error:', e));
req.write(data);
req.end();
