import React from 'react';
import Link from 'next/link';

function Header(){
    return(
        <header className="flex justify-between items-center p-6 bg-black fixed w-full top-0 z-10">
        <a href="#">
          <img src="/logo.png" className="w-36"></img>
        </a>
        <nav>
          <ul className="flex space-x-15">
            <li><Link href="/" className="hover:text-gray-800">Home</Link></li>
            <li><Link href="/movielist" className="hover:text-gray-800">Shows</Link></li>
            <li><Link href="#" className="hover:text-gray-800">Movies</Link></li>
            <li><Link href="#" className="hover:text-gray-800">My List</Link></li>
          </ul>
        </nav>
      </header>
    )
}


export default Header