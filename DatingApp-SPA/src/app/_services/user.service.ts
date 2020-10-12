import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_model/user';
import {PaginatedResult} from '../_model/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null)
    {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    
    if (userParams != null)
    {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe ( 
      map(response => {
              paginatedResult.result = response.body;

              if (response.headers.get('Pagination') != null)
        {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

      //   const keys = response.headers.keys();
      //   let headers = keys.map(key => {
      //     console.log(key);
      //     console.log(response.headers.get(key));
      //  });       
        return paginatedResult;
      })
    );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }


  setMainPhoto(userId: number , id: number)
  {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id +  '/setMain', id);
  }

  deletePhoto(userId: number, id: number)
{
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}

}
