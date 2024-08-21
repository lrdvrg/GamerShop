import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className='w-full bg-neutral-700 flex justify-center py-10'>
        <Link href={'/'}>
          <Image src={'/apply-digital-logo.svg'} alt='Logo de Apply Digital' width={170} height={44.69}></Image>
        </Link>
      </footer>
    </>
  );
};

export default Footer;
