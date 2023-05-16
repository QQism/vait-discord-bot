import { SlashCommandSubcommandBuilder } from 'discord.js';
import { CommandHandler, Subcommand } from '../command';
import { setReminderChannel } from './server-utils';

export const data = new SlashCommandSubcommandBuilder()
  .setName('reminder-channel')
  .setDescription('ADMIN COMMAND. Set channel to send reminder messages to.')
  .addChannelOption((option) =>
    option
      .setName('channel')
      .setDescription('channel to send reminder messages to')
      .setRequired(true)
  );

export const execute: CommandHandler = async (interaction) => {
  const guildId = interaction.guildId!;
  const channel = interaction.options.getChannel('channel', true);
  const op = await setReminderChannel(guildId, channel.id);
  if (!op.success) {
    await interaction.reply(
      'Cannot save this reminder channel for this server. Please try again.'
    );
    return;
  }

  const channelId = op.data;
  await interaction.reply(
    `Sucessfully saved setting. Reminders will be broadcasted in <#${channelId}>`
  );
};

const command: Subcommand = {
  data,
  execute,
};

export default command;
