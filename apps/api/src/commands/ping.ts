import type { Command } from '@/types/discord'
import { SlashCommandBuilder } from 'discord.js'

const command: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Ponga!'),
  execute: async (interaction) => {
    await interaction.reply('Pong!')
  },
}

export default command
