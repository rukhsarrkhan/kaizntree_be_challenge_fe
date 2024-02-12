import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [nav, setNav] = useState(false);
    const [toggle, setToggle] = useState(false);

    const access_token = sessionStorage.getItem('access_token');
    const links = [
        {
            id: 1,
            link: "login",
            authRequired: false,
        },
        {
            id: 2,
            link: "signup",
            authRequired: false,

        },
        {
            id: 3,
            link: "dashboard",
            authRequired: true,

        },
        {
            id: 4,
            link: "logout",
            authRequired: true,

        }
    ];

    const filteredLinks = links.filter(link => link.authRequired === !!access_token);


    return (
        <div className="flex justify-between items-center h-24  w-full mx-auto px-4 text-white bg-black fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-center">
                <Link to="/">
                    <img
                        alt=""
                        className="h-14 w-14 cursor-pointer" // Added cursor-pointer for visual feedback
                        src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
                    />
                </Link>
            </div>

            <ul className="hidden md:flex">
                {filteredLinks.map(({ id, link }) => (
                    <li
                        key={id}
                        className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200"
                    >
                        <Link to={link} smooth duration={500}>
                            {link}
                        </Link>
                    </li>
                ))}
            </ul>

            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
                    {links.map(({ id, link }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-4xl"
                        >
                            <Link
                                onClick={() => setNav(!nav)}
                                to={link}
                                smooth
                                duration={500}
                            >
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NavBar;