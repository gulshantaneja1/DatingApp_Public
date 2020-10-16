import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { PaginatedResult } from '../_model/pagination';
import { Message } from '../_model/message';

@Injectable()
export class MessagesResolver implements Resolve<Message[]>
{  
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

constructor(private userService: UserService , private authService: AuthService,
            private router: Router, private alertifyService: AlertifyService){}
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,
                                           this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertifyService.error('Problem retriving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
