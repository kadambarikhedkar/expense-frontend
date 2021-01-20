import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { AddComponent } from '../group/add/add.component';
import { ListComponent } from '../group/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { AddFriendComponent } from '../friend/add-friend/add-friend.component';
import { ListFriendComponent } from '../friend/list-friend/list-friend.component';
import { NgSelectModule } from '@ng-select/ng-select'; 
import { AddExpenseComponent } from '../expense/add-expense/add-expense.component';
import { ListExpenseComponent } from '../expense/list-expense/list-expense.component';
import { ViewExpenseComponent } from '../expense/view-expense/view-expense.component';
import { ViewComponent } from '../group/view/view.component';
import { EditExpenseComponent } from '../expense/edit-expense/edit-expense.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent },
      { path: 'group/add', component: AddComponent  },
      { path: 'group/list', component: ListComponent },
      { path: 'group/view/:groupId', component: ViewComponent },
      { path: 'friend/list', component: ListFriendComponent  },
      { path: 'friend/add', component: AddFriendComponent },
      { path: 'expense/add', component: AddExpenseComponent },
      { path: 'expense/list', component: ListExpenseComponent },
      { path: 'expense/view/:expenseId', component: ViewExpenseComponent },
      { path: 'expense/edit/:expenseId', component:EditExpenseComponent}

    ])
  ],
  declarations: [DashboardComponent,ProfileComponent,ViewComponent,EditExpenseComponent,ViewExpenseComponent,AddComponent,AddExpenseComponent,ListComponent,ListExpenseComponent,ListFriendComponent,AddFriendComponent]
})
export class DashboardModule { }
