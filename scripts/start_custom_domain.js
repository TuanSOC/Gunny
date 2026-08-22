const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting custom subdomain tunnel: tutorial-gunny-pmt...');

// Launch localtunnel with custom subdomain
const lt = spawn('npx', ['-y', 'localtunnel', '--port', '8080', '--subdomain', 'tutorial-gunny-pmt'], { shell: true });

lt.stdout.on('data', (data) => {
  const text = data.toString();
  console.log('Localtunnel output:', text);
  const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.loca\.lt/);
  if (match) {
    console.log('\n======================================================');
    console.log('🎉 CUSTOM DOMAIN IS LIVE:');
    console.log('🔗 URL:', match[0]);
    console.log('======================================================\n');
    fs.writeFileSync(path.join(__dirname, '..', 'CUSTOM_DOMAIN_URL.txt'), match[0], 'utf8');
  }
});

lt.stderr.on('data', (data) => {
  console.error('Localtunnel err:', data.toString());
});
