const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Cloudflare Public Tunnel for PMT Gunny Master...');

const cloudflared = spawn(path.join(__dirname, '..', 'cloudflared.exe'), ['tunnel', '--url', 'http://localhost:8080']);

cloudflared.stderr.on('data', (data) => {
  const text = data.toString();
  const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
  if (match) {
    const publicUrl = match[0];
    console.log('\n======================================================');
    console.log('🎉 CLOUDFLARE PUBLIC TUNNEL IS LIVE (NO PASSWORD!):');
    console.log('🔗 URL:', publicUrl);
    console.log('======================================================\n');
    fs.writeFileSync(path.join(__dirname, '..', 'PUBLIC_URL.txt'), publicUrl, 'utf8');
  }
});

cloudflared.on('close', (code) => {
  console.log(`Tunnel process exited with code ${code}`);
});
