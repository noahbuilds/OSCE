export class UserDetail {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  activated: boolean;
  createdAt: string;
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
