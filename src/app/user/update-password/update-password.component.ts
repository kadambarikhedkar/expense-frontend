import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../expenses.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
emailId:String;
newPassword:String;
  constructor(private expensesService:ExpensesService,private _route: ActivatedRoute,public router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.emailId = this._route.snapshot.paramMap.get('email');
  }

  updatePassword()
  {
    let data= {
      email:this.emailId,
      password: this.newPassword,
    }
    this.expensesService.updatePassword(data).subscribe((data) => {
      if(data['status']=='200')
      {
        this.toastr.success(data['message'])
        this.router.navigate(['/login']);



      }
     
   });
  }
  goToLogin()
  {
    this.router.navigate(['/login']);
  }

}
