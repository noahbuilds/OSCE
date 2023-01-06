import { concat, Observable, of, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user/user.model';
import { UserService } from '../user/user.service';
import { NotifierService } from 'angular-notifier';

import Swal from 'sweetalert2';
import { AppRoleModel } from '../model/app-role-model';
import {
  catchError,
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { NewUserModel } from '../model/new-user-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  minLengthTerm: number = 3;

  _tags$: Observable<any>;

  tagsLoading: boolean = false;

  Tag: any[] = [];

  appRoles$: Observable<AppRoleModel[]>;
  tagsSearchInput$ = new Subject<string>();

  constructor(
    private userService: UserService,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Users' },
      { label: 'Add-User', active: true },
    ];

    this.appRoles$ = this.userService.listRoles();
    this.loadTags();
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

  createUser(value: any) {
    console.log(value);
    if (!value.valid) {
      return this.notifier.notify('error', 'All fields are required.');
    }
    if (value.role !== 'AUTHOR' && this.Tag.length === 0) {
      return this.notifier.notify(
        'warning',
        'An author must be assigned a tag.'
      );
    }
    if (value.password !== value.confirmPassword) {
      return this.notifier.notify('warning', 'passwords do not match!');
    }
    let newUser = this.mapFormToNewUser(value);
    console.log(newUser);
  }

  mapFormToNewUser(value: any): NewUserModel {
    let role = [value.role];
    let tagIds = [];
    let user: NewUserModel = new NewUserModel();

    value.tag.forEach((value) => tagIds.push(value.tagId));

    user.email = value.email;
    user.firstName = value.firstname;
    user.lastName = value.lastname;
    user.password = value.password;
    user.username = value.username;
    user.phone = value.phone;
    user.roles = role;
    user.tagLists = tagIds;

    this.sendUserToServer(user);

    return user;
  }

  sendUserToServer(user: NewUserModel) {
    this.userService.addNewUser(user).subscribe(
      (value) => {
        // todo: display success
      },
      (error: HttpErrorResponse) => {
        // todo: display error
      }
    );
  }

  showSelect(event) {
    console.log(event);
  }

  basicMessage() {
    Swal.fire({
      text: 'Congratulations! User was created successfully',
      confirmButtonColor: 'rgb(3, 142, 220)',
    });
  }

  imageHeader() {
    Swal.fire({
      title: 'Congratulations!',
      text: 'A new user was added successfully.',
      imageUrl: 'assets/images/logo-sm.png',
      imageHeight: 50,
      confirmButtonColor: 'rgb(3, 142, 220)',
    });
  }
}
