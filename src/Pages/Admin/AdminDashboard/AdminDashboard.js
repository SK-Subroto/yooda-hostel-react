import React, { useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaUserTie, FaBars, FaPizzaSlice, FaTasks, FaUserGraduate, FaUsers, FaLayerGroup } from 'react-icons/fa';


const AdminDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);

    const activeStyle = {
        fontWeight: "bold",
        color: "#A48484",
    }

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    return (
        <div className={`app d-flex ${toggled ? 'toggled' : ''}`}>
            <ProSidebar
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
                style={{ height: '102vh' }}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Admin Portal
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">

                        <MenuItem icon={<FaPizzaSlice />}> <Link to={`admin/add-food`}>Add Fooditem</Link></MenuItem>
                        <MenuItem icon={<FaTasks />}> <Link to={`admin/manage-food`}>Manage Food</Link></MenuItem>
                        <MenuItem icon={<FaUserGraduate />}> <Link to={`admin/add-student`}>Add Student</Link></MenuItem>
                        <MenuItem icon={<FaUsers />}> <Link to={`admin/manage-student`}>Manage Student</Link></MenuItem>
                        <MenuItem icon={<FaLayerGroup />}> <Link to={`admin/distribution`}>Distribution</Link></MenuItem>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '40px 24px',
                        }}
                    >
                        © 2022 Developed By Subroto Karmokar
                    </div>
                </SidebarFooter>
            </ProSidebar>


            {/* main */}
            <main style={{ width: '100%' }}>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">
                            <div className="d-lg-none" onClick={() => handleToggleSidebar(!toggled)}>
                                <FaBars className="mb-1 me-2" /> <span> Dashboard</span>
                            </div>
                            <div className="d-none d-lg-block" onClick={() => handleCollapsedChange(!collapsed)}>
                                <FaBars className="mb-1 me-2" /> <span> Dashboard</span>
                            </div>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <section className="p-4" style={{ minHeight: '90vh' }}>
                    <Outlet></Outlet>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;