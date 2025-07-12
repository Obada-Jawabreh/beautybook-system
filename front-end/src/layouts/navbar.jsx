import { useState, useEffect } from "react";
import { Menu, X, User, Settings, Bell, LogOut } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "My Appointments", href: "/appointments" },
  { label: "My Services", href: "/services" },
  { label: "Staff", href: "/staff" },
  { label: "Reports", href: "/reports" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setMobileMenuOpen(false);
  };

  const NavItem = ({ link, isMobile = false }) => {
    const isActive = activeLink === link.href;
    const baseClass = `block w-full text-left font-medium text-gray-700 transition-all duration-300 cursor-pointer ${
      isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
    }`;

    return (
      <div className={isMobile ? "border-b border-gray-100" : "relative group"}>
        <div
          className={`${baseClass} ${
            isMobile
              ? "px-6 py-4 text-base hover:bg-gray-50"
              : "px-4 py-2 text-sm xl:text-base rounded-lg hover:bg-gray-50"
          }`}
          onClick={() => handleLinkClick(link.href)}
        >
          {link.label}
        </div>

        {!isMobile && isActive && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full" />
        )}
      </div>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 px-6 py-4 flex items-center justify-between bg-white shadow-sm z-[9999] border-b border-gray-100">
        <div
          className="flex items-center gap-3 min-w-[200px] z-10 cursor-pointer"
          onClick={() => handleLinkClick("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">BeautyBook</span>
        </div>

        <ul className="hidden lg:flex gap-2 xl:gap-4 relative mx-auto">
          {navLinks.map((link, index) => (
            <NavItem key={index} link={link} />
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-gray-200"></div>
            <button className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">John Doe</span>
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[101] lg:hidden transform transition-all duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                BeautyBook
              </span>
            </div>
            <button
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{
                  transitionDelay: mobileMenuOpen
                    ? `${(index + 1) * 100}ms`
                    : "0ms",
                }}
              >
                <NavItem link={link} isMobile />
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  John Doe
                </div>
                <div className="text-xs text-gray-500">Staff Member</div>
              </div>
            </div>
            <button
              className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
