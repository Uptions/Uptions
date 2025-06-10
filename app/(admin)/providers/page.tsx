'use client'
import { useState } from 'react'

export default function DeliveryProviders() {
  const [selectedProvider, setSelectedProvider] = useState<{ name: string; status: string } | null>(null)
  const [showAddProvider, setShowAddProvider] = useState(false)
  
  const providers = [
    { name: 'Express Delivery', status: 'Active' },
    { name: 'Rapid Couriers', status: 'Inactive' },
    { name: 'Global Logistics', status: 'Active' },
    { name: 'Local Freight', status: 'Active' },
    { name: 'Overnight Express', status: 'Inactive' },
    { name: 'International Shipping', status: 'Active' },
    { name: 'Same-Day Delivery', status: 'Active' },
    { name: 'Eco-Friendly Shipping', status: 'Inactive' },
    { name: 'Premium Cargo Services', status: 'Active' }
  ]

  const [providerDetails, setProviderDetails] = useState({
    companyName: 'Express Delivery',
    contactEmail: 'Express.Delivery@gmail.com',
    deliveryPrice: '₦500',
    phoneNumber: '+234 832 456 2345',
    address: 'No. 2 Odenigwe East road Abuja'
  })

  
  if (selectedProvider) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Providers</h1>
          <h2 className="text-xl font-semibold text-gray-900">Manage Providers</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h3>
          
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={providerDetails.companyName}
                onChange={(e) => setProviderDetails({...providerDetails, companyName: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={providerDetails.contactEmail}
                onChange={(e) => setProviderDetails({...providerDetails, contactEmail: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery price/ KM
              </label>
              <input
                type="text"
                value={providerDetails.deliveryPrice}
                onChange={(e) => setProviderDetails({...providerDetails, deliveryPrice: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={providerDetails.phoneNumber}
                onChange={(e) => setProviderDetails({...providerDetails, phoneNumber: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={providerDetails.address}
                onChange={(e) => setProviderDetails({...providerDetails, address: e.target.value})}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Update Information
            </button>
            <button className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors">
              Deactivate
            </button>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Delete partner
            </button>
          </div>

          <button
            onClick={() => setSelectedProvider(null)}
            className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
          >
            ← Back to providers list
          </button>
        </div>
      </div>
    )
  }

  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Providers</h1>
          <h2 className="text-xl font-semibold text-gray-900">Manage Providers</h2>
        </div>
        <button
          onClick={() => setShowAddProvider(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Provider
        </button>
      </div>

      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">
                  Provider
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {providers.map((provider, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                  onClick={() => setSelectedProvider(provider)}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {provider.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      provider.status === 'Active' 
                        ? 'bg-gray-200 text-gray-800' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {provider.status}
                    </span>
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

      
      {showAddProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Provider</h3>
              <button
                onClick={() => setShowAddProvider(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Price per KM
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price per KM"
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowAddProvider(false)}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Add Provider
              </button>
              <button
                onClick={() => setShowAddProvider(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}