import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearFilters } from "../slices/shop";

export default function LandingPage() {
    const { category, search } = useSelector(state => state.shop);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearFilters());
    }, [dispatch]);

    useEffect(() => {
        if (category || search) {
            navigate("/products");
        }
    }, [category, search, navigate]);

    return (
        <div className="flex flex-col items-center p-5 font-sans  min-h-screen">
            {/* <header className="flex justify-between w-full max-w-screen-lg p-5 ">
            <h1 className="text-xl font-bold">E-COMPANY</h1>
            <nav className="flex gap-5">
              <a href="#home" className="text-gray-800 font-bold hover:text-indigo-600">Home</a>
              <a href="#about" className="text-gray-800 font-bold hover:text-indigo-600">About Us</a>
              <a href="#product" className="text-gray-800 font-bold hover:text-indigo-600">Product</a>
              <a href="#contact" className="text-gray-800 font-bold hover:text-indigo-600">Contact Us</a>
            </nav>
          </header> */}
            <main className="flex flex-col lg:flex-row justify-between items-center w-full max-w-screen-lg mt-12">
                <div className="max-w-md">
                    <h1 className="text-4xl lg:text-6xl text-gray-800">Sustainable Product Market Place</h1>
                    <p className="mt-5 text-lg text-gray-600">

                        Sustainable development in e-commerce focuses on incorporating environmentally friendly practices into online retail to minimize ecological impact while promoting economic growth. This approach involves using eco-friendly packaging materials, such as recyclable or biodegradable options, to reduce waste. It also includes implementing green logistics by optimizing transportation routes and adopting energy-efficient methods to lower carbon emissions.
                    </p>

                </div>
                <div className="max-w-xl mt-10 lg:mt-0">
                    {/* <img src="path/to/your/image.png" alt="E-Commerce" className="w-full" /> */}
                </div>
            </main>
            <footer className="mt-auto p-5 w-full max-w-screen-lg text-center ">
                <p>&copy; 2024 E-Company. All rights reserved.</p>
                <div className="flex justify-center gap-5 mt-2">
                    <a href="#facebook" className="text-gray-800 text-2xl hover:text-indigo-600">F</a>
                    <a href="#instagram" className="text-gray-800 text-2xl hover:text-indigo-600">I</a>
                    <a href="#twitter" className="text-gray-800 text-2xl hover:text-indigo-600">T</a>
                </div>
            </footer>
        </div>
    );
}
