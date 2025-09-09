import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HandleExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { statusCode, message, timestamp } = this.formatErrors(exception);

    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      timestamp,
    });
  }

  private formatErrors(exception: any) {
    let message = 'Internal server error';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const timestamp = new Date().toISOString();

    if (!exception) return { statusCode, message, timestamp };

    switch (true) {
      case exception instanceof HttpException:
        const response = exception.getResponse();
        message =
          typeof response === 'string'
            ? response
            : (response as any).message || 'Error occurred';
        statusCode = exception.getStatus();
        break;

      case exception instanceof UnauthorizedException:
        message = exception.message || 'Unauthorized';
        statusCode = exception.getStatus();
        break;

      default:
        message = exception.message || 'Internal server error';
        break;
    }

    return { statusCode, message, timestamp };
  }
}
