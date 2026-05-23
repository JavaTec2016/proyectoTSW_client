import type { data } from "react-router-dom"

type paramsObject = {
    [k in string]: string | number | null
}

class API {

    //direccion

    static ROOT = 'https://proyectotsw.onrender.com'
    static API_URL = '/colectas/api/'
    static API_VERSION = 'v1/'
    
    //endpoints
    
    static CATEGORIAS = 'categorias/'
    static CORPORACONES = 'corporaciones/'
    static EVENTOS = 'eventos/'

    static REGISTRAR = 'auth/registrar/'
    static LOGIN = 'auth/login/'
    static LOGOUT = 'auth/logout/'
    static REFRESH = 'auth/refresh/'

    static endpoints = new Set<string>()
    static auth = true;
     static accessToken:string | null = '';

    static init(){
        this.endpoints
        .add(this.CATEGORIAS)
        .add(this.CORPORACONES)
        .add(this.EVENTOS)

        .add(this.LOGIN)
        .add(this.LOGOUT)
        .add(this.REFRESH)
        .add(this.REGISTRAR)
    }
    static setAuth(state:boolean){
        this.auth = state;
    }
    /**
     * 
     * @param params objeto con parametros de url
     * @returns string convertido
     */
    static __getParams(params:paramsObject){
        const pairs:string[] = [];
        for(const param in params){
            pairs.push(param+'='+params[param])
        }
        return pairs.join('&');
    }
    static concat(endpoint:string){
        return this.ROOT+this.API_URL+this.API_VERSION+endpoint;
    }
    private static getUrl(url:string, params:{} | null = null){
        let urlFinal = url;
        if(this.endpoints.has(urlFinal)){
            urlFinal = this.concat(urlFinal);
        }
        if(params != null){
            urlFinal += '?'+this.__getParams(params)
        }
        return urlFinal;
    }
    /**
     * Metodo base para requests
     * @param url URL final a fetchear
     * @param method metodo
     * @param body cuerpo (no poner con GETs)
     * @param auth habilitar autenticacion (si)
     * @returns objeto con los datos del response, o datos del error si truena
     */
    static async request(url:string, method:'POST'|'GET'|'PUT'|'DELETE'|'HEAD', body?:{[x:string]:any} | null, auth = this.auth):Promise<{[x:string]:any, data?:any, headers:Headers, error?:{detail:string, code:string}, status?:number|200}>{
        
        let headers:{[x:string]:string} = {'Content-Type':'application/json'}
        if(auth){ //saca el token de algun lado
            headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        const fetchObject:RequestInit = {
            method: method,
            headers: headers,
            credentials: 'include',
        }
        if(method != 'GET' && method != 'HEAD') fetchObject['body'] = JSON.stringify(body);
        const response = await fetch(url, fetchObject);
        if(!response.ok){
            let res = {error: await response.json(), status:response.status, headers:response.headers};
            return res;
        }
        if((await response.clone().text()).length == 0) return{ data: {}, headers:response.headers}
        return {data: await response.json(), headers:response.headers};
    }

    static async post(url:string, body:{[x:string]:any}){
        let urlFinal = this.getUrl(url);
        return await this.request(urlFinal, 'POST', body);
    }
    /**
     * GET a una url
     * @param url url
     * @param params parametros
     */
    static async get(url:string, params:{} | null){
        let urlFinal = this.getUrl(url, params);
        return await this.request(urlFinal, 'GET')
    }
    static async delete(url:string, idValue:any){
        let urlFinal = this.getUrl(url)+idValue+'/';
        return await this.request(urlFinal, 'DELETE')
    }
    static async getDetail(url:string, idValue:any){
        let urlFinal = this.getUrl(url)+idValue+'/';
        return await this.request(urlFinal, 'GET')
        
    }
    static async update(url:string, idValue:any, body:{}){
        let urlFinal = this.getUrl(url)+idValue+'/';
        return this.request(urlFinal, 'PUT', body);
    }
    

    ///============AUTENTICACION
    static access(token:string){
        this.accessToken = token;
        return this;
    }
    static async register(body:{username:string, password:string}){
        let urlFinal = this.getUrl(this.REGISTRAR);
        return await this.request(urlFinal, 'POST', body, false);
    }
    static async login(body:{username:string, password:string}){
        let urlFinal = this.getUrl(this.LOGIN);
        const res = await this.request(urlFinal, 'POST', body);
        console.log(res.headers);
        return res;
    }
    static async logout(){
        let urlFinal = this.getUrl(this.LOGOUT);
        return await this.request(urlFinal, 'POST', {});
    }
    static async refresh(){
        let urlFinal = this.getUrl(this.REFRESH);
        return await this.request(urlFinal, 'POST', {});
    }
}
API.init()
export default API;