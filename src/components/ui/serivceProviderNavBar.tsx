"use client";

import Link from 'next/link';

export default function ServiceProviderNavBar(){
    return(
        <>
            <div className='flex justify-center items-center  bg-sky-200 h-25 '>
                <ul className="hidden xl:flex gap-4 text-black">
                    <li className='bg-white rounded-2xl p-2 hover:bg-gray-300'>Electrical</li>
                    <li className='bg-white rounded-2xl p-2 hover:bg-gray-300'>plumbing</li>
                    <li className='bg-white rounded-2xl p-2 hover:bg-gray-300'>Cleaning</li>
                    <li className='bg-white rounded-2xl p-2 hover:bg-gray-300'>gardening</li>
                </ul>
            </div>
        </>
    );
}