import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_model/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User;
  @Output() cancelRegister = new EventEmitter();
  registrationForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertifyService: AlertifyService ,
             private fb: FormBuilder, private router: Router) {}

  ngOnInit() {

    this.bsConfig = {
      containerClass: 'theme-red'
    },
  

    this.createRegistrationForm();

  }

  createRegistrationForm()
  {
    this.registrationForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['',Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]

    }, { validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup)
  {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true};
  }

  register() {

    if (this.registrationForm.valid)
    {
      this.user = Object.assign({} , this.registrationForm.value);

      this.authService.register(this.user).subscribe( () => {
        this.alertifyService.success('Registration successfull');
      }, error => {
        this.alertifyService.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
    // this.authService.register(this.model).subscribe(
    //   () => {
    //     this.alertifyService.success('Registration successfull');
    //   },
    //   (error) => {
    //     this.alertifyService.error(error);
    //   }
    // );
    console.log(this.registrationForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
