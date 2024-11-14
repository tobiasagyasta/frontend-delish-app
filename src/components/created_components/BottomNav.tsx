import { useState } from 'react';
import { House, Search, UserRound } from 'lucide-react';

type Tab = 'home' | 'search' | 'profile';

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className='fixed bottom-0 w-full bg-white border-t border-t-gray-300'>
      <div className='flex justify-around py-2'>
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center ${activeTab === 'home' ? 'text-orange-500' : 'text-gray-500'}`}
        >
          <House className='w-7 h-7' />
          <span className='text-xs'>Home</span>
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center ${activeTab === 'search' ? 'text-orange-500' : 'text-gray-500'}`}
        >
          <Search className='w-7 h-7' />
          <span className='text-xs'>Pencarian</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-orange-500' : 'text-gray-500'}`}
        >
          <UserRound className='w-7 h-7'/>
          <span className='text-xs'>Profile</span>
        </button>
      </div>
    </div>
  )
}

export default BottomNav