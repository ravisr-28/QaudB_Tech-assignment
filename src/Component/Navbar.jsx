import React, { useState } from 'react'
import { FaBars, FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { PiSquaresFourThin } from 'react-icons/pi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOn, setIsOn] = useState(false);
  return (
    <div className='flex justify-between py-2'>
      <div className='flex items-center gap-2'>
        <div className=''>{isOpen ? <IoClose /> : <FaBars />}</div>
        <h3 className='font-bold text-green-400 font-serif text-lg'>DoIt</h3>
      </div>
      <div className='flex items-center gap-2'>
        <span><IoMdSearch size={24} /></span>
        <span><PiSquaresFourThin size={24} /></span>
        <span>{isOn ? <FaToggleOn size={24} />: <FaToggleOff size={24} />} </span>
      </div>
    </div>
  );
}

export default Navbar
