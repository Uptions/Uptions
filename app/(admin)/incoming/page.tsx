'use client'
import { useState } from 'react'

export default function PendingRequests() {
  type PendingRequest = {
    id: string;
    datetime: string;
    sender: string;
    status: string;
  };

  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null)
  
  const pendingRequests: PendingRequest[] = [
    {
      id: '#54321',
      datetime: '2024-01-16 09:00 AM',
      sender: 'Mia Thompson',
      status: 'Awaiting Approval'
    },
    {
      id: '#54322',
      datetime: '2024-01-16 10:30 AM',
      sender: 'Noah Smith',
      status: 'Awaiting Approval'
    },
    {
      id: '#54323',
      datetime: '2024-01-16 11:45 AM',
      sender: 'Emma Johnson',
      status: 'Awaiting Approval'
    },
    {
      id: '#54324',
      datetime: '2024-01-16 01:15 PM',
      sender: 'James Brown',
      status: 'Awaiting Approval'
    },
    {
      id: '#54325',
      datetime: '2024-01-16 02:30 PM',
      sender: 'Isabella Davis',
      status: 'Awaiting Approval'
    }
  ]

  const requestDetails = {
    sender: { 
      name: 'Ethan Carter', 
      phone: '+1 (555) 123-4567', 
      email: 'ethan.carter@email.com' 
    },
    receiver: { 
      name: 'Olivia Bennett', 
      phone: '+1 (555) 987-6543', 
      email: 'olivia.bennett@email.com' 
    },
    package: { 
      price: '₦250,000.00', 
      weight: '2 kg' 
    },
    locations: { 
      pickup: '123 Maple Street, Anytown, USA', 
      dropoff: '456 Oak Avenue, Anytown, USA' 
    },
    deliveryOption: 'Dumto and Sons',
    note: { 
      description: 'Food', 
      instructions: 'Call when you get to courtwright...at the gate call me' 
    },
    payment: { 
      price: '₦3,500', 
      status: 'Paid' 
    }
  }

  
  if (selectedRequest) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Request Details</h1>
            <p className="text-gray-600 mt-1">View and manage the details of this delivery request.</p>
          </div>
          <button
            onClick={() => setSelectedRequest(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sender Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Name</label>
                <p className="text-gray-900">{requestDetails.sender.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Phone</label>
                <p className="text-gray-900">{requestDetails.sender.phone}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
                <p className="text-gray-900">{requestDetails.sender.email}</p>
              </div>
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Receiver Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Name</label>
                <p className="text-gray-900">{requestDetails.receiver.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Phone</label>
                <p className="text-gray-900">{requestDetails.receiver.phone}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
                <p className="text-gray-900">{requestDetails.receiver.email}</p>
              </div>
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Price</label>
                <p className="text-gray-900">{requestDetails.package.price}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Weight</label>
                <p className="text-gray-900">{requestDetails.package.weight}</p>
              </div>
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Locations</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Pickup Address</label>
                <p className="text-gray-900">{requestDetails.locations.pickup}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Drop-off Address</label>
                <p className="text-gray-900">{requestDetails.locations.dropoff}</p>
              </div>
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Option</h3>
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Option</label>
              <p className="text-gray-900">{requestDetails.deliveryOption}</p>
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Note</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Package description</label>
                <p className="text-gray-900">{requestDetails.note.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Additional Instruction</label>
                <p className="text-gray-900">{requestDetails.note.instructions}</p>
              </div>
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Delivery price</label>
                <p className="text-gray-900">{requestDetails.payment.price}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">Status</label>
                <p className="text-gray-900">{requestDetails.payment.status}</p>
              </div>
            </div>
          </div>

          
          <div className="flex gap-4 pt-6">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Approve/Assign
            </button>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Reject
            </button>
          </div>
        </div>
      </div>
    )
  }

  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Pending Requests</h1>
      </div>
      
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                  Request ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                  Date/Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                  Sender
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pendingRequests.map((request, index) => (
                <tr 
                  key={request.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                  onClick={() => setSelectedRequest(request)}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    {request.datetime}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    {request.sender}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{request.status}</span>
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