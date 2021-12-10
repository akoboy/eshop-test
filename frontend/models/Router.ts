import { Route as VueRoute, Location } from 'vue-router';

type Dictionary<T> = { [key: string]: T };

export interface RouterLocation extends Location {}

export interface Route extends Omit<VueRoute, 'query' | 'params'> {
    query: Dictionary<string | number | (string | number)[] | null | undefined>;
    params: Dictionary<string>;
}
