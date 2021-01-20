import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ExpensesService } from '../../expenses.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  groupDetail:any;
  listExpenses:any;
  public paidByDetail:any;


  constructor(public ExpensesService: ExpensesService,private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let groupId = this._route.snapshot.paramMap.get('groupId');
    this.ExpensesService.getGroupDetail(groupId).subscribe((data) => {
      if(data['status']=='200')
      {
        this.groupDetail=data['data'] [0]
       this.getExpensesForGroup(groupId)


      }
     
   });
  }
  getExpensesForGroup(groupId)
  {
    this.ExpensesService.getExpensesForGroup(groupId).subscribe((data) => {
      if(data['status']=='200')
      {
        this.listExpenses=data['data']
        for(let expense of this.listExpenses)
        {
          this.getPaidByDetail(expense.paidBy)

        }

      }
     
   });
  }
  getPaidByDetail(paidById)
  {
    this.ExpensesService.getFriendByObjectId(paidById).subscribe((data) => {
      if(data['status']=='200')
      {
        this.paidByDetail=data['data'][0]
      }
     
   });
  }

}
