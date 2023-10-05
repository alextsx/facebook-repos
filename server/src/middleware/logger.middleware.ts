import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createLogger, format, transports, Logger } from 'winston';

const logBasedOnStatusCode = (
  logger: Logger,
  message: string,
  statusCode: number,
) => {
  if (statusCode >= 500) {
    logger.error(message);
  } else if (statusCode >= 400) {
    logger.warn(message);
  } else {
    logger.info(message);
  }
};

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [new transports.Console()],
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, headers } = req;
    this.logger.info({
      message: 'Request received',
      method,
      originalUrl,
      body,
      headers,
    });

    res.on('finish', () => {
      const headers = res.getHeaders();
      const { statusCode } = res;
      const message = {
        headers,
        statusCode,
      };

      logBasedOnStatusCode(this.logger, JSON.stringify(message), statusCode);
    });

    next();
  }
}
