import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserDetail } from './../../users/model/user-detail';
import { UserService } from './../../users/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppRoleModel } from './../../users/model/app-role-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userDetail: UserDetail;

  roles$: Observable<AppRoleModel[]>;

  userId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.fetchUserDetail(this.userId);
    this.roles$ = this.userService.listRoles();
    console.log(this.roles$);
  }

  fetchUserDetail(userId: string) {
    this.userService.getUserDetail(userId).subscribe(
      (value) => {
        this.userDetail = value;
      },
      (error: HttpErrorResponse) => {}
    );
  }

  cancel() {
    this.router.navigate(['users']);
  }
}
