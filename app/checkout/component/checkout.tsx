'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

// TypeScript interfaces
interface FormData {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  pickupAddress: string;
  senderState: string;
  senderCity: string;
  senderSameAsReceiver: boolean;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  deliveryAddress: string;
  receiverState: string;
  receiverCity: string;
  packageValue: string;
  packageVehicleType: string;
  packageWeight: string;
  packageDescription?: string;
  additionalInstructions?: string;
  timestamp: string;
  formCompleted: boolean;
  completedAt?: string;
}

interface OrderData {
  orderNumber: string;
  sender: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  receiver: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  package: {
    deliveryProvider: string;
    value: string;
    vehicleType: string;
    weight: string;
    description: string;
    additionalInstructions: string;
  };
  payment: {
    subtotal: string;
    serviceCharge: string;
    total: string;
    rawSubtotal: number;
    rawServiceCharge: number;
    rawTotal: number;
  };
  metadata: {
    formTimestamp: string;
    completedAt?: string;
    orderDate: string;
    orderTime: string;
    estimatedDelivery: string;
  };
}

type VehicleType = 'Bike' | 'Keke' | 'Car' | 'Van' | 'Truck';
type StateType = 'Lagos' | 'Abuja' | 'Rivers' | 'Kano' | 'Kaduna' | 'Oyo';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  
  // State management with proper types
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Calculate service charge based on package value and vehicle type
  const calculateServiceCharge = (packageValue: string, vehicleType: string): number => {
    // Remove currency symbols and convert to number
    const baseValue = parseInt(packageValue.replace(/[₦,]/g, '')) || 0;
    
    // Service charge calculation logic based on vehicle type
    let chargeRate = 0.025; // 2.5% base rate
    
    switch(vehicleType?.toLowerCase()) {
      case 'bike':
        chargeRate = 0.02; // 2%
        break;
      case 'keke':
        chargeRate = 0.025; // 2.5%
        break;
      case 'car':
        chargeRate = 0.03; // 3%
        break;
      case 'van':
        chargeRate = 0.035; // 3.5%
        break;
      case 'truck':
        chargeRate = 0.04; // 4%
        break;
      default:
        chargeRate = 0.025;
    }
    
    // Calculate service charge with minimum of ₦500
    const serviceCharge = Math.max(baseValue * chargeRate, 500);
    return Math.round(serviceCharge);
  };

  // Calculate total amount
  const calculateTotal = (packageValue: string, serviceCharge: number): number => {
    const value = parseInt(packageValue.replace(/[₦,]/g, '')) || 0;
    return value + serviceCharge;
  };

  // Format currency for display
  const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString()}`;
  };

  // Get delivery provider based on location and vehicle type
  const getDeliveryProvider = (senderState: string, receiverState: string, vehicleType: string): string => {
    const providers: Record<string, string[]> = {
      'Lagos': ['Lagos Express Delivery', 'Swift Lagos', 'Eko Logistics'],
      'Abuja': ['Capital Express', 'Dumto and Sons', 'Abuja Metro Delivery'],
      'Rivers': ['Port Harcourt Delivery', 'Niger Delta Express', 'Garden City Logistics'],
      'Kano': ['Northern Express', 'Sahel Logistics', 'Kano Fast Delivery'],
      'Kaduna': ['Kaduna Express', 'Northern Logistics', 'Zaria Delivery'],
      'Oyo': ['Ibadan Express', 'Oyo State Logistics', 'Ancient City Delivery'],
      'default': ['Universal Express', 'National Delivery Service', 'Swift Logistics']
    };
    
    const stateProviders = providers[senderState as StateType] || providers[receiverState as StateType] || providers['default'];
    
    // Select provider based on vehicle type preference
    if (vehicleType === 'Bike' || vehicleType === 'Keke') {
      return stateProviders[0]; // Fast delivery for smaller vehicles
    } else if (vehicleType === 'Truck' || vehicleType === 'Van') {
      return stateProviders[1]; // Heavy duty providers
    }
    
    return stateProviders[0];
  };

  // Calculate estimated delivery time
  const getEstimatedDelivery = (senderState: string, receiverState: string, vehicleType: string): string => {
    let hours = 24; // Default 24 hours
    
    // Same state delivery
    if (senderState === receiverState) {
      switch(vehicleType) {
        case 'Bike':
          hours = 2;
          break;
        case 'Keke':
          hours = 4;
          break;
        case 'Car':
          hours = 6;
          break;
        case 'Van':
          hours = 12;
          break;
        case 'Truck':
          hours = 24;
          break;
        default:
          hours = 8;
      }
    } else {
      // Inter-state delivery
      switch(vehicleType) {
        case 'Bike':
          hours = 48;
          break;
        case 'Keke':
          hours = 72;
          break;
        case 'Car':
          hours = 24;
          break;
        case 'Van':
          hours = 48;
          break;
        case 'Truck':
          hours = 72;
          break;
        default:
          hours = 48;
      }
    }
    
    const deliveryDate = new Date();
    deliveryDate.setHours(deliveryDate.getHours() + hours);
    
    return deliveryDate.toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Load and process form data from sessionStorage
  useEffect(() => {
    const loadFormData = (): void => {
      try {
        // Check if we're on the client side
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }

        // Updated to use sessionStorage instead of localStorage
        const savedFormData = sessionStorage.getItem('deliveryFormData');
        
        if (!savedFormData) {
          setError('No delivery information found. Please complete the delivery form first.');
          setLoading(false);
          return;
        }

        const formData: FormData = JSON.parse(savedFormData);
        
        // Validate that form was completed
        if (!formData.formCompleted) {
          setError('Delivery form not completed. Please finish filling out the form.');
          setLoading(false);
          return;
        }

        // Validate required fields
        const requiredFields: (keyof FormData)[] = [
          'senderName', 'senderEmail', 'senderPhone', 'pickupAddress', 'senderState', 'senderCity',
          'receiverName', 'receiverEmail', 'receiverPhone', 'deliveryAddress', 'receiverState', 'receiverCity',
          'packageValue', 'packageVehicleType', 'packageWeight'
        ];

        const missingFields = requiredFields.filter(field => !formData[field] || formData[field].toString().trim() === '');
        
        if (missingFields.length > 0) {
          setError(`Missing required information: ${missingFields.join(', ')}`);
          setLoading(false);
          return;
        }

        // Handle packageValue - ensure it has ₦ symbol if not present
        let packageValue = formData.packageValue;
        if (!packageValue.includes('₦')) {
          // If packageValue is just a number, add ₦ symbol
          const numericValue = parseInt(packageValue.replace(/[^\d]/g, '')) || 0;
          packageValue = `₦${numericValue.toLocaleString()}`;
        }

        // Calculate pricing
        const serviceCharge = calculateServiceCharge(packageValue, formData.packageVehicleType);
        const deliveryProvider = getDeliveryProvider(formData.senderState, formData.receiverState, formData.packageVehicleType);

        // Process and format the order data
        const processedOrderData: OrderData = {
          orderNumber: `UP-${Date.now().toString().slice(-8)}`, // Generate order number
          sender: {
            name: formData.senderName,
            address: `${formData.pickupAddress}, ${formData.senderCity}, ${formData.senderState}`,
            phone: formData.senderPhone,
            email: formData.senderEmail
          },
          receiver: {
            name: formData.receiverName,
            address: `${formData.deliveryAddress}, ${formData.receiverCity}, ${formData.receiverState}`,
            phone: formData.receiverPhone,
            email: formData.receiverEmail
          },
          package: {
            deliveryProvider: deliveryProvider,
            value: packageValue,
            vehicleType: formData.packageVehicleType,
            weight: formData.packageWeight,
            description: formData.packageDescription || 'No description provided',
            additionalInstructions: formData.additionalInstructions || 'No special instructions'
          },
          payment: {
            subtotal: packageValue,
            serviceCharge: formatCurrency(serviceCharge),
            total: formatCurrency(calculateTotal(packageValue, serviceCharge)),
            // Store raw numbers for calculations
            rawSubtotal: parseInt(packageValue.replace(/[₦,]/g, '')),
            rawServiceCharge: serviceCharge,
            rawTotal: calculateTotal(packageValue, serviceCharge)
          },
          metadata: {
            formTimestamp: formData.timestamp,
            completedAt: formData.completedAt,
            orderDate: new Date().toLocaleDateString('en-NG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            orderTime: new Date().toLocaleTimeString('en-NG', {
              hour: '2-digit',
              minute: '2-digit'
            }),
            estimatedDelivery: getEstimatedDelivery(formData.senderState, formData.receiverState, formData.packageVehicleType)
          }
        };

        setOrderData(processedOrderData);
        setLoading(false);

      } catch (err) {
        console.error('Error loading form data:', err);
        setError('Error loading delivery information. Please try again.');
        setLoading(false);
      }
    };

    loadFormData();
  }, []);

  // Handle checkout process
  const handleCheckout = async (): Promise<void> => {
    if (isProcessing || !orderData) return;
    
    setIsProcessing(true);
    
    try {
      // Create order and save to sessionStorage for tracking
      const orderForTracking = {
        ...orderData,
        status: 'pending_payment',
        createdAt: new Date().toISOString()
      };

      // Save order to sessionStorage for tracking purposes
      sessionStorage.setItem(`order_${orderData.orderNumber}`, JSON.stringify(orderForTracking));

      // Save payment details to sessionStorage for the payment page
      sessionStorage.setItem('paymentData', JSON.stringify({
        orderNumber: orderData.orderNumber,
        amount: orderData.payment.rawTotal,
        formattedAmount: orderData.payment.total
      }));
      
      // Redirect to payment page directly - no alerts
      router.push('/payment');
      
    } catch (error) {
      console.error('Checkout error:', error);
      // Only show error if there's an actual error
      alert('Error processing checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Navigate back to delivery form
  const goBackToForm = (): void => {
    router.push('/Try-Uptions'); // Adjust path as needed
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Checkout - Uption Delivery</title>
        </Head>
        <div className='font-space min-h-screen p-6 bg-gray-50 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-[#007BFF] mx-auto'></div>
            <p className='mt-4 text-[#001B6C] text-lg'>Loading checkout information...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Head>
          <title>Checkout Error - Uption Delivery</title>
        </Head>
        <div className='font-space min-h-screen p-6 bg-gray-50 flex items-center justify-center'>
          <div className='text-center max-w-md bg-white p-8 rounded-lg shadow-lg'>
            <div className='text-red-500 text-6xl mb-4'>⚠️</div>
            <h2 className='text-2xl font-bold text-[#001B6C] mb-4'>Oops! Something went wrong</h2>
            <p className='text-gray-600 mb-6'>{error}</p>
            <button
              onClick={goBackToForm}
              className='px-6 py-3 bg-[#007BFF] text-white font-bold rounded-lg hover:bg-[#0056b3] focus:outline-none focus:ring-4 focus:ring-[#0056b3] transition-colors'
            >
              Go to Delivery Form
            </button>
          </div>
        </div>
      </>
    );
  }

  // Null check for orderData
  if (!orderData) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Checkout - Order {orderData.orderNumber} | Uption Delivery</title>
        <meta name="description" content="Complete your delivery order checkout" />
      </Head>
      
      <div className='font-space min-h-screen p-6 '>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h1 className='text-[48px] font-bold text-[#007BFF]'>
                Checkout
              </h1>
              <p className='text-lg text-gray-600'>Order #{orderData.orderNumber}</p>
            </div>
            <div className='text-sm text-gray-600 text-right'>
              <p>Order Date: {orderData.metadata.orderDate}</p>
              <p>Order Time: {orderData.metadata.orderTime}</p>
              <p className='text-[#007BFF] font-medium'>Est. Delivery: {orderData.metadata.estimatedDelivery}</p>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left Column - Shipping Details */}
            <div className='space-y-6'>
              {/* Sender Details */}
              <div className='bg-white rounded-lg p-6 shadow-md'>
                <h2 className='text-gray-600 text-sm font-medium mb-4 border-b border-gray-300 pb-2'>
                  SHIPPING DETAILS: <span className='text-[#007BFF]'>Sender</span>
                </h2>
                <div className='space-y-3'>
                  <p className='text-[#001B6C] font-medium text-lg'>{orderData.sender.name}</p>
                  <p className='text-[#001B6C]'>{orderData.sender.address}</p>
                  <p className='text-[#001B6C]'>{orderData.sender.phone}</p>
                  <p className='text-[#001B6C]'>{orderData.sender.email}</p>
                </div>
              </div>

              {/* Receiver Details */}
              <div className='bg-white rounded-lg p-6 shadow-md'>
                <h2 className='text-gray-600 text-sm font-medium mb-4 border-b border-gray-300 pb-2'>
                  SHIPPING DETAILS: <span className='text-[#007BFF]'>Receiver</span>
                </h2>
                <div className='space-y-3'>
                  <p className='text-[#001B6C] font-medium text-lg'>{orderData.receiver.name}</p>
                  <p className='text-[#001B6C]'>{orderData.receiver.address}</p>
                  <p className='text-[#001B6C]'>{orderData.receiver.phone}</p>
                  <p className='text-[#001B6C]'>{orderData.receiver.email}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Package & Payment Details */}
            <div className='space-y-6'>
              {/* Package Details */}
              <div className='bg-white rounded-lg p-6 shadow-md'>
                <h2 className='text-gray-600 text-sm font-medium mb-4 border-b border-gray-300 pb-2'>
                  SHIPPING DETAILS: <span className='text-[#007BFF]'>Package</span>
                </h2>
                <div className='space-y-3'>
                  <div className='flex'>
                    <span className='text-[#001B6C] font-medium w-36'>Delivery provider:</span>
                    <span className='text-[#007BFF]'>{orderData.package.deliveryProvider}</span>
                  </div>
                  <div className='flex'>
                    <span className='text-[#001B6C] font-medium w-36'>Value:</span>
                    <span className='text-[#007BFF]'>{orderData.package.value}</span>
                  </div>
                  <div className='flex'>
                    <span className='text-[#001B6C] font-medium w-36'>Vehicle type:</span>
                    <span className='text-[#007BFF]'>{orderData.package.vehicleType}</span>
                  </div>
                  <div className='flex'>
                    <span className='text-[#001B6C] font-medium w-36'>Weight:</span>
                    <span className='text-[#007BFF]'>{orderData.package.weight}</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[#001B6C] font-medium'>Package description:</span>
                    <span className='text-[#001B6C] mt-1'>{orderData.package.description}</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[#001B6C] font-medium'>Additional Instructions:</span>
                    <span className='text-[#007BFF] mt-1'>{orderData.package.additionalInstructions}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className='bg-white rounded-lg p-6 shadow-md'>
                <h2 className='text-gray-600 text-sm font-medium mb-4 border-b border-gray-300 pb-2'>
                  PAYMENT DETAILS:
                </h2>
                <div className='space-y-4'>
                  <div className='flex justify-between'>
                    <span className='text-[#001B6C] font-medium'>Subtotal:</span>
                    <span className='text-[#007BFF] font-bold'>{orderData.payment.subtotal}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-[#001B6C] font-medium'>Service charge:</span>
                    <span className='text-[#007BFF] font-bold'>{orderData.payment.serviceCharge}</span>
                  </div>
                  <div className='border-t pt-4'>
                    <div className='flex justify-between text-xl'>
                      <span className='text-[#001B6C] font-bold'>Total:</span>
                      <span className='text-[#007BFF] font-bold'>{orderData.payment.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
                <h3 className='text-[#007BFF] font-medium mb-2'>📦 Delivery Information</h3>
                <p className='text-sm text-gray-600'>
                  Your package will be delivered by <strong>{orderData.package.deliveryProvider}</strong> using a {orderData.package.vehicleType.toLowerCase()}.
                </p>
                <p className='text-sm text-gray-600 mt-1'>
                  Expected delivery: <strong>{orderData.metadata.estimatedDelivery}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='mt-12 flex justify-center space-x-4'>
            <button
              onClick={goBackToForm}
              disabled={isProcessing}
              className='px-8 py-4 bg-gray-300 text-gray-700 font-bold text-lg rounded-xl hover:bg-gray-400 focus:outline-none transition-colors disabled:opacity-50'
            >
              ← Back to Form
            </button>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className='px-12 py-4 bg-[#007BFF] text-white font-bold text-lg rounded-xl hover:bg-[#0056b3] focus:outline-none focus:ring-4 focus:ring-[#0056b3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isProcessing ? (
                <>
                  <span className='inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></span>
                  Processing...
                </>
              ) : (
                'Proceed to Payment →'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;