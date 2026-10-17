import type { Command } from '@/types/discord'
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'

const command: Command = {
  data: new SlashCommandBuilder().setName('info').setDescription('Shows bot information'),
  execute: async (interaction) => {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle('Bot Information')
      .setDescription('This is a Discord bot built with discord.js and Express')
      .addFields(
        { name: 'Version', value: '1.0.0' },
        { name: 'Library', value: 'discord.js v14' },
        { name: 'API', value: 'Express' }
      )
      .setTimestamp()

    await interaction.reply({ embeds: [embed] })
  },
}

export default command
