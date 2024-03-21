import { createStore } from 'redux';

const ls = require('local-storage');

if (!ls.get('nextJS')) {
  console.log(3131132);
  let arry = {};
  arry['authLogin'] = '';
  arry['authUserName'] = '';
  arry['authName'] = '';
  arry['authRoleName'] = '';
  arry['authRoleAssign'] = [];
  ls.set('nextJS', arry);
}

const ThenextJS = ls.get('nextJS');

const initialState = {
  authLogin: ThenextJS['authLogin'],
  authUserName: ThenextJS['authUserName'],
  authName: ThenextJS['authName'],
  authRoleName: ThenextJS['authRoleName'],
  authRoleAssign: ThenextJS['authRoleAssign'],
};

const reducer = (state = initialState, action) => {
  if (action.type === 'CHANGE_STATE') {
    let nextJS = ThenextJS;
    if (action.payload.authLogin) {
      nextJS['authLogin'] = action.payload.authLogin;
      state.authLogin = action.payload.authLogin;
    } else if (action.payload.authLogin === '') {
      nextJS['authLogin'] = '';
      state.authLogin = '';
    }

    if (action.payload.authUserName) {
      nextJS['authUserName'] = action.payload.authUserName;
      state.authUserName = action.payload.authUserName;
    } else if (action.payload.authUserName === '') {
      nextJS['authUserName'] = '';
      state.authUserName = '';
    }

    if (action.payload.authName) {
      nextJS['authName'] = action.payload.authName;
      state.authName = action.payload.authName;
    } else if (action.payload.authName === '') {
      nextJS['authName'] = '';
      state.authName = '';
    }

    if (action.payload.authRoleAssign) {
      let authRoleAssign = action.payload.authRoleAssign.split(',');
      nextJS['authRoleAssign'] = authRoleAssign;
      ls.set('nextJS', nextJS);
      state.authRoleAssign = authRoleAssign;
    } else if (action.payload.authRoleAssign === '') {
      nextJS['authRoleAssign'] = [];
      ls.set('nextJS', nextJS);
      state.authRoleAssign = '';
    }

    if (action.payload.authRoleName) {
      nextJS['authRoleName'] = action.payload.authRoleName;
      ls.set('nextJS', nextJS);
      state.authRoleName = action.payload.authRoleName;
    } else if (action.payload.authRoleName === '') {
      nextJS['authRoleName'] = '';
      ls.set('nextJS', nextJS);
      state.authRoleName = '';
    }
  }

  return state;
};

const storeLogin = createStore(reducer);

export { storeLogin };
