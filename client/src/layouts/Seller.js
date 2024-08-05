import { NavLink, Outlet } from "react-router-dom";
import {IoMdMenu} from "react-icons/io"
import {RxCross2} from "react-icons/rx"
import { useState } from "react";

export default function Seller() {

    const [showNav, setShowNav] = useState(false);

    return (
        <div className="w-full h-screen flex">
            <div className={`w-80 h-screen bg-stone-800 text-white py-4 flex flex-col absolute md:static z-50 left-0 
                    ${showNav? "left-0": "-left-full"}`}>
                <RxCross2 className="text-2xl inline mb-5 hover:cursor-pointer self-end mr-4 md:hidden" onClick={()=>setShowNav(false)}/>
                <div>
                    <h1 className="font-bold text-white text-xl text-center">E-Commerce</h1>
                </div>
                
                <div className="mt-5 flex flex-col items-start">
                    <NavLink
                        to="/seller/dashboard"
                        className={({ isActive }) =>
                            `px-4 p-2 font-bold text-lg w-full text-left ${isActive ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`
                        }
                    >
                        My Products
                    </NavLink>
                    <NavLink
                        to="/seller/addProduct"
                        className={({ isActive }) =>
                            `px-4 p-2 font-bold text-lg w-full text-left ${isActive ? 'bg-gray-200 text-black' : 'hover:bg-gray-200 hover:text-black'}`
                        }
                    >
                        Add Product
                    </NavLink>
                </div>
            </div>
            <div className="w-full h-screen overflow-y-auto p-4">
            <div className="flex items-center gap-2 ml-5">
            <IoMdMenu className="text-2xl inline mb-5 hover:cursor-pointer md:hidden" onClick={()=>setShowNav(true)}/>
                <p className="text-3xl font-bold mb-6 ">Seller Dashboard</p>
            </div>
                <Outlet />
            </div>
        </div>
    );
}
