import type { Command } from '@/types/discord'
import { SlashCommandBuilder } from 'discord.js'

const command: Command = {
  data: new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.'),
  execute: async (interaction) => {
    await interaction.reply(`This command was run by ${interaction.user.username} (ID: ${interaction.user.id}).`)
  },
}

export default command
