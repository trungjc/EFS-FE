import { Injectable } from '@angular/core'
import * as Rx from 'rxjs/Rx';
import{configURL} from '../../../environments/environment';
@Injectable()
export class WebsocketService {
    constructor() { }
    ws: WebSocket
    private subject: Rx.Subject<MessageEvent>;
    url: any
    public connect(sub): Rx.Subject<MessageEvent> {
        this.url = configURL.websocket + sub
        if (!this.subject) {
            this.subject = this.create(this.url);
        }
        return this.subject;
    }

    private create(url): Rx.Subject<MessageEvent> {
        this.ws = new WebSocket(this.url);
        let observable = Rx.Observable.create(
            (obs: Rx.Observer<MessageEvent>) => {
                this.ws.onmessage = obs.next.bind(obs);
                this.ws.onerror = obs.error.bind(obs);
                this.ws.onclose = obs.complete.bind(obs);
                return this.ws.close.bind(this.ws);
            })
        let observer = {
            next: (data: Object) => {
                if (this.ws.readyState === WebSocket.OPEN) {
                    this.ws.send(JSON.stringify(data));
                }
            }
        }
        return Rx.Subject.create(observer, observable);
    }
    public send(param: any) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(param);
        }
    }
    public checkconnect() {
        if (this.ws.readyState === WebSocket.CLOSED) {
            this.ws.close()
            return true
        } else {
            return false
        }
    }
    public reconnect(link) {
        this.subject = this.create(this.url);
        return this.subject;
    }
    public close() {

        this.ws.close()

    }
}