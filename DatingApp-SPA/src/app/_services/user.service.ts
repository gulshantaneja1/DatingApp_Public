import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_model/user';
import {PaginatedResult, Pagination} from '../_model/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_model/Message';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient ) {}

  getUsers(page?, itemsPerPage?, userParams? , likesParam?): Observable<PaginatedResult<User[]>> {

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

    if(likesParam != null && likesParam === 'Likers')
    {
      params = params.append('likers' , 'true');
    }

    if (likesParam != null && likesParam === 'Likees')
    {
      params = params.append('likees' , 'true');
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

sendLike(id: number , recipientId: number)
{
  return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {} );
}



getMessages(id: number, page?, itemsPerPage? , messageContainer?)
{
  const paginationResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
  let params = new HttpParams();

  params =  params.append('MessageContainer' , messageContainer);

  if (page != null && itemsPerPage != null)
  {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }


  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {observe: 'response' , params})
  .pipe(
    map(response => {
      paginationResult.result = response.body;
      if (response.headers.get('Pagination') !== null) {
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginationResult;
    })
  );
}






getMessageThread(id: number, recipientId: number)
{

  console.log(this.baseUrl  + 'users/' + id + '/messages/thread/' + recipientId);

  return this.http.get<Message[]>(this.baseUrl  + 'users/' + id + '/messages/thread/' + recipientId);
}

sendMessage(id: number , message: Message)
{
  return this.http.post(this.baseUrl + 'users/' + id + '/messages' , message);

}


deleteMessage(id: number, userId: number)
{
  return this.http.post(this.baseUrl + 'users/' +  userId + '/messages/' + id , {});
}


markAsRead(userId: number, messageId: number)
{
  this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read' , {}).subscribe();

}

}
