import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //members$: Observable<Member[]> | undefined;
  members: Member[] | undefined;

  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  constructor(private memberSerivice: MembersService) {
    this.userParams = this.memberSerivice.getUserParams();
  }

  ngOnInit(): void {
    //this.members$ = this.memberSerivice.getMembers();
    this.loadMembers();
  }


  loadMembers(){
    if (this.userParams){
      this.memberSerivice.setUserParams(this.userParams);
      this.memberSerivice.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination){
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
  }

  resetFilters(){
    this.userParams = this.memberSerivice.resetUserParams();
    this.loadMembers();

  }

  pageChanged(event: any){
    if (this.userParams && this.userParams?.pageNumber !== event.page){
      this.userParams.pageNumber = event.page;
      this.memberSerivice.setUserParams(this.userParams);
      this.loadMembers();
    }
  }

}
