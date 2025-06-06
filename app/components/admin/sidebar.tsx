'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/public/assets/images/admin-logo.svg'
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      id: 'incoming',
      label: 'Incoming Requests',
      path: '/incoming',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-3" />
        </svg>
      )
    },
    {
      id: 'active',
      label: 'Active Deliveries',
      path: '/active-deliveries',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'completed',
      label: 'Completed',
      path: '/completed',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      id: 'providers',
      label: 'Delivery Providers',
      path: '/providers',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    }
  ];

  // Function to check if the current path is activ
  const isActive = (path: string) => {
    return pathname === path;
  };

  
  const handleLogout = () => {
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      
    }
    
    
    router.push('/login');
  };

  return (
    <div className="w-64 bg-gray-50 shadow-lg h-screen flex flex-col">
      {/* Header */}
      <div className="pt-6 pl-8">
        <div>
          <Image src={Logo} alt="Admin Logo" className="" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <Link 
            key={item.id}
            href={item.path}
            className={`w-full flex items-center p-3 rounded-lg mb-2 transition-colors ${
              isActive(item.path)
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;