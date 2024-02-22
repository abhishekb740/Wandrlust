import { Divider } from '@nextui-org/react';
import { Sidebar, Menu, MenuItem, menuClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export default function AgencySidebar() {
    return (
        <Sidebar style={{ marginTop: "-15px" }} className='h-min-[90vh]'>
            <Menu
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
                    }}> Agency </MenuItem>
                <Divider className='h-1' />
                <MenuItem icon={<PeopleAltIcon />} component={<Link to='/dashboard/agency/programs' />}> Programs </MenuItem>
            </Menu>
        </Sidebar>
    )
}