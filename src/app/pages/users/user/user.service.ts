import { ChangeUserDetails } from './../model/change-user-details.model';
import { ChangeUserPassword } from './../model/change-user-password.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppRoleModel } from '../model/app-role-model';
import { environment } from '../../../../environments/environment';
import { NewUserModel } from '../model/new-user-model';
import { ResourceCreated } from '../../../shared/model/resource-created';
import { ListUsersModel } from '../model/list-users-model';
import { UserDetail } from '../model/user-detail';
import { AssignNewTagToUser } from '../model/assign-new-tag-to-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  listAllUsers(): Observable<ListUsersModel[]> {
    return this.http.get<ListUsersModel[]>(
      `http://${environment.developmentIP}/itembank/api/admin/users`,
      { withCredentials: true }
    );
  }

  listRoles(): Observable<AppRoleModel[]> {
    return this.http.get<AppRoleModel[]>(
      `http://${environment.developmentIP}/itembank/api/admin/users/roles`,
      { withCredentials: true }
    );
  }

  searchTags(text: string): Observable<any> {
    return this.http.get(
      `http://${environment.developmentIP}/itembank/api/admin/tagtypes/searchtag?text=${text}`,
      { withCredentials: true }
    );
  }

  addNewUser(newUser: NewUserModel): Observable<ResourceCreated> {
    return this.http.post(
      `http://${environment.developmentIP}/itembank/api/admin/users`,
      newUser,
      { withCredentials: true }
    );
  }

  addNewTagToUser(newTag: AssignNewTagToUser): Observable<ResourceCreated> {
    return this.http.put<ResourceCreated>(
      `http://${environment.developmentIP}/itembank/api/admin/users/user-tags`,
      newTag,
      { withCredentials: true }
    );
  }

  getUserDetail(id: string): Observable<UserDetail> {
    return this.http.get<UserDetail>(
      `http://${environment.developmentIP}/itembank/api/admin/users/${id}`,
      { withCredentials: true }
    );
  }

  ChangeUserPassword(
    newPassword: ChangeUserPassword
  ): Observable<ResourceCreated> {
    return this.http.put<ResourceCreated>(
      `http://${environment.developmentIP}/itembank/api/admin/users/user-password`,
      newPassword,
      { withCredentials: true }
    );
  }

  updateUserDetails(
    newUserDetail: ChangeUserDetails
  ): Observable<ResourceCreated> {
    return this.http.put<ResourceCreated>(
      `http://${environment.developmentIP}/itembank/api/admin/users/user-details`,
      newUserDetail,
      { withCredentials: true }
    );
  }
}
