import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';

import { SigninComponent } from './signin/signin.component';
@NgModule({
    imports: [
        AuthRoutingModule,
        FormsModule,
        CommonModule
    ],
    exports: [],
    declarations: [SigninComponent],
    providers: [
        AuthService,
    ],
})
export class AuthModule { }
