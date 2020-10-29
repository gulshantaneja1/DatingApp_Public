import { Component, OnInit } from '@angular/core';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {

  photos: any;

  constructor(private admimService: AdminService) { }

  ngOnInit(){
    this.getPhotosForApproval();
  }

  getPhotosForApproval()
  {
    this.admimService.getphotosForApproval().subscribe((photos) =>
    {
      this.photos = photos;
    }, error => {
      console.log(error);
    });
  }

  approvePhoto(photoId) {
    this.admimService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    }, error => {
      console.log(error);
    });
  }

  rejectPhoto(photoID)
  {
    this.admimService.rejectPhoto(photoID).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoID), 1);
    }, error => {
      console.log(error);
    });
  }
}
