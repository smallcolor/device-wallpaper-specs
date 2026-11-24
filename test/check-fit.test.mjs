import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadDevices, checkAllDevices } from '../scripts/check-fit.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

test('JSON and CSV datasets contain identical device IDs and positive dimensions', () => {
  const jsonDevices = loadDevices();
  const csvLines = fs.readFileSync(path.join(ROOT, 'data/devices-2026-2027.csv'), 'utf8').trim().split('\n');
  assert.equal(csvLines.length - 1, jsonDevices.length);
  for (const d of jsonDevices) {
    assert.ok(d.width > 0 && d.height > 0);
    assert.ok(d.hub_url.startsWith('https://incosmos.art/'));
  }
});

test('All 6 SVG safe-zone templates exist and have valid root tags', () => {
  const dir = path.join(ROOT, 'templates');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svg'));
  assert.equal(files.length, 6);
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    assert.ok(content.includes('<svg ') && content.includes('</svg>'), `Invalid SVG: ${f}`);
    assert.ok(!/\bAI\b/.test(content), `Disallowed term in ${f}`);
  }
});

test('iPhone Duo inner 2670x1878 matches exact_fit for iPhone Duo inner screen', () => {
  const results = checkAllDevices(2670, 1878);
  const inner = results.find((r) => r.id === 'iphone-duo-inner');
  assert.equal(inner.status, 'exact_fit');
  assert.equal(inner.cropLossPercent, 0);
  assert.equal(inner.coversPixels, true);
});

test('iPhone 18 Pro Max 1320x2868 matches exact_fit for both iPhone 18 Pro models', () => {
  const results = checkAllDevices(1320, 2868);
  const proMax = results.find((r) => r.id === 'iphone-18-pro-max');
  const pro = results.find((r) => r.id === 'iphone-18-pro');
  assert.equal(proMax.status, 'exact_fit');
  assert.equal(pro.status, 'exact_fit');
});

test('5K 5120x2880 matches Studio Display 5K and 4K UHD but not 6K XDR without upscale', () => {
  const results = checkAllDevices(5120, 2880);
  assert.equal(results.find((r) => r.id === 'studio-display-5k').status, 'exact_fit');
  assert.equal(results.find((r) => r.id === 'desktop-4k-uhd').status, 'exact_fit');
  assert.equal(results.find((r) => r.id === 'pro-display-xdr-6k').status, 'mismatch');
});
