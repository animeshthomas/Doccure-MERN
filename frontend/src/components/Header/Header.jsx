import { useEffect, useRef, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext.jsx";
import logo from "../../assets/images/logo.png";

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/doctors', display: 'Find a Doctor' },
  { path: '/services', display: 'Services' },
  { path: '/contact', display: 'Contact' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    const onScroll = () => {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        headerRef.current?.classList.add('sticky__header', 'shadow-md');
      } else {
        headerRef.current?.classList.remove('sticky__header', 'shadow-md');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  };

  useEffect(() => {
    const cleanup = handleStickyHeader();
    return cleanup;
  }, []);

  const toggleMenu = () => menuRef.current?.classList.toggle('show__menu');

  return (
    <header className="header flex items-center h-[80px] bg-white/80 backdrop-blur-lg border-b border-slate-100 transition-all duration-300" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2 transform transition-transform hover:scale-105">
            <img src={logo} alt="Doccure Logo" className="h-[42px] object-contain" />
          </Link>

          <div className="navigation hidden md:flex" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-[15px] font-[600] relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primaryColor after:rounded-full"
                        : "text-textColor text-[15px] font-[500] hover:text-primaryColor transition-all duration-200 py-1"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : role === "admin"
                        ? "/admin/profile/me"
                        : "/users/profile/me"
                  }
                  className="block relative group"
                >
                  {role === "admin" ? (
                    <img
                      src="https://is1-ssl.mzstatic.com/image/thumb/Purple115/v4/52/ea/25/52ea2517-c18e-a869-c8e0-f559fb31c4c2/source/512x512bb.jpg"
                      className="w-[40px] h-[40px] rounded-full ring-2 ring-primaryColor/30 group-hover:ring-primaryColor transition-all cursor-pointer object-cover shadow-sm"
                      alt="Admin Icon"
                    />
                  ) : (
                    <figure className="w-[40px] h-[40px] rounded-full ring-2 ring-primaryColor/30 group-hover:ring-primaryColor transition-all cursor-pointer overflow-hidden shadow-sm">
                      <img
                        src={user?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                        className="w-full h-full object-cover"
                        alt={user?.name || "User profile"}
                      />
                    </figure>
                  )}
                </Link>
              </div>
            ) : (
              <Link to='/login'>
                <button className="bg-primaryColor hover:bg-primaryDark text-white text-[15px] font-[600] h-[42px] px-6 rounded-full flex items-center justify-center transition-all duration-200 shadow-cardGlow hover:shadow-cardHover transform active:scale-95">
                  Login
                </button>
              </Link>
            )}

            <button 
              type="button" 
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
            >
              <BiMenu className='w-7 h-7 cursor-pointer' />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
