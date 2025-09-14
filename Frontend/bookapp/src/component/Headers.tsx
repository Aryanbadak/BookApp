import { Input } from 'antd'

export default function Header() {
    return (
       <header className='header'>
      <div className='flex items-center gap-4'>
        <div className='text-lg font-semibold flex items-center gap-5'>
            <img src="Profile.png" className='w-1/12' alt="" />
            <Input.Search placeholder='Search books...' style={{ width: 240 }} />
        </div>
        <div className='hidden md:block'></div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='text-sm text-gray-600'>Hi, User</div>
      </div>
    </header>
    )
}