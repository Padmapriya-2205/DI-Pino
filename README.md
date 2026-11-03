# NestJS Pino logging with dependency injection

This NestJS project provides one shared [Pino](https://getpino.io/) logger through Nest dependency injection. The logger is configured in the `loggers` resource and consumed by the `customers` and `users` services.

## Setup

```bash
npm install
```

Create a local `.env` file in the project root:

```dotenv
NODE_ENV=development
LOG_LEVEL=trace
PORT=3000
```

The `.env` file is git-ignored. `dotenv` loads it when the logger service is imported. `LOG_LEVEL` controls the minimum emitted level: use `trace` to see every example level, or `info` for the default level. `PORT` selects the HTTP port.

## Run

```bash
# Start in watch mode
npm run start:dev

# Run normally
npm run start
```

## Shared logger

`LoggersModule` provides and exports `LoggersService`. Import that module in any feature module that needs logging, then inject `LoggersService` into its service:

```ts
constructor(private readonly loggersService: LoggersService) {}

logSomething(): void {
  this.loggersService.logger.info(
    { resource: 'customers' },
    'Customer action completed',
  );
}
```

Pino's logger supports `trace`, `debug`, `info`, `warn`, `error`, and `fatal` methods. The example methods in the customer and user services demonstrate all six levels.

## Pretty output and redaction

Outside production, logs use `pino-pretty` with colors and readable timestamps. When `NODE_ENV=production`, the pretty transport is disabled and Pino emits JSON.

The logger redacts `env` and `environment` objects, as well as top-level properties whose names match environment variables present when the logger is initialized. Redacted values are replaced with `[REDACTED]`. The customer and user examples log environment data to demonstrate this behavior.

Redaction is not a substitute for avoiding sensitive data in logs. It cannot recognize a secret that is copied into an arbitrary property name; do not log credentials or tokens.

## Example endpoints

The example routes trigger logs through the injected shared logger:

- `GET /customers`
- `GET /users`

## Tests and checks

```bash
npm test
npm run lint
npm run build
```
