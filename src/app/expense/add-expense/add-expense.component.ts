import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from '../../expenses.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  public expenseName: String;
  public amount:Number;
  public users:[];
  public groups:[];
  public profile:any;
  public friendList :any;
  public groupList:any;
  public friendArr: any;
  public paidBy: String;
  public paidList:any;
  public firstName:String;
  public nameArray=[]
  public paidByArray=[]
  public userArr=[];
  public emailArr=[];


  constructor(public ExpensesService: ExpensesService,
    public router: Router,
    private toastr: ToastrService) { 
    }

  ngOnInit(): void {
    this.profile=this.ExpensesService.getUserInfoFromLocalstorage();
    this.ExpensesService.listGroup(this.profile._id).subscribe((data) => {
      if(data['status']=='200')
      {
        this.groupList=data['data'] 
      }
     
   });
  
  }

  getFriendList(value){
    this.nameArray=[];
        this.paidByArray=[];

    this.ExpensesService.getGroupDetail(value).subscribe((data) => {
      if(data['status']=='200')
      {
        this.friendList=data['data'] 
        this.getFriendDetails(this.friendList[0].users)
      }  
      
   });
  }

getFriendDetails(friendArray)
{
  for(var i=0;i<friendArray.length;i++)
  {
    this.ExpensesService.getFriendByObjectId(friendArray[i]).subscribe((data) => {
      if(data['status']=='200')
      {
        if(data['data']!=undefined)
        {
          this.friendArr=data['data'];
          console.log(this.friendArr)
        }
              
      } 
      this.nameArray.push(this.friendArr)
      this.paidByArray.push(this.friendArr)
      this.emailArr.push(this.friendArr[0].email)

   });
  } 
}

  addExpense(){
    if (!this.expenseName) {
      this.toastr.warning('Enter expense name')
     

    }
    else if (this.groups==undefined) {
      this.toastr.warning('select group')

    }
    else if (!this.amount) {
      this.toastr.warning('Enter amount')
     

    } else if (this.users==undefined) {
      this.toastr.warning('select users')

    }else if (!this.paidBy) {
      this.toastr.warning('select paidBy')
     

    } 
    
    else
    {
    let expenseData = {
      expenseName: this.expenseName,
      groups:this.groups,
      amount:this.amount,
      users:this.users,
      paidBy:this.paidBy,
      createdBy:this.profile._id,
      emailArr:this.emailArr,
      createdByName:this.profile._firstName
    }
    this.ExpensesService.addExpense(expenseData)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success('Expense Added successfully');
        setTimeout(() => {
          this.router.navigate(['/expense/list']);
        }, 2000);
  }
  });
  }
}
}
