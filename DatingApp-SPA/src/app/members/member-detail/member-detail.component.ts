import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

import {User} from '../../_model/user';
import {UserService} from '../../_services/user.service';
import {AlertifyService} from '../../_services/alertify.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';



@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;


  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true; 
    });

    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        imagePercent: 70,
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '80%',
        height: '500px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  // loadUser()
  // {
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

  getImages()
  {
    const imageUrls = [];

    for (const photo of this.user.photos) {
      imageUrls.push({
      small: photo.url,
      medium: photo.url,
      big: photo.url,
      description: photo.description
      });
    }
      return imageUrls;
  }

  selectTab(tabId: number)
  {
    this.memberTabs.tabs[tabId].active = true;
  }
}
