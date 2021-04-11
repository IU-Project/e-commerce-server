import { ModelMaker } from '@modules/database/core';
import { Role } from '@app/models/auth/role';

export const Seller = ModelMaker.make({
  table: 'sellers',
  columns: ['id', 'name', 'email', 'password', 'created_at', 'updated_at'],
  fillable: ['name', 'email', 'password'],
  relationships: {
    hasMany: [
      {
        name: 'roles',
        foreignKey: 'id',
        relatedModel: Role,
        pivot: {
          table: 'roles_sellers',
          assetKey: 'role_id',
          ownerKey: 'seller_id',
        },
      },
    ],
  },
});