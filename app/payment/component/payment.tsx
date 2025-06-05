'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/toast';

interface PaymentData {
  orderNumber: string;
  amount: number;
  formattedAmount: string;
}

type PaymentStatus = 'pending' | 'checking' | 'success' | 'failed';

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const { toast, showToast, dismissToast } = useToast();
  
  // State management
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes in seconds
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [checkingTimeLeft, setCheckingTimeLeft] = useState<number>(600); // 10 minutes for checking
  const [deliveryNumber, setDeliveryNumber] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  // Bank details
  const bankDetails = {
    bankName: 'Uptions Nigeria Limited',
    accountNumber: '9023847349'
  };

  // Generate delivery number and confirmation code
  useEffect(() => {
    if (paymentData) {
      setDeliveryNumber(`#UPT${Math.random().toString().slice(2, 8)}`);
      setConfirmationCode(`${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`);
    }
  }, [paymentData]);

  // Load payment data from sessionStorage
  useEffect(() => {
    const loadPaymentData = (): void => {
      try {
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }

        const savedPaymentData = sessionStorage.getItem('paymentData');
        
        if (!savedPaymentData) {
          setError('No payment information found. Please complete your order first.');
          setLoading(false);
          return;
        }

        const payment: PaymentData = JSON.parse(savedPaymentData);
        setPaymentData(payment);
        setLoading(false);

      } catch (err) {
        console.error('Error loading payment data:', err);
        setError('Error loading payment information. Please try again.');
        setLoading(false);
      }
    };

    loadPaymentData();
  }, []);

  // Countdown timer effect for initial payment
  useEffect(() => {
    if (paymentStatus === 'pending' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (paymentStatus === 'pending' && timeLeft <= 0) {
      setError('Payment session has expired. Please create a new order.');
      showToast('Payment session has expired', 'error', 5000);
    }
  }, [timeLeft, paymentStatus, showToast]);

  // Countdown timer effect for checking status
  useEffect(() => {
    if (paymentStatus === 'checking' && checkingTimeLeft > 0) {
      const timer = setTimeout(() => {
        setCheckingTimeLeft(checkingTimeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [checkingTimeLeft, paymentStatus]);

  // Simulate payment verification process
  useEffect(() => {
    if (paymentStatus === 'checking') {
      // Simulate API call - randomly succeed or fail after 3-8 seconds
      const verificationTime = Math.random() * 5000 + 3000; // 3-8 seconds
      const timer = setTimeout(() => {
        // 80% success rate for demo purposes
        const isSuccess = Math.random() > 0.2;
        if (isSuccess) {
          setPaymentStatus('success');
          showToast('Payment verified successfully!', 'success', 4000);
        } else {
          setPaymentStatus('failed');
          showToast('Payment verification failed', 'error', 4000);
        }
        setIsProcessing(false);
      }, verificationTime);

      return () => clearTimeout(timer);
    }
  }, [paymentStatus, showToast]);

  // Format time remaining
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Copy to clipboard function with toast notifications
  const copyToClipboard = async (text: string, type: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${type} copied to clipboard!`, 'success', 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('Failed to copy to clipboard', 'error', 4000);
    }
  };

  // Handle payment confirmation
  const handlePaymentSent = async (): Promise<void> => {
    if (isProcessing || !paymentData) return;
    
    setIsProcessing(true);
    setPaymentStatus('checking');
    showToast('Verifying your payment...', 'info', 3000);
    
    try {
      // Update order status
      const orderKey = `order_${paymentData.orderNumber}`;
      const orderData = sessionStorage.getItem(orderKey);
      
      if (orderData) {
        const order = JSON.parse(orderData);
        order.status = 'payment_sent';
        order.paymentSentAt = new Date().toISOString();
        sessionStorage.setItem(orderKey, JSON.stringify(order));
      }
      
    } catch (error) {
      console.error('Error confirming payment:', error);
      setPaymentStatus('failed');
      setIsProcessing(false);
      showToast('Error processing payment confirmation', 'error', 5000);
    }
  };

  // Handle extending wait time
  const handleExtendWaitTime = (): void => {
    setCheckingTimeLeft(600); // Add 10 more minutes
    setPaymentStatus('checking');
    showToast('Wait time extended by 10 minutes', 'info', 3000);
  };

  // Handle retry payment
  const handleRetryPayment = (): void => {
    setPaymentStatus('pending');
    setTimeLeft(600); // Reset timer
    showToast('Ready to try payment again', 'info', 3000);
  };

  // Go back to checkout
  const goBackToCheckout = (): void => {
    router.push('/checkout');
  };

  // Go to home/dashboard
  const goToHome = (): void => {
    // Clear payment data
    sessionStorage.removeItem('paymentData');
    showToast('Redirecting to dashboard...', 'info', 2000);
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Payment - Uption Delivery</title>
        </Head>
        <div className='font-space min-h-screen p-6 bg-gray-50 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-[#007BFF] mx-auto'></div>
            <p className='mt-4 text-[#001B6C] text-lg'>Loading payment information...</p>
          </div>
          {/* Toast component */}
          {toast && <Toast toast={toast} onDismiss={dismissToast} />}
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Head>
          <title>Payment Error - Uption Delivery</title>
        </Head>
        <div className='font-space min-h-screen p-6  flex items-center justify-center'>
          <div className='text-center max-w-md bg-white p-8 rounded-lg shadow-lg'>
            <div className='text-red-500 text-6xl mb-4'>⚠️</div>
            <h2 className='text-2xl font-bold text-[#001B6C] mb-4'>Payment Error</h2>
            <p className='text-gray-600 mb-6'>{error}</p>
            <button
              onClick={goBackToCheckout}
              className='px-6 py-3 bg-[#007BFF] text-white font-bold rounded-lg hover:bg-[#0056b3] focus:outline-none focus:ring-4 focus:ring-[#0056b3] transition-colors'
            >
              Back to Checkout
            </button>
          </div>
          {/* Toast component */}
          {toast && <Toast toast={toast} onDismiss={dismissToast} />}
        </div>
      </>
    );
  }

  if (!paymentData) {
    return null;
  }

  // Checking Payment Status UI
  if (paymentStatus === 'checking') {
    return (
      <>
        <Head>
          <title>Verifying Payment - Uption Delivery</title>
        </Head>
        <div className='font-space min-h-screen  flex items-center justify-center p-6'>
          <div className='w-full max-w-md'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center'>
              {/* Location Pin Icon */}
              <div className='w-16 h-16 bg-blue-500 rounded-xl mx-auto mb-6 flex items-center justify-center'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>

              <h2 className='text-xl font-semibold text-gray-800 mb-2'>We are checking</h2>
              <p className='text-gray-600 mb-6'>
                Please wait, while we confirm<br />
                your payment
              </p>

              <p className='text-sm text-gray-500'>
                In{' '}
                <span className='text-blue-500 font-semibold'>
                  {formatTime(checkingTimeLeft)}
                </span>
              </p>

              {/* Processing indicator */}
              <div className='mt-6'>
                <div className='flex justify-center space-x-1'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'></div>
                  <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                  <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>

            {/* Order Reference */}
            <div className='mt-4 text-center'>
              <p className='text-xs text-gray-500'>
                Order Reference: {paymentData.orderNumber}
              </p>
            </div>
          </div>
          {/* Toast component */}
          {toast && <Toast toast={toast} onDismiss={dismissToast} />}
        </div>
      </>
    );
  }

  // Success Payment UI
  if (paymentStatus === 'success') {
    return (
      <>
        <Head>
          <title>Payment Successful - Uption Delivery</title>
        </Head>
        <div className='font-space min-h-screen  flex items-center justify-center p-6'>
          <div className='w-full max-w-md'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center'>
              {/* Success Icon */}
              <div className='w-16 h-16 bg-blue-500 rounded-xl mx-auto mb-6 flex items-center justify-center'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
              </div>

              <h2 className='text-xl font-semibold text-gray-800 mb-2'>Payment Received!</h2>
              <p className='text-gray-600 mb-6'>
                Your delivery has been confirmed.
              </p>

              <div className='space-y-2 mb-6'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm font-medium text-gray-600'>Delivery No:</span>
                  <span className='text-sm font-semibold text-blue-500'>{deliveryNumber}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm font-medium text-gray-600'>Confirmation Code:</span>
                  <span className='text-sm font-semibold text-blue-500'>{confirmationCode}</span>
                </div>
              </div>

              <p className='text-sm text-gray-600 mb-6'>
                Sit back, we're getting things moving!
              </p>

              <button
                onClick={goToHome}
                className='w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors'
              >
                Continue to Dashboard
              </button>
            </div>

            {/* Order Reference */}
            <div className='mt-4 text-center'>
              <p className='text-xs text-gray-500'>
                Order Reference: {paymentData.orderNumber}
              </p>
            </div>
          </div>
          {/* Toast component */}
          {toast && <Toast toast={toast} onDismiss={dismissToast} />}
        </div>
      </>
    );
  }

  // Failed Payment UI
  if (paymentStatus === 'failed') {
    return (
      <>
        <Head>
          <title>Payment Failed - Uption Delivery</title>
        </Head>
        <div className='font-space min-h-screen flex items-center justify-center p-6'>
          <div className='w-full max-w-md'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center'>
              {/* Error Icon */}
              <div className='w-16 h-16 bg-black rounded-xl mx-auto mb-6 flex items-center justify-center'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M20 12H4' />
                </svg>
              </div>

              <h2 className='text-xl font-semibold text-blue-500 mb-2'>Payment Failed</h2>
              <p className='text-gray-600 mb-6'>
                Oops! Something went wrong while<br />
                processing your payment.
              </p>

              <p className='text-gray-600 mb-8'>
                Need help? We're just a chat away.
              </p>

              <div className='space-y-3'>
                <button
                  onClick={handleExtendWaitTime}
                  className='w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors flex items-center justify-center'
                >
                  Extend wait time by 10 minutes
                  <svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    window.open('mailto:support@uption.com', '_blank');
                    showToast('Opening support email...', 'info', 2000);
                  }}
                  className='w-full py-3 border border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors'
                >
                  Chat support
                </button>

                <button
                  onClick={handleRetryPayment}
                  className='w-full py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors'
                >
                  Try payment again
                </button>
              </div>
            </div>

            {/* Order Reference */}
            <div className='mt-4 text-center'>
              <p className='text-xs text-gray-500'>
                Order Reference: {paymentData.orderNumber}
              </p>
            </div>
          </div>
          {/* Toast component */}
          {toast && <Toast toast={toast} onDismiss={dismissToast} />}
        </div>
      </>
    );
  }

  // Default Payment UI (pending status)
  return (
    <>
      <Head>
        <title>Payment - Order {paymentData.orderNumber} | Uption Delivery</title>
        <meta name="description" content="Complete your payment for Uption delivery service" />
      </Head>
      
      <div className='font-space min-h-screen flex items-center justify-center p-6'>
        <div className='w-full max-w-md'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-semibold text-gray-800 mb-2'>
              Transfer NGN {paymentData.amount.toLocaleString()} to the Moniepoint checkout
            </h1>
          </div>

          {/* Payment Card */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6'>
            {/* Bank Name */}
            <div className='mb-6'>
              <p className='text-sm font-medium text-gray-600 mb-1'>BANK NAME</p>
              <p className='text-lg font-semibold text-gray-900'>{bankDetails.bankName}</p>
            </div>

            {/* Account Number */}
            <div className='mb-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 mb-1'>ACCOUNT NUMBER</p>
                  <p className='text-lg font-semibold text-gray-900'>{bankDetails.accountNumber}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number')}
                  className='p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors'
                  aria-label="Copy account number"
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                  </svg>
                </button>
              </div>
            </div>

            {/* Amount */}
            <div className='mb-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600 mb-1'>AMOUNT</p>
                  <p className='text-lg font-semibold text-gray-900'>NGN {paymentData.amount.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(paymentData.amount.toString(), 'Amount')}
                  className='p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors'
                  aria-label="Copy amount"
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' />
                  </svg>
                </button>
              </div>
            </div>

            {/* Timer */}
            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                This transaction expires in{' '}
                <span className={`font-semibold ${timeLeft < 120 ? 'text-red-500' : 'text-blue-500'}`}>
                  {formatTime(timeLeft)}
                </span>
              </p>
            </div>
          </div>

          {/* Confirmation Button */}
          <button
            onClick={handlePaymentSent}
            disabled={isProcessing || timeLeft <= 0}
            className='w-full py-4 bg-blue-500 text-white font-semibold text-lg rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
          >
            {isProcessing ? (
              <>
                <span className='inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></span>
                Processing...
              </>
            ) : (
              <>
                I've sent the money
                <svg className='w-5 h-5 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </>
            )}
          </button>

          {/* Help Text */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600 mb-4'>
              Make the transfer using your bank app or USSD code, then confirm payment above.
            </p>
            <button
              onClick={goBackToCheckout}
              className='text-blue-500 hover:text-blue-600 text-sm font-medium'
            >
              ← Back to Checkout
            </button>
          </div>

          {/* Order Reference */}
          <div className='mt-4 text-center'>
            <p className='text-xs text-gray-500'>
              Order Reference: {paymentData.orderNumber}
            </p>
          </div>
        </div>
        
        {/* Toast component */}
        {toast && <Toast toast={toast} onDismiss={dismissToast} />}
      </div>
    </>
  );
};

export default PaymentPage;