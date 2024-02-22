import { Divider } from '@nextui-org/react';
import { Sidebar, Menu, MenuItem, menuClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FeedIcon from '@mui/icons-material/Feed';

export default function AdminSidebar() {
    return (
        <Sidebar style={{ marginTop: "-15px", height: "90vh" }} className='h-min-[90vh]'>
            <Menu
                // className='text-center'
                rootStyles={{
                    [`.${menuClasses.button}`]: {
                        color: '#720d22',
                    },
                }}>
                <MenuItem
                    component={<Link to='/dashboard/admin/' />}
                    className='text-2xl font-bold text-center' rootStyles={{
                        [`.${menuClasses.button}`]: {
                            pointerEvents: 'none'
                        },
                    }}> Admin </MenuItem>
                <Divider className='h-1' />
                <MenuItem icon={<PeopleAltIcon />} component={<Link to='/dashboard/admin/users' />}> Users </MenuItem>
                <MenuItem icon={<FeedIcon />} component={<Link to='/dashboard/admin/posts' />}> Posts </MenuItem>
            </Menu>
        </Sidebar>
    )
}