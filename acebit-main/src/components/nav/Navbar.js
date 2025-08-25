import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Home, Info, Users, Calendar, Image, Award, Settings } from "lucide-react";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Faculty", href: "/faculty", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Gallery", href: "/gallery", icon: Image },
    { 
      name: "Team", 
      href: "#",
      icon: Award,
      dropdown: [
        { name: "2K23", href: "/team2k23" },
        { name: "2K22", href: "/core" },
        { name: "2K21", href: "/team2k21" },
        { name: "2K20", href: "/team2k20" }
      ]
    },
    { 
      name: "Others", 
      href: "#",
      icon: Settings,
      dropdown: [
        { name: "Constitution", href: "/constitution" },
        { name: "Magazine", href: "/magazine" },
        { name: "Contact Us", href: "/contact" },
        { name: "Laboratory", href: "/lab" }
      ]
    }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-blue-300/95 via-blue-400/95 to-indigo-400/95 backdrop-blur-xl shadow-2xl border-b border-blue-500/50' 
          : 'bg-gradient-to-r from-blue-600/95 via-blue-700/95 to-indigo-700/95 backdrop-blur-xl shadow-2xl border-b border-blue-600/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-transform duration-300 group"
          >
            <div className="relative">
              <img
                src={logo}
                alt="ACE Logo"
                className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 object-contain group-hover:rotate-12 transition-transform duration-300"
              />
            </div>
            <div>
              <span className={`text-lg sm:text-xl lg:text-3xl font-bold font-heading ${
                scrolled ? 'text-slate-800' : 'text-white'
              }`}>
                ACE BITS
              </span>
              <div className={`text-xs sm:text-sm lg:text-sm font-medium ${
                scrolled ? 'text-slate-600' : 'text-blue-100'
              }`}>
                Association Of Civil Engineers
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} scrolled={scrolled} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleNavbar}
            className={`lg:hidden p-2 sm:p-3 rounded-xl hover:scale-95 transition-all duration-300 ${
              scrolled ? 'text-slate-800 hover:bg-blue-200/50' : 'text-white hover:bg-white/20'
            }`}
          >
            {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className="lg:hidden bg-gradient-to-b from-blue-600/95 to-indigo-700/95 backdrop-blur-xl border-t border-blue-600/50 animate-slide-down z-50"
        >
          <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 max-h-[75vh] overflow-y-auto">
            {navItems.map((item, index) => (
              <MobileNavItem key={index} item={item} onClose={() => setIsOpen(false)} />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ item, scrolled }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (item.dropdown) {
    return (
      <div className="relative">
        <button
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            scrolled 
              ? 'text-slate-800 hover:text-blue-800 hover:bg-blue-200/50' 
              : 'text-yellow-200 hover:text-yellow-100 hover:bg-white/20'
          }`}
        >
          <item.icon size={20} className="drop-shadow-lg" />
          <span className="drop-shadow-sm">{item.name}</span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            className="absolute top-full left-0 mt-2 w-56 bg-gradient-to-b from-blue-200/95 to-indigo-300/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-400/50 py-3 animate-scale-in"
          >
            {item.dropdown.map((dropdownItem, index) => (
              <a
                key={index}
                href={dropdownItem.href}
                className="flex items-center space-x-3 px-4 py-3 text-slate-800 hover:text-blue-800 hover:bg-blue-200/50 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="font-medium">{dropdownItem.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
        scrolled 
          ? 'text-slate-800 hover:text-blue-800 hover:bg-blue-200/50' 
          : 'text-yellow-200 hover:text-yellow-100 hover:bg-white/20'
      }`}
    >
      <item.icon size={20} className="drop-shadow-lg" />
      <span className="drop-shadow-sm">{item.name}</span>
    </a>
  );
};

const MobileNavItem = ({ item, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (item.dropdown) {
    return (
      <div>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-yellow-200 hover:text-yellow-100 hover:bg-white/20 rounded-xl transition-all duration-300"
        >
          <div className="flex items-center space-x-2 sm:space-x-3">
            <item.icon size={20} className="sm:w-6 sm:h-6 drop-shadow-lg" />
            <span className="text-sm sm:text-base font-medium drop-shadow-sm">{item.name}</span>
          </div>
          <ChevronDown 
            size={18} 
            className={`sm:w-5 sm:h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isDropdownOpen && (
          <div className="ml-6 sm:ml-8 mt-2 space-y-1 animate-slide-up">
            {item.dropdown.map((dropdownItem, index) => (
              <a
                key={index}
                href={dropdownItem.href}
                onClick={onClose}
                className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 text-blue-100 hover:text-yellow-200 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-sm sm:text-base font-medium">{dropdownItem.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      onClick={onClose}
      className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 text-yellow-200 hover:text-yellow-100 hover:bg-white/20 rounded-xl transition-all duration-300"
    >
      <item.icon size={20} className="sm:w-6 sm:h-6 drop-shadow-lg" />
      <span className="text-sm sm:text-base font-medium drop-shadow-sm">{item.name}</span>
    </a>
  );
};

export default Navbar;
