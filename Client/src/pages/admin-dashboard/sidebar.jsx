import { Divider } from '@nextui-org/react';
import { Sidebar, Menu, MenuItem, menuClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function AdminSidebar() {
    return (
        <Sidebar style={{ marginTop: "-15px" }} className='h-min-[90vh]'>
            <Menu
                className='text-center'
                rootStyles={{
                    [`.${menuClasses.button}`]: {
                        color: '#720d22',
                    },
                }}>
                <MenuItem
                    component={<Link to='/dashboard/admin/' />}
                    className='text-2xl font-bold' rootStyles={{
                        [`.${menuClasses.button}`]: {
                            pointerEvents: 'none'
                        },
                    }}> Admin </MenuItem>
                <Divider className='h-1' />
                <MenuItem component={<Link to='/dashboard/admin/users' />}> Users </MenuItem>
                <MenuItem component={<Link to='/dashboard/admin/posts' />}> Posts </MenuItem>
            </Menu>
        </Sidebar>
    )
}