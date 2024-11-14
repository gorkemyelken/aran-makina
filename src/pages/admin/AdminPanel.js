import React from 'react';
import AdminPanelSidebar from './AdminPanelSidebar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AdminPanel = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminPanelSidebar />
      <Outlet /> 
    </Box>
  );
};

export default AdminPanel;
