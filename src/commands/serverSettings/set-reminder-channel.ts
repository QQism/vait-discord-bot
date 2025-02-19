import { SlashCommandSubcommandBuilder } from 'discord.js';
import { Result } from 'oxide.ts';
import { logger } from '../../utils/logger';
import { CommandHandler, Subcommand } from '../builder';
import { setReminderChannel } from './server-utils';

export const data = new SlashCommandSubcommandBuilder()
  .setName('reminder-channel')
  .setDescription('ADMIN COMMAND. Set channel to send reminder messages to.')
  .addChannelOption((option) => option.setName('channel').setDescription('channel to send reminder messages to').setRequired(true));

export const execute: CommandHandler = async (interaction) => {
  const guildId = interaction.guildId!;
  const channel = interaction.options.getChannel('channel', true);
  logger.info(`[set-reminder-channel]: ${interaction.member!.user.username} is setting reminder channel to ${channel.name}`);
  const op = await Result.safe(setReminderChannel(guildId, channel.id));
  if (op.isErr()) {
    logger.info(`[set-reminder-channel]: ${interaction.member!.user.username} failed to set reminder channel to ${channel.name}`);
    await interaction.reply('Cannot save this reminder channel for this server. Please try again.');
    return;
  }

  const channelId = op.unwrap();
  logger.info(`[set-reminder-channel]: ${interaction.member!.user.username} successfully set reminder channel to ${channel.name}`);
  await interaction.reply(`Sucessfully saved setting. Reminders will be broadcasted in <#${channelId}>`);
};

const command: Subcommand = {
  data,
  execute,
};

export default command;
