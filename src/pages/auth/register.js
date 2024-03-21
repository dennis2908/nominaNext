import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React, { useEffect } from 'react';

//import { useHistory } from 'react-router-dom'

import { storeLogin } from 'components/redux/storeLogin';

import Auth, { Group } from 'components/Auth';
import Layout from 'Layouts';

import NativeSelect from '@material-ui/core/NativeSelect';

import { useRouter } from 'next/router';

export default function Signin() {
  const router = useRouter();

  const [FormData, setFormData] = React.useState({});

  const [selrole, setselrole] = React.useState([]);

  const [selhobby, setselhobby] = React.useState([]);

  //const history = useHistory()
  useEffect(async () => {
    await localStorage.removeItem('nextJS');
    await dataRole();
    await dataHobby();
    await storeLogin.dispatch({
      type: 'CHANGE_STATE',
      payload: { authLogin: '', authUserName: '', authName: '', authRoleName: '', authRoleAssign: '' },
    });
  }, []);

  const onFieldChange = (fieldName) => {
    //console.log(fieldName);
    return function (event) {
      FormData[fieldName] = event.target.value;
      console.log(FormData);
      setFormData(FormData);
    };
  };

  const SubmitForm = async (e) => {
    e.preventDefault();
    let authLogin = storeLogin.getState().authLogin;
    let formData = {};
    formData.email = e.target.email.value;
    formData.password = e.target.password.value;
    console.log(formData);

    await fetch('http://127.0.0.1:8441/api/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.result) {
          storeLogin.dispatch({
            type: 'CHANGE_STATE',
            payload: {
              authLogin: result.token,
              authUserName: result.result.firstname,
              authName: result.result.firstname + ' ' + result.result.lastname,
              authRoleName: result.result.role_name,
              authRoleAssign: result.result.role_assign,
            },
          });
          location.href = '/dashboard';
        }
      });

    e.preventDefault();
  };

  const dataRole = async (e) => {
    await fetch('http://127.0.0.1:8441/api/role', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.result);
        setselrole(result.result);
      });
  };

  const dataHobby = async (e) => {
    await fetch('http://127.0.0.1:8441/api/hobby', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.result);
        setselhobby(result.result);
      });
  };

  let dataSelRole = [];
  let dataSelHobby = [];
  dataSelRole = [
    <option value="" key={String('0role') + String('0role')}>
      == Pilih Role ==
    </option>,
  ];
  if (selrole) {
    selrole.forEach((k, v) => {
      dataSelRole.push(
        <option value={k.id} key={String(k.id + 'role')}>
          {k.role_name}
        </option>,
      );
    });
  }

  dataSelHobby = [
    <option value="" key={String('0hobby') + String('0hobby')}>
      == Pilih Hobby ==
    </option>,
  ];
  if (selhobby) {
    selhobby.forEach((k, v) => {
      dataSelHobby.push(
        <option value={k.id} key={String(k.id + 'hobby')}>
          {k.name}
        </option>,
      );
    });
  }

  return (
    <Layout title="Signin">
      <Auth title="Signin" subTitle="Hello! Signin with your credential">
        <form
          onSubmit={(e) => {
            SubmitForm(e);
          }}
        >
          <InputGroup fullWidth>
            <input type="email" placeholder="Enter Email" name="email" required />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="text" placeholder="Enter First Name" name="firstname" required />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="text" placeholder="Enter Last Name" name="lastname" required />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="number" placeholder="Enter Age" name="age" required />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Enter Password" name="password" required />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Enter Password" name="password" required />
          </InputGroup>
          <NativeSelect
            inputProps={{
              name: 'name',
              id: 'id',
            }}
            defaultValue={FormData.hobby}
            required
            fullWidth
            onChange={onFieldChange('hobby').bind(this)}
            style={{ marginBottom: 20 }}
          >
            {dataSelHobby}
          </NativeSelect>
          <NativeSelect
            inputProps={{
              name: 'm_role',
              id: 'm_role',
            }}
            defaultValue={FormData.m_role}
            required
            fullWidth
            onChange={onFieldChange('m_role').bind(this)}
            style={{ marginBottom: 20 }}
          >
            {dataSelRole}
          </NativeSelect>
          <Group></Group>
          <Button status="Success" type="submit" shape="SemiRound" fullWidth>
            Login
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
