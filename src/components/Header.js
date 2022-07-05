
import React from 'react';


// import link
import { Link } from 'react-router-dom';
// import logo
import Logo from '../assets/img/Estatery.jpg';

import Example from './HeaderDropdown';

const Header = () => {
  return (
    <header className='py-5 mb-12 border-b'>
      <div className='container mx-auto flex  justify-between items-center'>
        <Link to='/'>
          <img  className='rounded-md' src={Logo} alt='' />
       
        </Link>


        <div className='flex mr-auto'>
          <Link className='ml-12 bg-purple-200 px-3 text-xl rounded-md' to='/'>
            Rent
          </Link>
          <Link className='mx-4 text-xl' to='/'>
            Buy
          </Link>
          
          <Link className='mx-4 text-xl' to='/'>
            Sell
          </Link>



          <Link className='' to='/'>
          
          <div>
           <Example></Example>

          </div>

          </Link>

          



        </div>


        <div className='flex items-center gap-6 '>
          <Link className='hover:text-violet-900 px-3 py-2 rounded-lg border-2  transition' to='/'>
            Log in
          </Link>
          <Link
            className='bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition'
            to='/'
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
