import { AxiosRequestConfig, AxiosError } from 'axios';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export interface RequestConfig extends AxiosRequestConfig {
    mode?: string
}

export type RequestData = string | Record<string, unknown> | ArrayBuffer | ArrayBufferView | URLSearchParams | FormData;

class NuxtAxiosClient {
    client!: NuxtAxiosInstance;

    get<T = any>(url: string, config?: RequestConfig): Promise<T> {
        return this.client.$get(url, config);
    }

    post<T = any>(url: string, data?: RequestData, config?: RequestConfig): Promise<T> {
        return this.client.$post(url, data, config);
    }

    put<T = any>(url: string, data?: RequestData, config?: RequestConfig): Promise<T> {
        return this.client.$put(url, data, config);
    }

    patch<T = any>(url: string, data?: RequestData, config?: RequestConfig): Promise<T> {
        return this.client.$patch(url, data, config);
    }

    delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
        return this.client.$delete(url, config);
    }

    request<T = any>(config: RequestConfig): Promise<T> {
        return this.client.$request(config);
    }

    head<T = any>(url: string, config?: RequestConfig): Promise<T> {
        return this.client.$head(url, config);
    }

    options<T = any>(url: string, config?: RequestConfig): Promise<T> {
        return this.client.$options(url, config);
    }
}

const api = new NuxtAxiosClient();
export default api;

export function setRequestClient(client: NuxtAxiosInstance): void {
    api.client = client;
}


export type FetchResult<T> = Promise<[T|null, AxiosError|null]>;

export async function apiFetch<T>(doFunction: ()=> Promise<T>): FetchResult<T> {
    try {
        const result = await doFunction();

        return [result, null];

    } catch (error) {
        return [null, error as AxiosError];
    }
}
