import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL:'https://www.liulongbin.top:8888/api/private/v1',
        timeout:5000
    })

    //请求拦截器
    instance.interceptors.request.use(
        config =>{
            config.headers.Authorization = window.sessionStorage.getItem('token')
            return config
        },
        err => {}
    )

    //响应拦截器
    instance.interceptors.response.use(
        res => res.data,
        err => {
            console.log('-----响应拦截器--错误拦截---')
            console.log(err);
        }
    )

    return instance(config)
}