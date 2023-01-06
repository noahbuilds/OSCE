import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../../users/user/user.service';
import { DecimalPipe } from '@angular/common';

import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListUsersModel } from './../../users/model/list-users-model';
import { UserDetail } from './../../users/model/user-detail';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [DecimalPipe],
})
export class MyProfileComponent implements OnInit {
  submitted = false;

  userId: string;

  userDetail: UserDetail;

  // Table data
  total$: Observable<number>;

  /* @ViewChildren(NgbdTeamSortableHeader)
  headers!: QueryList<NgbdTeamSortableHeader>; */

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
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
        console.log(this.userDetail.createdAt, this.userDetail.phone);
        console.log(moment().format(this.userDetail.createdAt));
      },
      (error: HttpErrorResponse) => {}
    );
  }

  /**
   * Fetches the data
   */
  

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  /* onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  } */

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  cancel() {
    this.router.navigate(['users']);
  }
}
