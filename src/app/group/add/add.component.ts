import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../expenses.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public groupName: any;
  public profile:any;
  public users:any;
  public friendList :any;
  friendArray:[] = [];
  userArr=[];

  constructor( public ExpensesService: ExpensesService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.profile=this.ExpensesService.getUserInfoFromLocalstorage();
    this.ExpensesService.listFriends(this.profile.userId).subscribe((data) => {
      if(data['status']=='200')
      {
        this.friendList=data['data']
      }
     
   }); 

  } 
      
  public addGroup: any = () => {  
    if (!this.groupName) {
      this.toastr.warning('Enter group name')
     

    } else if (this.users==undefined) {
      this.toastr.warning('select users')

    }
    else
    {
    let groupData = {
      groupName: this.groupName,
      createdBy:this.profile._id,
      users:this.users
    }
    this.ExpensesService.addGroup(groupData)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success('Group Added successfully');
        setTimeout(() => {
          this.router.navigate(['/group/list']);
        }, 2000);
  }
  });
  }
}
}
