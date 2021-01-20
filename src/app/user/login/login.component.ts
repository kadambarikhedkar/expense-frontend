import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from './../../expenses.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  constructor(
    public ExpensesService: ExpensesService,
    public router: Router,
    private toastr: ToastrService  ) {


  }

  ngOnInit() {
  }

  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  }

  public signinFunction: any = () => {

    if (!this.email) {
      this.toastr.warning('enter email')


    } else if (!this.password) {

      this.toastr.warning('enter password')


    } else {

      let data = {
        email: this.email,
        password: this.password
      }

      this.ExpensesService.signinFunction(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status === 200) {
            Cookie.set('authtoken', apiResponse.data.authToken);

             this.ExpensesService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
            
             this.router.navigate(['/dashboard']);

          } else {

            this.toastr.error(apiResponse.message)
          

          }

        }, (err) => {
          this.toastr.error('some error occured')

        });

    }

  } 

  

  

}