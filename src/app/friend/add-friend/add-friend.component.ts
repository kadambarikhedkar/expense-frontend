import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../expenses.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  public emailId: any;
  public friendName:any;
  public profile:any;
  public users:[]
  constructor(public ExpensesService: ExpensesService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.profile=this.ExpensesService.getUserInfoFromLocalstorage();

  }

  public addUser: any = () => {
    if (!this.friendName) {
      this.toastr.warning('Enter name')
     

    } else if (!this.emailId) {
      this.toastr.warning('enter emailId')

    }
    else
    {
    let UserData = {
      firstName:this.friendName,
      emailId: this.emailId,
      createdBy:this.profile.userId
    }
    this.ExpensesService.inviteUser(UserData)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success('Friend Added successfully');
        setTimeout(() => {
          this.router.navigate(['/friend/list']);
        }, 2000);
  }
  });
}

}
}