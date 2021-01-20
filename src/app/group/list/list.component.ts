import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../expenses.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public groupList:any;
    public profile:any;
    public createdByDetail:any;

  constructor( public ExpensesService: ExpensesService) { }

  ngOnInit(): void {
    this.profile=this.ExpensesService.getUserInfoFromLocalstorage();

   this.ExpensesService.listGroup(this.profile._id).subscribe((data) => {
      if(data['status']=='200')
      {
        this.groupList=data['data'] 
        console.log(this.groupList)
        for(let group of this.groupList)
        {
          this.getCreatedByDetail(group.createdBy)

        }
      }
     
   });
           
  }
  getCreatedByDetail(createdBy)
  {
    this.ExpensesService.getFriend(createdBy).subscribe((data) => {
      if(data['status']=='200')
      {
        this.createdByDetail=data['data'][0]
      }
     
   });
  }
   }
