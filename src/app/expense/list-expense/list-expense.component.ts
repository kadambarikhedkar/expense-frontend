import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../expenses.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css']
})
export class ListExpenseComponent implements OnInit {
  public expenseList:any;
  public paidByDetail:any;
    public profile:any;
    public emailArr=[];
    public friendArr: any;

  constructor( public ExpensesService: ExpensesService, private toastr: ToastrService,
    public router: Router) { }

  ngOnInit(): void {
    this.profile=this.ExpensesService.getUserInfoFromLocalstorage();

   this.ExpensesService.listExpense(this.profile._id).subscribe((data) => {
      if(data['status']=='200')
      {
        this.expenseList=data['data'] 
        for(let expense of this.expenseList)
        {
          this.getFriendList(expense.users)
          this.getPaidByDetail(expense.paidBy)

        }
      }
     
   });
  }
  getFriendList(friendArray)
  {
  
    for(var i=0;i<friendArray.length;i++)
    {
      
      this.ExpensesService.getFriendByObjectId(friendArray[i]).subscribe((data) => {
        if(data['status']=='200')
        {
          if(data['data']!=undefined)
          {
            this.friendArr=data['data'];
          }
                
        } 
  
        this.emailArr.push(this.friendArr[0].email)
  
     });
    } 
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
  deleteExpense(expenseId)
  {
    let expenseData = {
      expenseId:expenseId,
      createdBy:this.profile._id,
      active:false,
      emailArr:this.emailArr,
      createdByName:this.profile._firstName
    }

    this.ExpensesService.deleteExpense(expenseData)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success('Expense deleted successfully');
        setTimeout(() => {
          this.router.navigate(['/expense/list']);
        }, 2000);
  }
  });
  }

}
