import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { IoExitOutline } from "react-icons/io5";
import { BackDrop } from './BackDrop';
import { logout } from '../store/actions';
import toast from 'react-hot-toast';

export const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {user}= useSelector((state)=>state.auth);
    
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = ()=>{
    dispatch(logout(navigate,toast));
  };

  return (
    <div className='relative z-30'>
      <div
      className='sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1
        rounded-full cursor-pointer hover:shadow-md transition text-slate-700' 
        onClick={handleClick}
      >
        <Avatar alt='Menu' src=''/>
      </div>
      <Menu
        sx={{width:"400px"}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
            sx:{width:160}
          },
        }}
      >
        <Link to='/profile'>
            <MenuItem
                className='flex gap-2' 
                onClick={handleClose}>
                    <BiUser className='text-xl'/>
                    <span className='font-bold text-[16px] mt-1'>
                        {user?.username}
                    </span>
            </MenuItem>
        </Link>

        <Link to='/profile/orders'>
            <MenuItem
                className='flex gap-2' 
                onClick={handleClose}>
                    <FaShoppingCart className='text-xl'/>
                    <span className='font-semibold'>
                        Order
                    </span>
            </MenuItem>
        </Link>

        <MenuItem
            className='flex gap-2' 
            onClick={logoutHandler}>
                <div className='font-semibold w-full flex gap-2 items-center bg-button-gradient
                    px-4 py-1 text-white rounded-lg'>
                    <IoExitOutline className='text-xl'/>
                    <span className='font-bold text-[16px] mt-1'>
                        Logout
                    </span>
                </div>
        </MenuItem>
      </Menu>

      {open && <BackDrop/>}
    </div>
  );
}
