import { Card, CardBody, CardHeader, CardFooter } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React from 'react';

import useStateRef from 'react-usestateref';
import Layout from 'Layouts';
import { storeLogin } from 'components/redux/storeLogin';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { red } from '@material-ui/core/colors';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import NativeSelect from '@material-ui/core/NativeSelect';

import LinearProgress from '@material-ui/core/LinearProgress';

import { useRouter } from 'next/router';

const columns = [
  {
    id: 'btn',
    label: 'Action',
    minWidth: 380,
    align: 'center',
    format: (value) => this.btn,
  },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'role_name', label: 'Role Name', minWidth: 170 },
  { id: 'firstname', label: 'First Name', minWidth: 170 },
  { id: 'lastname', label: 'Last Name', minWidth: 150 },
  { id: 'age', label: 'Age', minWidth: 150 },
  { id: 'hobby_name', align: 'left', label: 'Hobby', minWidth: 270 },
];

function btn() {
  return '<Button variant="outlined" color="secondary">Secondary</Button>';
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function User_list() {
  const [open, setOpen] = React.useState(false);

  const [rows, setrows] = React.useState([]);

  const [selrole, setselrole] = React.useState([]);

  const [selhobby, setselhobby] = React.useState([]);

  const [OpenDetailDil, setOpenDetailDil] = React.useState(false);

  const [OpenDelDil, setOpenDelDil] = React.useState(false);

  const [ShowHideLin, setShowHideLin] = React.useState({ display: 'block' });

  const [FormData, setFormData] = React.useState({});

  const [BtnDilSE, setBtnDilSE] = React.useState({});

  const [DialogSEtitle, setDialogSEtitle] = useStateRef('Register New Data');
  const [IconSEtitle, setIconSEtitle] = React.useState(<AddIcon style={{ marginBottom: -4 }} color="primary" />);

  const DangerButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
  }))(Button);

  const router = useRouter();

  React.useEffect(async () => {
    var roleAss = Object.assign({}, storeLogin.getState().authRoleAssign);
    let cekmuser = Object.values(roleAss).find((obj) => {
      return obj === 'muser';
    });
    if (!cekmuser) router.push('/dashboard');

    await dataRole();
    await dataHobby();
    await loadData();
  }, []);
  const loadData = async (e) => {
    await DoShowLin();
    await fetch('http://127.0.0.1:8441/api/user', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + storeLogin.getState().authLogin },
    })
      .then((res) => res.json())
      .then((result) => {
        let data = result.result;
        if (result.result) {
          for (var i = 0; i < data.length; i++) {
            console.log(result.result[i]);
            if (result.result[i].price) {
              result.result[i].priceM = formatRupiah(result.result[i]['price'], 'Rp. ');
            }
          }
          console.log(result.result);
          setrows(result.result);
        }
      });
    await DoHideLin();
  };

  const DoShowLin = async (e) => {
    setShowHideLin({ display: 'block' });
  };

  const DoHideLin = async (e) => {
    setShowHideLin({ display: 'none' });
  };

  const dataRole = async (e) => {
    await DoShowLin();
    await fetch('http://127.0.0.1:8441/api/role', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + storeLogin.getState().authLogin },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.result);
        setselrole(result.result);
      });
    await DoHideLin();
  };

  const dataHobby = async (e) => {
    await DoShowLin();
    await fetch('http://127.0.0.1:8441/api/hobby', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + storeLogin.getState().authLogin },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.result);
        setselhobby(result.result);
      });
    await DoHideLin();
  };

  const delItem = async () => {
    await fetch('http://127.0.0.1:8441/api/user/' + FormData.id, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + storeLogin.getState().authLogin },
    })
      .then((res) => res.json())
      .then((result) => {
        loadData();
        handleCloseDelDil();
      });
  };

  const saveUpdateData = (e) => {
    e.preventDefault();

    if (FormData.password !== FormData.password2) {
      alert('password not match');
      return false;
    }
    if (typeof FormData.id === 'undefined') {
      fetch('http://127.0.0.1:8441/api/user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': '*',
          Authorization: 'Bearer ' + storeLogin.getState().authLogin,
        },
        body: JSON.stringify(FormData),
      })
        .then((res) => res.json())
        .then((result) => {
          loadData();
          handleClose();
        });
    } else {
      fetch('http://127.0.0.1:8441/api/user/' + FormData.id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': '*',
          Authorization: 'Bearer ' + storeLogin.getState().authLogin,
        },
        body: JSON.stringify(FormData),
      })
        .then((res) => res.json())
        .then((result) => {
          loadData();
          handleClose();
        });
    }
    e.preventDefault();
  };

  const onFieldChange = (fieldName) => {
    //console.log(fieldName);
    return function (event) {
      FormData[fieldName] = event.target.value;
      console.log(FormData);
      setFormData(FormData);
    };
  };

  const openNewForm = () => {
    setOpen(true);
    setFormData({});
    setIconSEtitle(<AddIcon style={{ marginBottom: -4 }} color="primary" />);
    setDialogSEtitle('New Register');
    console.log('New Register');
    setBtnDilSE('Save');
  };

  const OpenDetailSE = async (data) => {
    await setFormData(data);
    await setOpenDetailDil(true);
  };

  const OpenDeleteSE = async (data) => {
    await setFormData(data);
    await setOpenDelDil(true);
  };

  const handleClose = () => {
    loadData();
    setOpen(false);
  };

  const handleCloseDelDil = () => {
    loadData();
    setOpenDelDil(false);
  };

  const formatRupiah = (angka, prefix) => {
    return (
      prefix +
      ' ' +
      angka
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        .replace('.', '-')
        .replace(/,/g, '.')
        .replace('-', ',')
    );
  };

  const handleCloseDetailDil = (data) => {
    setOpenDetailDil(false);
  };

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
    <Layout title="List User">
      <Row>
        <Col breakPoint={{ xs: 24, md: 12 }}>
          <Card status="Primary" accent="Info">
            <CardHeader>
              <ListIcon style={{ marginBottom: -7 }} color="primary" />
              DATA USER
              <Button style={{ marginLeft: 30 }} onClick={() => openNewForm()} variant="contained" color="primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>{' '}
                &nbsp;Register Data
              </Button>
            </CardHeader>
            <CardBody>
              <Dialog open={OpenDelDil} onClose={handleCloseDelDil} aria-labelledby="form-dialog-title">
                <DialogContent>
                  <div style={{ fontSize: 24, marginBottom: 20 }}>Confirmation Delete</div>
                  Do you want to delete this item ?
                </DialogContent>
                <DialogActions>
                  <DangerButton onClick={delItem}>OK</DangerButton>
                  <Button onClick={handleCloseDelDil} color="primary">
                    close
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                  <div style={{ fontSize: 24, marginBottom: 20 }}>
                    {IconSEtitle}
                    {DialogSEtitle}
                  </div>
                  <form autoComplete="off" onSubmit={(e) => saveUpdateData(e)}>
                    <TextField
                      required
                      type="email"
                      label="Email"
                      name="email"
                      defaultValue={FormData.email || ''}
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: 20 }}
                      onChange={onFieldChange('email').bind(this)}
                    />
                    <TextField
                      required
                      label="FirstName"
                      name="firstname"
                      defaultValue={FormData.firstname || ''}
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: 20 }}
                      onChange={onFieldChange('firstname').bind(this)}
                    />
                    <TextField
                      required
                      label="LastName"
                      name="lastname"
                      defaultValue={FormData.lastname || ''}
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: 20 }}
                      onChange={onFieldChange('lastname').bind(this)}
                    />
                    <TextField
                      required
                      type="password"
                      label="Password"
                      name="password"
                      defaultValue={FormData.password || ''}
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: 20 }}
                      onChange={onFieldChange('password').bind(this)}
                    />
                    <TextField
                      required
                      type="password"
                      label="Confirm Password"
                      name="password2"
                      defaultValue={FormData.password2 || ''}
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: 20 }}
                      onChange={onFieldChange('password2').bind(this)}
                    />
                    <TextField
                      required
                      type="number"
                      name="age"
                      label="Age"
                      defaultValue={FormData.age || ''}
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: 20 }}
                      onChange={onFieldChange('age').bind(this)}
                    />
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
                    <Button type="submit" variant="contained" color="primary">
                      {BtnDilSE}
                    </Button>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button type="button" onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog open={OpenDetailDil} onClose={handleCloseDetailDil} aria-labelledby="form-dialog-title">
                <DialogContent>
                  <div style={{ fontSize: 24, marginBottom: 20 }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-check2-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                      <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                    </svg>{' '}
                    Detail Data User
                  </div>
                  <TextField
                    label="Email"
                    defaultValue={FormData.email || ''}
                    name="email"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 20 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="FirstName"
                    name="firstname"
                    defaultValue={FormData.firstname || ''}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 20 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="LastName"
                    name="lastname"
                    defaultValue={FormData.lastname || ''}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 20 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name="Age"
                    label="Age"
                    defaultValue={FormData.age || ''}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 20 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name="hobby"
                    label="Hobby"
                    defaultValue={FormData.hobby_name || ''}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 20 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name="role"
                    label="Role"
                    defaultValue={FormData.role_name || ''}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 20 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDetailDil} color="primary">
                    close
                  </Button>
                </DialogActions>
              </Dialog>

              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              //console.log(column.id);
                              if (column.id === 'btn') {
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    <Button
                                      style={{ marginRight: 10 }}
                                      variant="contained"
                                      color="inherit"
                                      onClick={() => OpenDetailSE(row)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-box-arrow-up-right"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                                        />
                                        <path
                                          fillRule="evenodd"
                                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                                        />
                                      </svg>
                                      &nbsp; Detail
                                    </Button>
                                    <DangerButton variant="contained" onClick={() => OpenDeleteSE(row)}>
                                      <svg
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-trash-fill"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                      </svg>
                                      &nbsp; Delete
                                    </DangerButton>
                                  </TableCell>
                                );
                              } else {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                  </TableCell>
                                );
                              }
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </CardBody>
            <CardFooter>
              <LinearProgress style={ShowHideLin} />
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
