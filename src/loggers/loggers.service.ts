import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import pino, { type Logger } from 'pino';

const environmentRedactionPaths = [
  'env',
  'environment',
  'process.env',
  '*.env',
  '*.environment',
  ...Object.keys(process.env).map((key) => `[${JSON.stringify(key)}]`),
];

@Injectable()
export class LoggersService {
  readonly logger: Logger = pino({
    level: process.env.LOG_LEVEL ?? 'info',
    redact: {
      paths: environmentRedactionPaths,
      censor: '[REDACTED]',
    },
    ...(process.env.NODE_ENV !== 'production' && {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    }),
  });
}
