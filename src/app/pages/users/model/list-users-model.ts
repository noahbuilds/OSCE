export class ListUsersModel {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  activated: true;
  organizationId: string;
  userRolesDTOList: [
    {
      roleId: string;
      role: string;
    }
  ];
  userTagsDTOList: [
    {
      tagId: string;
      tagName: string;
    }
  ];
}
