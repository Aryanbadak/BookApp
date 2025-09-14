import { NavLink } from 'react-router-dom'

const NavItem = ({ to, children }:{ to:string; children:React.ReactNode }) => (
  <NavLink to={to} className={({isActive}) => 'block py-2 px-3 rounded ' + (isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100')}>
    {children}
  </NavLink>
)
export default function Sidebar() {
    return (
        <>
      <div className='mb-6 shadow-lg'>
        <div className='text-sm text-gray-500 mt-1 ps-6'>Manage your library</div>
      </div>
      <nav className="mt-6 space-y-2">
        <NavItem to='/dashboard'>Dashboard</NavItem>
        <NavItem to='/profile'>Profile</NavItem>
        <NavItem to='/books'>Books</NavItem>
      </nav>
  </>
    )
}
