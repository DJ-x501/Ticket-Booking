import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
    //hooks used
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();
    const { openSignIn } = useClerk();
    const navigate = useNavigate();
    return (
        <div className='fixed top-0 left=0 z-50 w-full flex items-center justify-between
    px-6 md:px-16 lg:px-36 py-5'>
            <Link to="/" className='max-md:flex-1'>
                <img src={assets.logo} alt='' className='w-16 h-auto' />
            </Link>
            <div className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:z-40 max-md:w-full max-md:h-screen max-md:bg-black/80
    max-md:backdrop-blur-sm max-md:transition-all max-md:duration-300
    ${isOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'}
    flex flex-col md:flex-row items-center justify-center gap-8 md:static md:h-auto md:w-auto md:bg-transparent md:translate-x-0`}>

                <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
                <Link to="/" onClick={() => { scrollTo(0, 0); setIsOpen(false) }}>Home</Link>
                <Link to="/movies" onClick={() => { scrollTo(0, 0); setIsOpen(false) }}>Movies</Link>
                <Link to="/" onClick={() => { scrollTo(0, 0); setIsOpen(false) }}>Theaters</Link>
                <Link to="/" onClick={() => { scrollTo(0, 0); setIsOpen(false) }}>Releases</Link>
                <Link to="/favorites" onClick={() => { scrollTo(0, 0); setIsOpen(false) }}>Favorites</Link>
            </div>
            <div className='flex items-center gap-8'>
                <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer' />
                {!user ? (<button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull
            transition rounded-full font-medium cursor-pointer'>Login</button>) : (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15} />} onClick={() => Navigate("/my-bookings")} />
                        </UserButton.MenuItems>
                    </UserButton>
                )}

            </div>
            <MenuIcon className='max-md:ml-4 md:hidden 2-8 h-8 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
        </div>
    )
}

export default Navbar