import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <>
      <header className='px-6 lg:px-32 py-5 bg-zinc-100'>
        <nav className='flex justify-between'>
          <Link className='content-center' href={'/'}>
            <Image src={'/page-logo.svg'} alt='GamerShop' height={20} width={150}></Image>
          </Link>
          <Link href={'/cart'} className='content-center'>
            <Image src={'/cart.svg'} alt='Cart Logo' height={24} width={24}></Image>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
