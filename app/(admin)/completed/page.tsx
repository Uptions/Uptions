'use client'
import { useState } from 'react'

export default function ClosedDeliveries() {
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [driverFilter, setDriverFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  const completedDeliveries = [
    {
      orderNumber: 'Order #12345',
      pickup: '123 Elm Street',
      delivery: '456 Oak Avenue',
      status: 'Delivered',
      partner: 'Ethan Carter',
      date: '2024-03-15',
      timer: '14:30',
      distance: '15 km',
      cost: '$25'
    },
    {
      orderNumber: 'Order #67890',
      pickup: '789 Pine Road',
      delivery: '101 Maple Lane',
      status: 'Delivered',
      partner: 'Olivia Bennett',
      date: '2024-03-14',
      timer: '16:45',
      distance: '20 km',
      cost: '$30'
    },
    {
      orderNumber: 'Order #24680',
      pickup: '222 Cedar Court',
      delivery: '333 Birch Boulevard',
      status: 'Delivered',
      partner: 'Noah Thompson',
      date: '2024-03-13',
      timer: '12:15',
      distance: '10 km',
      cost: '$20'
    },
    {
      orderNumber: 'Order #13579',
      pickup: '444 Spruce Street',
      delivery: '555 Willow Way',
      status: 'Delivered',
      partner: 'Ava Harper',
      date: '2024-03-12',
      timer: '11:00',
      distance: '18 km',
      cost: '$28'
    },
    {
      orderNumber: 'Order #97531',
      pickup: '666 Ash Avenue',
      delivery: '777 Cherry Lane',
      status: 'Delivered',
      partner: 'Liam Foster',
      date: '2024-03-11',
      timer: '15:00',
      distance: '22 km',
      cost: '$32'
    }
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Closed Deliveries</h1>
        <p className="text-gray-600">View all completed deliveries</p>
      </div>

      
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search deliveries"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-blue-600 placeholder-blue-400"
          />
        </div>
      </div>

      {/* Filter Buttons - Separate Container */}
      <div className="mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            >
              <option value="">Status</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
            </select>
            <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            >
              <option value="">Date</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>
            <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="relative">
            <select
              value={driverFilter}
              onChange={(e) => setDriverFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            >
              <option value="">Driver</option>
              <option value="ethan">Ethan Carter</option>
              <option value="olivia">Olivia Bennett</option>
              <option value="noah">Noah Thompson</option>
              <option value="ava">Ava Harper</option>
              <option value="liam">Liam Foster</option>
            </select>
            <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">
                  Delivery Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">
                  Delivery partners
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">
                  Timer
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">
                  Distance
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {completedDeliveries.map((delivery, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">{delivery.orderNumber}</div>
                      <div className="text-sm text-gray-500">Pickup: {delivery.pickup}</div>
                      <div className="text-sm text-gray-500">Delivery: {delivery.delivery}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    {delivery.partner}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {delivery.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {delivery.timer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {delivery.distance}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {delivery.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="bg-white px-6 py-4 flex justify-between items-center border-t border-gray-200">
          <button className="text-gray-500 hover:text-gray-700 transition-colors font-medium">
            Previous
          </button>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}