import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserDetail } from '../model/user-detail';
import { UserService } from '../user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppRoleModel } from '../model/app-role-model';
import { ChangeUserPassword } from '../model/change-user-password.model';
import {
  catchError,
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { concat, Observable, of, Subject } from 'rxjs';
import { ChangeUserDetails } from '../model/change-user-details.model';
import { AssignNewTagToUser } from '../model/assign-new-tag-to-user.model';
import { SearchTags } from '../../tags/model/search-tags.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userDetail: UserDetail;

  roles$: Observable<AppRoleModel[]>;

  newPassword: ChangeUserPassword = new ChangeUserPassword();

  newUserDetails: ChangeUserDetails = new ChangeUserDetails();

  confirmation: string;

  userId: string;

  minLengthTerm: number = 3;

  tagsLoading: boolean = false;

  _tags$: Observable<any>;

  newTag: AssignNewTagToUser;

  selectedTags: any[] = [];

  tagsSearchInput$ = new Subject<string>();

  userDefaultTags: Array<SearchTags> = [];

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

    this.loadTags();
    //this._tags$ = of(this.userDefaultTags);
    this.selectedTags = this.userDefaultTags;
  }

  showSelect(event) {
    console.log(event);
  }

  loadTags() {
    this._tags$ = concat(
      of([]),
      this.tagsSearchInput$.pipe(
        filter((value) => {
          return value !== null && value.length >= this.minLengthTerm;
        }),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => (this.tagsLoading = true)),
        switchMap((value) => {
          return this.userService.searchTags(value).pipe(
            catchError((err) => {
              console.log(err);
              return of([]);
            }),
            tap((value) => {
              this.tagsLoading = false;
              console.log(value);
            })
          );
        })
      )
    );
  }

  trackByFn(tag: any) {
    return tag.tagId;
  }

  fetchUserDetail(userId: string) {
    this.userService.getUserDetail(userId).subscribe(
      (value) => {
        this.userDetail = value;
        this.userDetail.userTagsDTOList.forEach((tag) => {
          let userDefaultTag = new SearchTags();
          userDefaultTag.tagId = tag.tagId;
          userDefaultTag.tagName = tag.tagName;

          this.userDefaultTags.push(userDefaultTag);
        });
      },
      (error: HttpErrorResponse) => {}
    );
  }

  cancel() {
    this.router.navigate(['users']);
  }

  changeUserPassword() {
    if (this.confirmation === this.newPassword.newPassword) {
      this.userService.ChangeUserPassword(this.newPassword).subscribe(
        (value) => {
          console.log(value);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  updateUserDetails(updateDetailForm: any) {
    //console.log(updateDetailForm.value);
    this.newUserDetails.firstName = this.userDetail.firstName;
    this.newUserDetails.lastName = this.userDetail.lastName;
    this.newUserDetails.phone = this.userDetail.phone;
    this.newUserDetails.email = this.userDetail.email;
    this.newUserDetails.role = this.userDetail.userRolesDTOList[0].role;
    this.newUserDetails.id = this.userDetail.id;

    console.log(this.newUserDetails);
    this.userService.updateUserDetails(this.newUserDetails).subscribe(
      (value) => {
        console.log(value);
        Swal.fire({
          icon: 'success',
          html: 'User information has been updated successfully.'
        })
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          html: `${error.error}`
        })
      }
    );
  }

  assignNewTagToUser() {
    this.selectedTags = this.selectedTags.map((tag) => {
      return tag.tagId;
    });

    this.newTag = {
      tagLists: this.selectedTags,
      userId: this.userId,
    };

    this.userService
      .addNewTagToUser(this.newTag)
      .toPromise()
      .then((response) => console.log(response))
      .catch((error: HttpErrorResponse) => console.log(error));
  }
}
