// import React, { useState } from 'react';
// import { Heart } from 'lucide-react';

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 shadow-lg sticky top-0 z-50 relative overflow-hidden">
//       {/* Pet-themed background pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-2 left-10 text-white text-2xl">🐕</div>
//         <div className="absolute top-4 right-20 text-white text-xl">🐱</div>
//         <div className="absolute bottom-2 left-1/4 text-white text-lg">🐾</div>
//         <div className="absolute top-1 right-1/3 text-white text-lg">🦴</div>
//         <div className="absolute bottom-1 right-10 text-white text-xl">🐕</div>
//         <div className="absolute top-3 left-1/2 text-white text-lg">🐾</div>
//         <div className="absolute bottom-3 left-16 text-white text-xl">🐱</div>
//         <div className="absolute top-2 right-1/2 text-white text-lg">🦴</div>
//       </div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-full flex items-center justify-center mr-3 shadow-lg">
//               <Heart size={24} fill="currentColor" />
//             </div>
//             <h1 className="text-3xl font-bold text-white tracking-wide font-serif drop-shadow-lg">
//               PETRAKSHAK
//             </h1>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <a href="#home" className="text-white hover:text-yellow-200 transition-colors font-medium drop-shadow">
//               Home
//             </a>
//             <a href="#about" className="text-white hover:text-yellow-200 transition-colors font-medium drop-shadow">
//               About
//             </a>
//             <a href="#contact" className="text-white hover:text-yellow-200 transition-colors font-medium drop-shadow">
//               Contact
//             </a>
//             <a
//               href="#donate"
//               className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-opacity-30 transition-all duration-300 font-semibold shadow-lg border border-white border-opacity-30"
//             >
//               Donate
//             </a>
//           </nav>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="text-white focus:outline-none bg-white bg-opacity-20 p-2 rounded-lg backdrop-blur-sm"
//               aria-label="Toggle menu"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
//                 ></path>
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <nav className="md:hidden bg-white bg-opacity-95 backdrop-blur-md border-t border-white border-opacity-30 rounded-b-lg shadow-lg">
//             <ul className="flex flex-col py-4 space-y-2">
//               <li>
//                 <a
//                   href="#home"
//                   className="block px-4 py-3 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors font-medium rounded-lg mx-2"
//                 >
//                   🏠 Home
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#about"
//                   className="block px-4 py-3 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors font-medium rounded-lg mx-2"
//                 >
//                   ℹ️ About
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#contact"
//                   className="block px-4 py-3 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors font-medium rounded-lg mx-2"
//                 >
//                   📞 Contact
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#donate"
//                   className="block px-4 py-3 text-white bg-gradient-to-r from-orange-500 to-pink-500 mx-4 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-semibold text-center shadow-lg"
//                 >
//                   ❤️ Donate
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;