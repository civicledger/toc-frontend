import { useContext } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, LogoutIcon, BellIcon, MapIcon } from '@heroicons/react/outline';
import { LoginContext } from '../../utilities/reducers';
import { authService } from '../../services';

import Logo from '../../assets/images/logo-white.png';
import UserImagePlaceholder from '../../assets/images/userImagePlaceholder.png';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/', current: true },
  {
    name: 'Notifications',
    icon: BellIcon,
    href: '/notifications',
    current: false,

    count: 7,
  },
  { name: 'All Entities', icon: UsersIcon, href: '/entities', current: false },
  { name: 'Find Places', icon: MapIcon, href: '/places', current: false },
];

const UserNav = () => {
  const {
    login: { user },
  } = useContext(LoginContext);

  const logout = () => {
    authService.logout();
    window.location.href = '/';
  };
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col flex-1 bg-gray-800">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-8 w-auto" src={Logo} alt="Placelink Logo" />
        </div>
        <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1" aria-label="Sidebar">
          {navigation.map(item => (
            <NavLink
              key={item.name}
              to={item.href}
              isActive={() => pathname === item.href}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              activeClassName="bg-gray-900"
            >
              <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300" aria-hidden="true" />
              <span className="flex-1">{item.name}</span>
              {item.count ? (
                <span className="ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full bg-gray-900 group-hover:bg-gray-800">
                  {item.count}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex bg-gray-700 p-4">
        <div href="#" className="flex-shrink-0 w-full block">
          <div className="flex items-center">
            <div>
              <img className="inline-block h-9 w-9 rounded-full" src={user.image ? user.image : UserImagePlaceholder} alt="" />
            </div>
            <div className="ml-3 flex-grow">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                <Link to="/profiles">View profile</Link>
              </p>
            </div>
            <div className="flex-shrink flex group hover:bg-gray-500 p-2 py-1 rounded cursor-pointer" onClick={logout}>
              <p className="group-hover:text-gray-300 text-gray-700 mr-2">Logout</p>
              <LogoutIcon className="text-gray-300 w-5 flex-shrink" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
