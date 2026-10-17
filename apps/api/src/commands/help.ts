import type { Command } from '@/types/discord'
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'

const command: Command = {
  data: new SlashCommandBuilder().setName('help').setDescription('Shows available commands'),
  execute: async (interaction) => {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('Available Commands')
      .setDescription('Here are the available commands:')
      .addFields(
        { name: '/ping', value: 'Replies with Pong!' },
        { name: '/server', value: 'Provides information about the server' },
        { name: '/user', value: 'Provides information about the user' },
        { name: '/info', value: 'Shows bot information' }
      )
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  },
}

export default command
