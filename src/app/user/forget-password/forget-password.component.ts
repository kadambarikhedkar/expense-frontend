import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from './../../expenses.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public email:String;

  constructor(public ExpensesService: ExpensesService,
    public router: Router,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
  }

  public goToSignIn: any = () => {

    this.router.navigate(['/login']);

  }
  public sendLink: any = () => {
    let data={
      email:this.email
    }
    if (!this.email) {
      this.toastr.warning('enter email')

    } else {
      this.ExpensesService.sendForgetPasswordLink(data)
      .subscribe((apiResponse) => {
        if (apiResponse['status']== 200) {
          this.toastr.success('Link sent successfully');      
        }
        else if (apiResponse['status']== 500) {
          this.toastr.warning('User with email id not available');      

        }
      });
    }
  }
  
}
