import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_model/user';
import {BsModalRef} from '../../../../node_modules/ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-model',
  templateUrl: './roles-model.component.html',
  styleUrls: ['./roles-model.component.css']
})
export class RolesModelComponent implements OnInit {

  @Output() updateSelectedRoles = new EventEmitter();
  
  user: User;
  roles: any[];

  

  title: string;
  closeBtnName: string;
  // list: any[] = [];

  constructor(public bsModelRef: BsModalRef) { }

  ngOnInit(): void {
  }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModelRef.hide();
  }

}
