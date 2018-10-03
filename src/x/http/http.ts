import { Observable } from 'rxjs/Rx';
import { Http, Request, RequestMethod, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { configURL } from '../../environments/environment';
var baseUrl = configURL.host
export class HttpApi<T> {
    constructor(private http: Http) {
    }
    Get<T>(subUri: string, q?: any): Observable<T> {
        const request = this.makeRequest(subUri, RequestMethod.Get, q);
        return this.send(request);
    }
    Post<T>(sub: string, q?: any, body?: any) {
        const request = this.makeRequest(sub, RequestMethod.Post, q, body)
        return this.send(request)
    }
    // PostFile<T>(sub: string, q?: any, formData?: any) {
    //     const url = `${baseUrl}/${sub}`
    //     const request = this.http.post(url,formData)
    //     return this.send(request)
    // }
    protected makeRequest(subUri: string, method: RequestMethod, query?: any, body?: any) {
        const url = `${baseUrl}/${subUri}`
        const params = new URLSearchParams()
        if (query) {
            Object.keys(query).forEach(k => {
                params.set(k, query[k])
            });
        }
        return new Request({ method, url, params, body })
    }
    private send(req: Request) {
        return this.http.request(req).map(response => this.extractData(response))
            .catch((err: Response, caught: Observable<T>) => {
                console.log(err)
                return Observable.throw(this.handleError(err)); // <-----
            })
    }

    extractData(res: Response) {
        let result = res.json().data
        return result || {}
    }
    handleError(res: Response) {
        if (res.status == 0) {
            return new HttpError(res.statusText, res.status, 'error connection')
        }
        const body = res.json()
        var msg = body ? body.error : ''
        var httpError = new HttpError(res.statusText, res.status, msg)
        return httpError
    }
}

class HttpError {
    constructor(
        private statusText: string,
        private status: number,
        private message: string
    ) {

    }

}