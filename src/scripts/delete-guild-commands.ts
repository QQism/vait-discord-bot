import { Result } from 'oxide.ts';
import { deployGuildCommands } from '../commands/deploy-command';
import { loadEnv } from '../utils/loadEnv';
import { logger } from '../utils/logger';

const deploy = async () => {
  loadEnv();
  const token = process.env.TOKEN ?? '';
  const clientId = process.env.CLIENT_ID ?? '';
  const guildId = process.env.GUILD_ID ?? '';

  const op = await Result.safe(
    deployGuildCommands([], [], {
      token,
      clientId,
      guildId,
    })
  );
  if (op.isOk()) {
    logger.info('Guild commands deleted successfully');
    process.exit(0);
  }

  logger.error('Cannot delete guild commands', op.unwrapErr());
  process.exit(1);
};

deploy();
