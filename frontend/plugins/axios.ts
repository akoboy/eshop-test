import { Context } from '@nuxt/types';
import { setRequestClient } from '~/helpers/api';

// Состояние стора
let isAxiosInited = true;


export default function({ app, $axios }: Context): void {
    // Базовый URL
    const env = app.context.env;
    const baseUrl = `${ env.apiProtocol }://${ env.apiHost }`;

    // Сбрасываем знание об инициализации, чтобы на сервер и клиенте проходила инициализация
    isAxiosInited = false;

    $axios.setBaseURL(baseUrl);

    app.router?.afterEach(function() {
        if (!isAxiosInited) {
            isAxiosInited = true;

            setRequestClient($axios);
        }
    });
}
