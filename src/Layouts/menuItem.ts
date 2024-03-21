import { MenuItemType } from '@paljs/ui/types';

import { storeLogin } from 'components/redux/storeLogin';

const itemsData = () => {
  var roleAss = Object.assign({}, storeLogin.getState().authRoleAssign);

  let mrole = {} as MenuItemType;
  let cekmrole = Object.values(roleAss).find((obj) => {
    return obj === 'mrole';
  });
  if (cekmrole)
    mrole = {
      title: 'Role',
      icon: { name: 'browser-outline' },
      children: [
        {
          title: 'List Role',
          link: { href: '/role/role_list' },
        },
      ],
    };

  let muser = {} as MenuItemType;
  let cekmuser = Object.values(roleAss).find((obj) => {
    return obj === 'muser';
  });
  if (cekmuser)
    muser = {
      title: 'User',
      icon: { name: 'browser-outline' },
      children: [
        {
          title: 'List User',
          link: { href: '/user/user_list' },
        },
      ],
    };
  let mhobby = {} as MenuItemType;
  let cekmhobby = Object.values(roleAss).find((obj) => {
    return obj === 'mhobby';
  });
  if (cekmhobby)
    mhobby = {
      title: 'Hobby',
      icon: { name: 'browser-outline' },
      children: [
        {
          title: 'List Hobby',
          link: { href: '/hobby/hobby_list' },
        },
      ],
    };

  const itemsData: MenuItemType[] = [
    {
      title: 'Home Page',
      icon: { name: 'home' },
      link: { href: '/dashboard' },
    },
    {
      title: 'MASTER',
      group: true,
    },
    mrole,
    muser,
    mhobby,
  ];

  return itemsData;
};

const items: MenuItemType[] = itemsData();

export default items;
