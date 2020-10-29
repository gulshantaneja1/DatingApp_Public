import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RolesModelComponent } from '../roles-model/roles-model.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[];
  modalRef: BsModalRef;
  items: any[];

  constructor(private adminService: AdminService,
              private alertifyService: AlertifyService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles()
  {
    this.adminService.getUsersWithRoles().subscribe((users: User[]) => {
      this.users = users;
    } , error => {
      this.alertifyService.error(error);
    });
  }

  editRolesModel(user: User)
  {
    const initialState = {
        user,
        roles: this.getRolesArray(user)
    };

    this.modalRef = this.modalService.show(RolesModelComponent , {initialState});
    this.modalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate = {
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };

      if (rolesToUpdate)
      {
        this.adminService.updateuserRoles(user,rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, error => {
          console.log(error);
        });
      }
    });
  }

  private getRolesArray(user)
  {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin' , value: 'Admin'},
      {name: 'Moderator' , value: 'Moderator'},
      {name: 'Member' , value: 'Member'},
      {name: 'VIP' , value: 'VIP'}
    ];

    for (let index = 0; index < availableRoles.length; index++) {
      let isMatch = false;
      for (let j = 0; j < userRoles.length; j++) {
        if(availableRoles[index].name === userRoles[j])        {
          isMatch = true;
          availableRoles[index].checked = true;
          roles.push(availableRoles[index]);
          break;
        }
      }

      if(!isMatch){
        availableRoles[index].checked = false;
        roles.push(availableRoles[index]);
      }
    }  
    return roles;
  }

}
