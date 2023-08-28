import { HttpAdapter } from '../common/interfaces/http-adapter.interface';
import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios;
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get(url);
      return data;
    } catch (error) {
      throw new Error('Ocurrio un error');
    }
  }
}
