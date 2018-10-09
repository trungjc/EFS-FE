import { getItem, getSession, removeSession, setSession } from '../x/storage/storage';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServicesService } from './core/shared/services.service';
import { FunctionService } from './core/shared/function-services';
declare var toastr: any
declare var $:any
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ServicesService,FunctionService]
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';
    /**
     *
     */
    constructor(
    ) {

    }
    public ngOnInit(): void {
        //common function run
        // toastr.options = {
        //     "closeButton": false,
        //     "debug": false,
        //     "newestOnTop": false,
        //     "progressBar": false,
        //     "positionClass": "toast-top-right",
        //     "preventDuplicates": false,
        //     "onclick": null,
        //     "showDuration": "300",
        //     "hideDuration": "1000",
        //     "timeOut": "6000",
        //     "extendedTimeOut": "1000",
        //     "showEasing": "swing",
        //     "hideEasing": "linear",
        //     "showMethod": "fadeIn",
        //     "hideMethod": "fadeOut"
        // }
        //toastr style
        // ---toastr.success('Lưu thành công');
        // ---toastr.error(this.message);
        // ---toastr.warning('Password không chứa các kí tự đặc biệt');        
        localStorage.setItem('userToken', getSession('id'))
    }

    public ngOnDestroy(): void {
        // console.log(getItem('user'))
        // removeSession()
    }
}