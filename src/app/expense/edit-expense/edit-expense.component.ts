import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../expenses.service';
import { ActivatedRoute, Router } from "@angular/router";
import { SocketService } from '../../socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  public profile:any;
  expenseDetail:any;
  public groupDetail :any;
  public nameArray=[]
  public paidByArray=[]
  public friendArr: any;
public expenseId:String;
is_edit : boolean = true;
is_group_edit : boolean = true;
public emailArr=[];


  constructor(public ExpensesService: ExpensesService,
    private toastr: ToastrService,
    private _route: ActivatedRoute,
    public SocketService: SocketService,
    public router: Router) { }

  ngOnInit(): void {
    this.profile=this.ExpensesService.getUserInfoFromLocalstorage();

    this.expenseId = this._route.snapshot.paramMap.get('expenseId');
    this.ExpensesService.getExpenseDetail(this.expenseId).subscribe((data) => {
      if(data['status']=='200')
      {
        this.expenseDetail=data['data'] [0]
        this.getGroupDetail(this.expenseDetail.group)
       
      }
     
   });

  }

  getGroupDetail(objectId)
{
  this.nameArray=[];
  this.paidByArray=[];

  this.ExpensesService.getGroupDetail(objectId).subscribe((data) => {
    if(data['status']=='200')
    {
      this.groupDetail=data['data'][0]
      this.getFriendDetails(this.groupDetail.users)
    }  
    
 });
}
getFriendDetails(friendArray)
{

  for(var i=0;i<friendArray.length;i++)
  {
    if(this.profile._id==friendArray[i]){
      this.is_group_edit=false
    }
    
    
    
    this.ExpensesService.getFriendByObjectId(friendArray[i]).subscribe((data) => {
      if(data['status']=='200')
      {
        if(data['data']!=undefined)
        {
          this.friendArr=data['data'];
        }
              
      } 

      this.nameArray.push(this.friendArr)
      this.paidByArray.push(this.friendArr)
      this.emailArr.push(this.friendArr[0].email)

   });
  } 
}
  editExpense(){
    let expenseData = {
      expenseId:this.expenseId,
      expenseName: this.expenseDetail.expenseName,
      group:this.groupDetail._id,
      amount:this.expenseDetail.amount,
      users:this.groupDetail.users,
      paidBy:this.expenseDetail.paidBy,
      createdBy:this.profile._id,
      emailArr:this.emailArr,
      createdByName:this.profile._firstName
    }
    this.ExpensesService.editExpense(expenseData)
    .subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.toastr.success('Expense edited successfully');
        setTimeout(() => {
          this.router.navigate(['/expense/list']);
        }, 2000);
  }
  });
  }
}
