import React, { useState } from 'react'
import { SideBar } from '../shared/SideBar'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { RxCross1 } from 'react-icons/rx'
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export const AdminLayout = () => {
    let [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div>
        <Dialog 
            open={sideBarOpen} 
            onClose={() => setSideBarOpen(false)} 
            className="relative z-50 xl:hidden">
            <DialogBackdrop 
                transition
                className="fixed inset-0 bg-gray-900/80 transition-opacity
                duration-300 ease-linear data-closed:opacity-0" />

            <div className="fixed inset-0 flex">
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1
                transform transition duration-300 ease-in-out data-closed:-translate-x-full">
                    <TransitionChild>
                        <div className='absolute left-full top-0 flex w-16 justify-center
                        pt-5 duration-300 ease-in-out data-closed:opacity-0'>
                            <button type='button'
                            onClick={()=>setSideBarOpen(false)}
                            className='-m-2.5 p-2.5'>
                                <span className='sr-only'>Close Sidebar</span>
                                <RxCross1 className='text-white text-2xl'/>
                            </button>
                        </div>
                    </TransitionChild>
                    <SideBar />
                </DialogPanel>
            </div>
        </Dialog>

        <div className='hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col'>
            <SideBar />
        </div>

        <div className='xl:pl-72'>
            <button
                type='button'
                onClick={()=>setSideBarOpen(true)}
                className='-m-2.5 text-gray-700 xl:hidden p-4'>
                    <span className='sr-only'>Open Sidebar</span>
                    <FaBars className='text-slate-800 text-2xl'/>
            </button>
            <main>
                <div className='p-4 sm:p-6 xl:p-8'>
                    <Outlet/>
                </div>                
            </main>
        </div>      

    </div>
  )
}
