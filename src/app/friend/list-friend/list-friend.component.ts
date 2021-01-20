import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../expenses.service';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.css']
})
export class ListFriendComponent implements OnInit {
  public friendList:any;
  public profile:any;

  constructor(public ExpensesService: ExpensesService) { }

  ngOnInit(): void {
    this.profile=this.ExpensesService.getUserInfoFromLocalstorage();

    this.ExpensesService.listFriends(this.profile.userId).subscribe((data) => {
      if(data['status']=='200')
      {
        this.friendList=data['data']
      }
   });
  }

}
