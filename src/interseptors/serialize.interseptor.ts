import {
  NestInterceptor,
  UseInterceptors,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(UserDto, data, {
            excludeExtraneousValues: true,
        });
      }),
    );
  }
}
