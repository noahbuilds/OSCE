import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { UserModel } from '../user/user.model';
import { UserService } from '../user/user.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ListUsersModel } from '../model/list-users-model';
import { UserDetail } from '../model/user-detail';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemHttpService } from '../../items/item-http.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  providers: [DecimalPipe],
})
export class ViewUserComponent implements OnInit {
  userId: string;

  userDetail: UserDetail;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private itemService: ItemHttpService
  ) {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
      console.log(this.userId);
    });
  }

  ngOnInit(): void {
    this.fetchUserDetail(this.userId);
  }

  fetchUserDetail(userId: string) {
    this.userService.getUserDetail(userId).subscribe(
      (value) => {
        this.userDetail = value;
      },
      (error: HttpErrorResponse) => {}
    );
  }
}
