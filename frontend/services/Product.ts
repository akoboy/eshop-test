import api, {apiFetch, FetchResult, RequestConfig} from "~/helpers/api";
import {Product} from "~/models/Product";

export class ProductService {
    static getProducts<R = Product[]>(config?: RequestConfig): FetchResult<R> {
        return apiFetch(() => api.get('products', config));
    }
}
