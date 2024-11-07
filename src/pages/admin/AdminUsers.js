import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [openUserModal, setOpenUserModal] = useState(false);
    const [newUser, setNewUser] = useState({
        userName: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://aran-makina-8fce3ead0cbf.herokuapp.com/api/users');
                setUsers(response.data.data);
            } catch (error) {
                console.error('Kullanıcılar alınırken hata oluştu:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleOpenUserModal = () => {
        setOpenUserModal(true);
    };

    const handleCloseUserModal = () => {
        setOpenUserModal(false);
        setNewUser({ userName: '', password: '', role: '' });
    };

    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleAddUser = async () => {
        try {
            await axios.post('https://aran-makina-8fce3ead0cbf.herokuapp.com/api/users/add', newUser, {
                headers: { 'Content-Type': 'application/json' },
            });
            setUsers((prev) => [...prev, newUser]);
            handleCloseUserModal();
            alert('Yeni kullanıcı başarıyla eklendi');
        } catch (error) {
            console.error('Kullanıcı eklenirken hata oluştu:', error);
            alert('Kullanıcı eklenirken hata oluştu');
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Kullanıcılar
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
                onClick={handleOpenUserModal}
            >
                Yeni Kullanıcı Ekle
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Kullanıcı ID</TableCell>
                            <TableCell>Kullanıcı Adı</TableCell>
                            <TableCell>Rol</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell>{user.userId}</TableCell>
                                <TableCell>{user.userName}</TableCell>
                                <TableCell>{user.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Kullanıcı Ekleme Modalı */}
            <Dialog open={openUserModal} onClose={handleCloseUserModal}>
                <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="userName"
                        label="Kullanıcı Adı"
                        type="text"
                        fullWidth
                        value={newUser.userName}
                        onChange={handleChangeUser}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Şifre"
                        type="password"
                        fullWidth
                        value={newUser.password}
                        onChange={handleChangeUser}
                    />
                    <TextField
                        margin="dense"
                        name="role"
                        label="Rol"
                        type="text"
                        fullWidth
                        value={newUser.role}
                        onChange={handleChangeUser}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUserModal} color="secondary">
                        İptal
                    </Button>
                    <Button onClick={handleAddUser} color="primary">
                        Ekle
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminUsers;
