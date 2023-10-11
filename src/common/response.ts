import { HttpException } from '@nestjs/common';

export interface ApiResponseInterface<T> {
  success: boolean;
  message: string;
  data?: T;
}

export class ApiResponse extends HttpException {
  constructor(response: ApiResponseInterface<any>, status: number) {
    super({ response }, status || 500);
  }
}
