import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <footer className='w-full bg-neutral-700 flex justify-center py-10'>
        <Image src={'/apply-digital-logo.svg'} alt='Logo de Apply Digital' width={170} height={44.69}></Image>
      </footer>
    </>
  );
};

export default Footer;
