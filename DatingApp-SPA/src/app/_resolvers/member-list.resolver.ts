import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {User} from '../_model/user';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { PaginatedResult } from '../_model/pagination';

@Injectable()
export class MemberListResolver implements Resolve<PaginatedResult<User[]>>
{
    pageNumber = 1;
    pageSize = 5;

constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService){}
    resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertifyService.error('Problem retriving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
