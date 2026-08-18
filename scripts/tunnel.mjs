import { startTunnel } from 'untun';

async function main() {
  console.log('Starting Cloudflare Tunnel to http://localhost:3000...');
  try {
    const tunnel = await startTunnel({ url: 'http://localhost:3000' });
    const url = await tunnel.getURL();
    console.log('==============================================');
    console.log(`CLOUDFLARE_TUNNEL_URL: ${url}`);
    console.log('==============================================');
  } catch (err) {
    console.error('Tunnel error:', err);
  }
}

main();
