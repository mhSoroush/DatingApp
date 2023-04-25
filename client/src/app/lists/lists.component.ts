import { Component, OnInit } from '@angular/core';
import { retryWhen } from 'rxjs';
import { LikeParams } from '../_models/likeParams';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  pagination: Pagination | undefined;
  likeParams :LikeParams | undefined;
  members : Member[] | undefined;
  //predicate: string = 'liked'

  constructor(private memberService: MembersService) {
    this.likeParams = new LikeParams('liked');
  }

  ngOnInit(): void {
    this.loadLikes()
  }

  loadLikes(){
    if (this.likeParams){
      this.memberService.getLikes(this.likeParams).subscribe({
        next: response => {
          if(response.result && response.pagination){
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      });
    }
  }

  pageChanged(event: any){
    if (this.likeParams && this.likeParams.pageNumber !== event.page){
      this.likeParams.pageNumber = event.page;
      this.loadLikes();
    }
  }
}
