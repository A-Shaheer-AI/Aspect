/**
 * Cloudflare Edge Optimization & Verification Script
 * 
 * Usage:
 *   node scripts/setup-cloudflare.mjs
 * 
 * Reads CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN from environment
 * (or from .env.local).
 */

import fs from 'node:fs';
import path from 'node:path';

// Try loading .env.local if present
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
    try {
        if (typeof process.loadEnvFile === 'function') {
            process.loadEnvFile(envLocalPath);
        } else {
            const content = fs.readFileSync(envLocalPath, 'utf8');
            for (const line of content.split('\n')) {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#')) continue;
                const eqIdx = trimmed.indexOf('=');
                if (eqIdx !== -1) {
                    const key = trimmed.slice(0, eqIdx).trim();
                    const val = trimmed.slice(eqIdx + 1).trim();
                    if (!process.env[key]) {
                        process.env[key] = val.replace(/^["'](.*)["']$/, '$1');
                    }
                }
            }
        }
    } catch {
        // ignore load errors
    }
}

const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

console.log('======================================================');
console.log('  Aspect Window Cleaning - Cloudflare Setup & Verify  ');
console.log('======================================================\n');

if (!ZONE_ID || !API_TOKEN) {
    console.log('ℹ️  Environment variables not detected locally.');
    console.log('\nTo configure Cloudflare on Vercel:');
    console.log('1. Open your Vercel Dashboard -> Project: perth-glass-pro');
    console.log('2. Go to Settings -> Environment Variables');
    console.log('3. Add the following variables:');
    console.log('   - CLOUDFLARE_ZONE_ID     = (from Cloudflare domain Overview sidebar)');
    console.log('   - CLOUDFLARE_API_TOKEN   = (created in Cloudflare: My Profile -> API Tokens)');
    console.log('   - CLOUDFLARE_PURGE_SECRET = (your custom secret string for /api/cache/purge)');
    console.log('\nTo test locally, add them to .env.local and rerun:');
    console.log('   node scripts/setup-cloudflare.mjs\n');
    process.exit(0);
}

const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
};

async function verifyZone() {
    console.log(`Checking Zone ID: ${ZONE_ID}...`);
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}`, { headers });
    const data = await res.json();
    if (!res.ok || !data.success) {
        console.error('❌ Failed to verify zone with Cloudflare API:');
        console.error(JSON.stringify(data.errors || data, null, 2));
        process.exit(1);
    }

    console.log(`✅ Zone verified: ${data.result.name} (Status: ${data.result.status})`);
    return data.result;
}

async function configureSSL() {
    console.log('\nVerifying SSL/TLS encryption mode for Vercel...');
    const getRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/ssl`, { headers });
    const getData = await getRes.json();
    
    if (getData.success) {
        console.log(`Current SSL mode: "${getData.result.value}"`);
        if (getData.result.value !== 'full' && getData.result.value !== 'strict') {
            console.log('Updating SSL mode to "full" to support Vercel proxying without redirect loops...');
            const patchRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/ssl`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ value: 'full' }),
            });
            const patchData = await patchRes.json();
            if (patchData.success) {
                console.log('✅ SSL mode successfully set to "full"');
            } else {
                console.warn('⚠️ Could not update SSL mode automatically:', patchData.errors);
            }
        } else {
            console.log('✅ SSL mode is already optimal for Vercel ("full" / "strict").');
        }
    }
}

async function configureBrowserCacheTTL() {
    console.log('\nChecking Browser Cache TTL...');
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/browser_cache_ttl`, { headers });
    const data = await res.json();
    if (data.success) {
        console.log(`Current Browser Cache TTL: ${data.result.value} seconds`);
        if (data.result.value === 0) {
            console.log('Setting Browser Cache TTL to 1 year (31536000s) to match origin headers...');
            await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/settings/browser_cache_ttl`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ value: 31536000 }),
            });
            console.log('✅ Browser Cache TTL updated');
        }
    }
}

async function main() {
    try {
        await verifyZone();
        await configureSSL();
        await configureBrowserCacheTTL();
        console.log('\n======================================================');
        console.log('🎉 Cloudflare Edge Caching is ready!');
        console.log('   Any traffic to /media/* and static assets will now be');
        console.log('   cached directly at Cloudflare Edge PoPs.');
        console.log('======================================================\n');
    } catch (err) {
        console.error('Setup error:', err);
    }
}

main();
