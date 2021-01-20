import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../expenses.service';
import { SocketService } from '../socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profile:any;
  firstName:String;
  lastName:String;
  public authToken: any;
  public disconnectedSocket: boolean;  

  constructor(private expensesService:ExpensesService,     
    public router: Router,
    public SocketService: SocketService,
    private toastr: ToastrService

    ) { }

  ngOnInit(): void {
    this.profile=this.expensesService.getUserInfoFromLocalstorage();
  }

    public logout: any = () => {

      this.expensesService.logout(this.profile.userId)
        .subscribe((apiResponse) => {
  
          if (apiResponse.status === 200) {
            console.log("logout called")
            Cookie.delete('authtoken');

            this.SocketService.exitSocket()
  
            this.router.navigate(['/']);
  
          } else {
            this.toastr.error(apiResponse.message)
  
          } 
  
        }, (err) => {
          this.toastr.error('some error occured')
  
  
        });
  
    }
  
}