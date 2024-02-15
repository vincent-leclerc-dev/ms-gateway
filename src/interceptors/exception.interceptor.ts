import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): any {
    return handler.handle().pipe(
      catchError((err) =>
        throwError(() => {
          if (err.message.includes('duplicate')) {
            return new ConflictException();
          }
          return err;
        }),
      ),
    );
  }
}
