import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../expenses.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile:any;
  firstName:String;
  lastName:String;
  constructor(private expensesService:ExpensesService) { }

  ngOnInit(): void {
    this.profile=this.expensesService.getUserInfoFromLocalstorage();
  }

}
