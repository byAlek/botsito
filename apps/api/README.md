# TheBot API

Discord bot that renders osu! replays using danser.

## Features

- Upload osu! replay files (.osr) via Discord
- Automatic video rendering using danser
- Beatmap download if not found locally
- Video served via Tailscale Funnel

## Requirements

- **Bun** - Runtime and package manager
- **Discord Bot** - Application ID, token, and public key
- **Tailscale** - For serving rendered videos publicly

## Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Download danser:

   ```bash
   bun run download-danser
   ```

3. Configure environment variables in `.env`:

   ```env
   APP_ID=your_discord_application_id
   DISCORD_TOKEN=your_bot_token
   PUBLIC_KEY=your_public_key
   PORT=3000
   PUBLIC_FUNNEL_URL=https://your-tailscale-funnel-url
   MIRROR_DOWNLOAD_ENDPOINT=https://osu-mirror.example.com/d
   MIRROR_SEARCH_ENDPOINT=https://osu-mirror.example.com/api
   OSU_SONGS_PATH=/path/to/osu/Songs
   ```

4. Deploy Discord commands:

   ```bash
   bun run deploy-commands
   ```

5. Start the bot:

   ```bash
   bun run dev
   ```

6. Start Tailscale Funnel (in a separate terminal):
   ```bash
   tailscale funnel 3000
   ```

## Usage

Use the `/replay` command in Discord and attach an osu! replay file (.osr). The bot will render it and return a video URL.
