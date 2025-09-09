import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        const result: any = {
          success: true,
          code: response.statusCode,
          data,
          message: [],
        };

        if (data && typeof data === 'object' && 'meta' in data) {
          result.meta = data.meta;
          delete data.meta;
        }

        if (data && typeof data === 'object' && 'message' in data) {
          result.message = data.message;
          delete data.message;
        }

        if (data && typeof data === 'object' && 'data' in data) {
          result.data = data.data;
          delete data.data;
        }

        return result;
      }),
    );
  }
}
