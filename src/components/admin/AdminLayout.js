import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, Typography } from '@mui/material';

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: '100%',
                    backgroundColor: '#ffffff',
                    color: '#000',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin Paneli
                    </Typography>
                </Toolbar>
            </AppBar>
            <main style={{ flexGrow: 1, padding: '24px', marginTop: '64px' }}>
                <Toolbar />
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
