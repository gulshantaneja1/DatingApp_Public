import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Message } from 'src/app/_model/Message';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService, private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }


  loadMessages()
  {
    const currentUserID = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
        .pipe(
          tap(messages =>
            {
              for (let i = 0; i  < messages.length; i++)
              {
                if ( messages[i].isRead === false && messages[i].recipientId === currentUserID)
                {
                  this.userService.markAsRead(currentUserID , messages[i].id);

                }
              }
            })
        )
        .subscribe( messages => {
        this.messages = messages;
    },
    error =>
    {
        this.alertifyService.error(error);
    });
  }

  sendMessage()
  {

    this.newMessage.recipientid = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) =>
      {
        this.messages.unshift(message);
        this.newMessage.content = '';

      }, error => {
        this.alertifyService.error(error);
      });


  }

}
