import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) {
}

  getUsersWithRoles(){
    return this.http.get(this.baseUrl + 'admin/usersWithRoles');
  }


  updateuserRoles(user: User, roles: {})
  {
    return this.http.post(this.baseUrl + 'admin/editRoles/' + user.userName, roles);
  }

  getphotosForApproval()
  {
    return this.http.get(this.baseUrl + 'admin/photosForModeration');
  }

  approvePhoto(photoId)
  {
    return this.http.post(this.baseUrl + 'admin/approvePhoto/' + photoId, {});
  }

  rejectPhoto(photoId) {
    return this.http.post(this.baseUrl + 'admin/rejectPhoto/' + photoId,{});
  }

}
