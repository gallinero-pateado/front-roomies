import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="h-screen">
            {/* Header */}
            <header className="flex h-20">
                <div className="flex-1 flex justify-center items-center bg-[#0092BC] relative">
                    <div className="absolute text-[#333] text-4xl font-bold animate-[focus-in-contract_3.5s_cubic-bezier(0.250,_0.460,_0.450,_0.940)_both_infinite] delay-0"></div>
                </div>
                <div className="flex-1 flex justify-center items-center bg-[#A3D9D3] relative">
                    <div className="absolute text-[#333] text-4xl font-bold animate-[focus-in-contract_3.5s_cubic-bezier(0.250,_0.460,_0.450,_0.940)_both_infinite] delay-8">ULINK</div>
                </div>
                <div className="flex-1 flex justify-center items-center bg-[#DAEDF2] relative">
                    <div className="absolute text-[#333] text-4xl font-bold animate-[focus-in-contract_3.5s_cubic-bezier(0.250,_0.460,_0.450,_0.940)_both_infinite] delay-16"></div>
                </div>
            </header>

            {/* Contenedor de opciones */}
            <div className="flex h-[calc(100vh-80px)]">
                <Link to="/registRoomie" className="flex-1 flex flex-col justify-start items-center bg-[#0092BC] text-white text-center transition duration-300 ease-in-out hover:bg-gray-800 p-8">
                    <div className="text-2xl mb-2">Rommies</div>
                </Link>
                <Link to="/" className="flex-1 flex flex-col justify-start items-center bg-[#A3D9D3] text-[#333] text-center transition duration-300 ease-in-out hover:bg-gray-800 p-8">
                    <div className="text-2xl mb-2">Practica</div>
                    
                </Link>
                <Link to="/" className="flex-1 flex flex-col justify-start items-center bg-[#DAEDF2] text-[#333] text-center transition duration-300 ease-in-out hover:bg-gray-800 p-8">
                    <div className="text-2xl mb-2">Descuentos</div>
                </Link>
            </div>
        </div>
    );
};

export default MainPage;
