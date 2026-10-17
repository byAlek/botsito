import commands from '@/commands'
import { REST, Routes } from 'discord.js'
import env from 'env'

const rest = new REST().setToken(env.DISCORD_TOKEN)

try {
  console.log(`Started refreshing ${commands.size} application (/) commands.`)

  const body = [...commands.values()].map((command) => command.data.toJSON())

  const data = (await rest.put(Routes.applicationCommands(env.APP_ID), {
    body,
  })) as unknown[]

  console.log(`Successfully reloaded ${data.length} application (/) commands.`)
} catch (error) {
  console.error(error)
}
