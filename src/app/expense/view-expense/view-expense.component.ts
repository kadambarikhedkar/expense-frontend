import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ExpensesService } from '../../expenses.service';
import { SocketService } from '../../socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.css']
})
export class ViewExpenseComponent implements OnInit {
  public expenseDetail:any;
  public nameArray=[];
  public userPay=[];

  public userAmount:Number
  public profile:any;
  public paidByDetail:any;
  public expenseHistory:any;
  public authToken: any;
  public disconnectedSocket: boolean;  
  constructor(public ExpensesService: ExpensesService,private _route: ActivatedRoute,public SocketService: SocketService) { }

  ngOnInit(): void {
    this.authToken = Cookie.get('authtoken');
    this.profile=this.ExpensesService.getUserInfoFromLocalstorage();

    let expenseId = this._route.snapshot.paramMap.get('expenseId');
    this.ExpensesService.getExpenseDetail(expenseId).subscribe((data) => {
      if(data['status']=='200')
      {
        this.expenseDetail=data['data'] [0]
        this.getUserDetails(this.expenseDetail.amount,this.expenseDetail.users)
        this.getPaidByDetail(this.expenseDetail.paidBy)
         this.getExpenseHistory(this.expenseDetail._id)

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

  getExpenseHistory(objectId)
  {
    this.SocketService.getExpenseHistory(objectId).subscribe((data)=>{
      if(data['status']=='200')
      {
        this.expenseHistory=data['data'];
        for(let expenseHistory of this.expenseHistory)
        {
          
          this.ExpensesService.getFriendByObjectId(expenseHistory.doneBy).subscribe((data) => {
            if(data['status']=='200')
            {
              this.nameArray.push({"action":expenseHistory.action,"time":expenseHistory.time,"doneBy":data['data'][0].firstName});
            }
           
         });

        }
      }
     })
  }

  getUserDetails(amount,users)
  {
    this.userAmount=Math.floor(amount/users.length);

    for(var i=0;i<users.length;i++)
    {

      this.ExpensesService.getFriendByObjectId(users[i]).subscribe((data) => {
        if(data['status']=='200')
        {
          if(data['data'][0]._id!=this.profile._id)
          {
            this.userPay.push({"payBy":data['data'][0].firstName,"amount":this.userAmount});
          }
          
        }
      });
    }
  }

}
