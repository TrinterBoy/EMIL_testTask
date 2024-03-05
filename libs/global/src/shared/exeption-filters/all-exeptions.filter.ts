import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any | void {
    const ctx = host.switchToHttp();
    const response = host.switchToHttp().getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message = exception.response?.message ?? exception.messages;
    Logger.error(exception);
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      message = 'Internal server error';
    }
    response.status(status).send({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
