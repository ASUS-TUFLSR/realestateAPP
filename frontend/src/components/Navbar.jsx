"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Building2, User, LayoutDashboard, LogOut, Search } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem("admin_token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

         
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
              <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-white drop-shadow-sm" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-600 to-blue-700 bg-clip-text text-transparent">
              RealEstate
            </h1>
          </Link>

          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1">
              <Link
                href="/listing"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium text-base transition-all duration-200 border-b-2 border-transparent hover:border-blue-600"
              >
                <Building2 className="w-4 h-4" />
                Listings
              </Link>
              <Link
                href="/search"
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 rounded-full hover:bg-blue-50"
              >
                <Search className="w-5 h-5" />
              </Link>
            </div>

            {!isAdmin ? (
              <Link
                href="/admin/login"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:shadow-blue-600/30 hover:scale-105 transition-all duration-300 border border-blue-600/20"
              >
                <User className="w-4 h-4" />
                Admin Login
              </Link>
            ) : (
              <>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 border-b-2 border-transparent hover:border-blue-600"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

         
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
          >
            {open ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        
        {open && (
          <div className="md:hidden overflow-hidden transition-all duration-300 ease-in-out">
            <div className="pb-6 pt-4 bg-white/95 backdrop-blur-md border-t border-gray-200">
              <div className="space-y-2 px-4">
                <Link
                  href="/listing"
                  onClick={() => setOpen(false)}
                  className="block py-3 px-4 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition-all duration-200 flex items-center gap-3"
                >
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Listings
                </Link>
                <div className="pl-7 py-2">
                  <Link
                    href="/search"
                    onClick={() => setOpen(false)}
                    className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Search Properties
                  </Link>
                </div>

                {!isAdmin ? (
                  <Link
                    href="/admin/login"
                    onClick={() => setOpen(false)}
                    className="block py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg hover:shadow-blue-600/30 transition-all duration-300 flex items-center gap-3 justify-center"
                  >
                    <User className="w-5 h-5" />
                    Admin Login
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setOpen(false)}
                      className="block py-3 px-4 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition-all duration-200 flex items-center gap-3"
                    >
                      <LayoutDashboard className="w-5 h-5 text-blue-600" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-lg hover:shadow-red-500/30 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;