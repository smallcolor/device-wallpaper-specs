#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DATA_PATH = path.resolve(__dirname, '../data/devices-2026-2027.json');

export function loadDevices(dataPath = DEFAULT_DATA_PATH) {
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw).devices;
}

/**
 * Compute crop loss when fitting an image (imgW x imgH) onto a target screen (scrW x scrH)
 * using cover-scaling (no upscaling allowed for exact_fit/compatible unless allowUpscale=true).
 */
export function evaluateFit(imgW, imgH, screen, { allowUpscale = false } = {}) {
  if (!(imgW > 0 && imgH > 0)) {
    throw new Error(`Invalid image dimensions: ${imgW}x${imgH}`);
  }
  const scrW = screen.width;
  const scrH = screen.height;
  const imgRatio = imgW / imgH;
  const scrRatio = scrW / scrH;

  const keptRatio = Math.min(imgRatio, scrRatio) / Math.max(imgRatio, scrRatio);
  const cropLoss = 1 - keptRatio;
  const coversPixels = imgW >= scrW && imgH >= scrH;

  let status = 'mismatch';
  if (coversPixels || allowUpscale) {
    if (cropLoss <= 0.10) status = 'exact_fit';
    else if (cropLoss <= 0.22) status = 'compatible';
  }

  return {
    id: screen.id,
    device: screen.device,
    screen: screen.screen,
    target: `${scrW}x${scrH}`,
    coversPixels,
    cropLossPercent: Number((cropLoss * 100).toFixed(2)),
    status,
    hub_url: screen.hub_url
  };
}

export function checkAllDevices(imgW, imgH, options = {}) {
  const devices = loadDevices(options.dataPath);
  return devices.map((d) => evaluateFit(imgW, imgH, d, options));
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--width' || a === '-w') out.width = Number(argv[++i]);
    else if (a === '--height' || a === '-h') out.height = Number(argv[++i]);
    else if (a === '--allow-upscale') out.allowUpscale = true;
    else if (a === '--json') out.json = true;
  }
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  if (!args.width || !args.height) {
    console.error('Usage: node scripts/check-fit.mjs --width <W> --height <H> [--allow-upscale] [--json]');
    process.exit(1);
  }
  const results = checkAllDevices(args.width, args.height, { allowUpscale: Boolean(args.allowUpscale) });
  if (args.json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    const matching = results.filter((r) => r.status !== 'mismatch');
    console.log(`Image: ${args.width}x${args.height} | Compatible screens: ${matching.length}/${results.length}`);
    for (const r of results) {
      console.log(`- [${r.status.padEnd(10)}] ${r.device} — ${r.screen} (${r.target}) | crop=${r.cropLossPercent}% | covers=${r.coversPixels}`);
    }
  }
}
