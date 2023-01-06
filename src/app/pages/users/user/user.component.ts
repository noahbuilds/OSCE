import { UserService } from '../user/user.service';
import { NewUserModel } from '../model/new-user-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ListUsersModel } from '../model/list-users-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  users$: Observable<ListUsersModel[]>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Users' }];

    this.users$ = this.userService.listAllUsers();
  }

  deleteUser(user: ListUsersModel): Observable<any> {
    return null;
  }

  confirmDeleteUser(user: ListUsersModel) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-primary ms-2',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure you want to delete user ' + user.username + '?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        confirmButtonText: 'Yes, delete user!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(user).subscribe(
            (value) => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                confirmButtonColor: 'rgb(3, 142, 220)',
                icon: 'success',
              });
            },
            (error: HttpErrorResponse) => {}
          );
        }
      });
  }
}
