import { getSession } from '../../../x/storage/storage';
import { Http } from '@angular/http';
import { HttpApi } from '../../../x/http/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ServicesService {
    httpApi = new HttpApi(this.http)
    token = { token: getSession('id') }
    constructor(private http: Http) { }
    // getEventByID(id: string) {
    //     return this.httpApi.Get('api/clb/get', { id: id })
    // }
    // CreateEvent(data: any) {
    //     return this.httpApi.Post('api/event/create', { token: getSession('id') }, data);
    // }
    CreateEvent(data: any) {
        return this.httpApi.Post('api/event/create', { token: getSession('id') }, data);
    }
    getAllEvent(skip: number, limit: number, type: string) {
        return this.httpApi.Get<IEventData>('api/event/getall', { token: getSession('id'), skip: skip, limit: limit, type: type })
    }
    getEventDetail(id: string) {
        return this.httpApi.Get<IEvent>('api/event/getdetail', { id: id })
    }
    getEventByID(id:string){
        return this.httpApi.Get<IEvent>('api/event/get', { id: id })
    }
    //library
    getAllLibrary() {
        return this.httpApi.Get<ILibrary>('api/user/library', { token: getSession('id') })
    }
    //store
    getAllStore(skip: number, limit: number, type: string) {
        return this.httpApi.Get<IStoreData>('api/store/getall', { token: getSession('id'), skip: skip, limit: limit, type: type })
    }
    getStoreByCode(code: string) {
        return this.httpApi.Get<IStore>('api/store/getbycode', { token: getSession('id'), code: code })
    }
    createStore(data: any) {
        return this.httpApi.Post('api/store/create', { token: getSession('id') }, data);
    }
    createStoreExcel(file: string, userid: string) {
        return this.httpApi.Post('api/store/upload_store', { file: file, userid: userid });
    }
    updateStore(data: any, id: string) {
        return this.httpApi.Post('api/store/update', { id: id }, data);
    }
    deleteStore(id: string) {
        return this.httpApi.Get('api/store/mark_delete', { id: id })
    }
    downloadVoucher(eventid: string, store: string) {
        return this.httpApi.Get('api/event/download_voucher', { eventid: eventid, store: store })
    }
    //voucher
    getVoucherById(id: string) {
        return this.httpApi.Get<IVoucher>('api/voucher/get', { id: id })
    }
    updateVoucher(id:string,data:any){
        return this.httpApi.Post('api/voucher/update', { id: id }, data);
    }
    //report
    getGeneralReport() {
        return this.httpApi.Get('api/report/general', {token: getSession('id')})
    }
    getReportEvent(eventid:string){
        return this.httpApi.Get('api/report/event', {eventid:eventid})
    }
    getReportVoucher(eventid:string){
        return this.httpApi.Get('api/report/voucher', {eventid:eventid})
    }
}
export interface IEventData {
    count: number,
    data: IEvent
}
export interface IEvent {
    name: string,
    startdate: number,
    enddate: number,
    background: string,
    color: string,
    gift_store: IGiftStore[]
    isactive: boolean,
    customerinfor: ICustomerInfo[],
}
export interface IGiftStore {
    s_code: string,
    detail: IGift[]
}
export interface IGift {
    name: string,
    type: string,
    image: string,
    quantity: number,
}
export interface IStoreData {
    count: number,
    data: IStore
}
export interface IStore {
    user_id: string,
    name: string,
    code: string,
    address: string,
    area: string,
    hotline: string
}
export interface ICustomerInfo {
    title: string,
    value: string
}
export interface IVoucher {
    mtime: string
    dtime: string,
    eventid: string,
    eventname: string,
    giftname: string,
    gifttype: string,
    giftimage:string,
    storecode: string,
    time: number,
    customerinfor: ICustomerInfo[],
    path_img: string,
    status: number
}
export interface ILibrary {
    image: any,
    video: any,
}