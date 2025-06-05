// components/MultiStepDeliveryForm.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStorage } from '@/hooks/useSession';

const MultiStepDeliveryForm = () => {
  const router = useRouter();
  
  // Use sessionStorage hook for form data persistence
  const [formData, setFormData, clearFormData, isLoaded] = useSessionStorage('deliveryFormData', {
    // Sender details
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    pickupAddress: '',
    senderState: '',
    senderCity: '',
    senderSameAsReceiver: false,
    
    // Receiver details
    receiverName: '',
    receiverEmail: '',
    receiverPhone: '',
    deliveryAddress: '',
    receiverState: '',
    receiverCity: '',
    
    // Package details
    packageValue: '',
    packageVehicleType: '',
    packageWeight: '',
    packageDescription: '',
    additionalInstructions: '',
    
    // Metadata
    timestamp: '',
    formCompleted: false,
    currentStep: 1
  });

  // Local state for current step - initialize with formData.currentStep if available
  const [currentStep, setCurrentStep] = useState(() => {
    return formData?.currentStep || 1;
  });

  // Load current step from sessionStorage when data is loaded
  useEffect(() => {
    if (isLoaded && formData?.currentStep && formData.currentStep !== currentStep) {
      setCurrentStep(formData.currentStep);
    }
  }, [isLoaded, formData?.currentStep]);

  // Handle input changes - using useCallback to prevent unnecessary re-renders
  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      [field]: value,
      timestamp: new Date().toISOString()
    }));
  }, [setFormData]);

  const handleSenderSameAsReceiver = useCallback((checked: boolean) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      senderSameAsReceiver: checked,
      timestamp: new Date().toISOString(),
      ...(checked ? {
        receiverName: prev.senderName,
        receiverEmail: prev.senderEmail,
        receiverPhone: prev.senderPhone,
        receiverState: prev.senderState,
        receiverCity: prev.senderCity,
        deliveryAddress: prev.pickupAddress
      } : {})
    }));
  }, [setFormData]);

  // Save step when navigating
  const saveStepAndNavigate = useCallback((newStep: number) => {
    setCurrentStep(newStep);
    setFormData((prev: typeof formData) => ({
      ...prev,
      currentStep: newStep,
      timestamp: new Date().toISOString()
    }));
  }, [setFormData]);

  const nextStep = useCallback(() => {
    if (currentStep < 3) {
      saveStepAndNavigate(currentStep + 1);
    }
  }, [currentStep, saveStepAndNavigate]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      saveStepAndNavigate(currentStep - 1);
    }
  }, [currentStep, saveStepAndNavigate]);

  const validateStep = useCallback((step: number) => {
    switch(step) {
      case 1:
        return formData.senderName && formData.senderEmail && formData.senderPhone && 
               formData.pickupAddress && formData.senderState && formData.senderCity;
      case 2:
        return formData.receiverName && formData.receiverEmail && formData.receiverPhone && 
               formData.deliveryAddress && formData.receiverState && formData.receiverCity;
      case 3:
        return formData.packageValue && formData.packageVehicleType && formData.packageWeight;
      default:
        return true;
    }
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (currentStep < 3) {
      // Validate current step before proceeding
      if (validateStep(currentStep)) {
        nextStep();
      } else {
        // Just return without alert - let user continue anyway
        return;
      }
    } else {
      // Final submission - no validation alerts, just proceed
      setFormData((prev: typeof formData) => ({
        ...prev,
        formCompleted: true,
        completedAt: new Date().toISOString()
      }));
      
      // Small delay to ensure sessionStorage is updated before navigation
      setTimeout(() => {
        router.push('/checkout');
      }, 100);
    }
  }, [currentStep, validateStep, nextStep, setFormData, router]);

  // MEMOIZE the form components to prevent recreation on every render
  const SenderDetailsForm = useMemo(() => (
    <div className='shadow-lg rounded-lg p-8 w-[700px] mt-[3em] border-gray-200 border-[2px] bg-white/90 backdrop-blur-sm'>
      <h2 className='text-[#007BFF] text-2xl font-bold text-center mb-6'>Sender's Details</h2>
      <div className='flex flex-col space-y-6'>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Sender's Name *
          </label>
          <input
            type='text'
            placeholder='Input Name'
            value={formData?.senderName || ''}
            onChange={(e) => handleInputChange('senderName', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Sender's E-mail *
          </label>
          <input
            type='email'
            placeholder='Input E-mail'
            value={formData?.senderEmail || ''}
            onChange={(e) => handleInputChange('senderEmail', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Active Phone Number *
          </label>
          <input
            type='tel'
            placeholder='Input active phone number'
            value={formData?.senderPhone || ''}
            onChange={(e) => handleInputChange('senderPhone', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Pickup Address *
            <span className='ml-2 text-[#007BFF] cursor-pointer'>ℹ️</span>
          </label>
          <input
            type='text'
            placeholder='Input pickup location'
            value={formData?.pickupAddress || ''}
            onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            State *
          </label>
          <select
            value={formData?.senderState || ''}
            onChange={(e) => handleInputChange('senderState', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-[#001B6C] bg-gray-100'
            required
          >
            <option value=''>Select state</option>
            <option value='Lagos'>Lagos</option>
            <option value='Abuja'>Abuja</option>
            <option value='Rivers'>Rivers</option>
            <option value='Kano'>Kano</option>
            <option value='Kaduna'>Kaduna</option>
            <option value='Oyo'>Oyo</option>
            <option value='Delta'>Delta</option>
            <option value='Enugu'>Enugu</option>
          </select>
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            City *
          </label>
          <input
            type='text'
            placeholder='Enter city'
            value={formData?.senderCity || ''}
            onChange={(e) => handleInputChange('senderCity', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-[#001B6C] bg-gray-100'
            required
          />
        </div>

        <div className='flex items-center space-x-2'>
          <input
            type='checkbox'
            id='senderSameAsReceiver'
            checked={formData?.senderSameAsReceiver || false}
            onChange={(e) => handleSenderSameAsReceiver(e.target.checked)}
            className='w-4 h-4 text-[#007BFF] border-gray-300 rounded focus:ring-[#007BFF]'
          />
          <label htmlFor='senderSameAsReceiver' className='text-[#001B6C] text-sm'>
            Sender is same as receiver
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className='w-full py-3 bg-[#007BFF] text-white font-bold rounded-md hover:bg-[#0056b3] focus:outline-none focus:ring-4 focus:ring-[#0056b3] transition-colors'
        >
          Proceed →
        </button>
      </div>
    </div>
  ), [formData, handleInputChange, handleSenderSameAsReceiver, handleSubmit]);

  const ReceiverDetailsForm = useMemo(() => (
    <div className='shadow-lg rounded-lg p-8 w-[700px] mt-[3em] border-gray-200 border-[2px] bg-white/90 backdrop-blur-sm'>
      <h2 className='text-[#007BFF] text-2xl font-bold text-center mb-6'>Receiver's Details</h2>
      <div className='flex flex-col space-y-6'>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Receiver's Name *
          </label>
          <input
            type='text'
            placeholder='Input Name'
            value={formData?.receiverName || ''}
            onChange={(e) => handleInputChange('receiverName', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Receiver's E-mail *
          </label>
          <input
            type='email'
            placeholder='Input E-mail'
            value={formData?.receiverEmail || ''}
            onChange={(e) => handleInputChange('receiverEmail', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Active Phone Number *
          </label>
          <input
            type='tel'
            placeholder='Input active phone number'
            value={formData?.receiverPhone || ''}
            onChange={(e) => handleInputChange('receiverPhone', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Delivery Address *
            <span className='ml-2 text-[#007BFF] cursor-pointer'>ℹ️</span>
          </label>
          <input
            type='text'
            placeholder='Input delivery location'
            value={formData?.deliveryAddress || ''}
            onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            State *
          </label>
          <select
            value={formData?.receiverState || ''}
            onChange={(e) => handleInputChange('receiverState', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-[#001B6C] bg-gray-100'
            required
          >
            <option value=''>Select state</option>
            <option value='Lagos'>Lagos</option>
            <option value='Abuja'>Abuja</option>
            <option value='Rivers'>Rivers</option>
            <option value='Kano'>Kano</option>
            <option value='Kaduna'>Kaduna</option>
            <option value='Oyo'>Oyo</option>
            <option value='Delta'>Delta</option>
            <option value='Enugu'>Enugu</option>
          </select>
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            City *
          </label>
          <input
            type='text'
            placeholder='Enter city'
            value={formData?.receiverCity || ''}
            onChange={(e) => handleInputChange('receiverCity', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-[#001B6C] bg-gray-100'
            required
          />
        </div>

        <div className='flex space-x-4'>
          <button
            onClick={prevStep}
            className='w-1/2 py-3 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-400 focus:outline-none transition-colors'
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            className='w-1/2 py-3 bg-[#007BFF] text-white font-bold rounded-md hover:bg-[#0056b3] focus:outline-none focus:ring-4 focus:ring-[#0056b3] transition-colors'
          >
            Proceed →
          </button>
        </div>
      </div>
    </div>
  ), [formData, handleInputChange, prevStep, handleSubmit]);

  const PackageDetailsForm = useMemo(() => (
    <div className='shadow-lg rounded-lg p-8 w-[700px] mt-[3em] border-gray-200 border-[2px] bg-white/90 backdrop-blur-sm'>
      <h2 className='text-[#007BFF] text-2xl font-bold text-center mb-6'>Package Details</h2>
      <div className='flex flex-col space-y-6'>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Package Value (Naira) *
          </label>
          <input
            type='text'
            placeholder='₦50,000'
            value={formData?.packageValue || ''}
            onChange={(e) => handleInputChange('packageValue', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Vehicle type *
          </label>
          <select
            value={formData?.packageVehicleType || ''}
            onChange={(e) => handleInputChange('packageVehicleType', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-[#001B6C] bg-gray-100'
            required
          >
            <option value=''>Select Vehicle</option>
            <option value='Bike'>Bike</option>
            <option value='Keke'>Keke</option>
            <option value='Car'>Car</option>
            <option value='Van'>Van</option>
            <option value='Truck'>Truck</option>
          </select>
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Package Weight Class (kg) *
          </label>
          <select
            value={formData?.packageWeight || ''}
            onChange={(e) => handleInputChange('packageWeight', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] text-[#001B6C] bg-gray-100'
            required
          >
            <option value=''>Select weight</option>
            <option value='0-2kg'>0-2kg</option>
            <option value='2-5kg'>2-5kg</option>
            <option value='5-10kg'>5-10kg</option>
            <option value='10-25kg'>10-25kg</option>
            <option value='25-50kg'>25-50kg</option>
            <option value='50kg+'>50kg+</option>
          </select>
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Package Description
          </label>
          <textarea
            placeholder='e.g., document, electronics, food, etc. (optional)'
            value={formData?.packageDescription || ''}
            onChange={(e) => handleInputChange('packageDescription', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100 h-24 resize-none'
          />
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Additional Instruction
          </label>
          <textarea
            placeholder='e.g., give specific instructions (optional)'
            value={formData?.additionalInstructions || ''}
            onChange={(e) => handleInputChange('additionalInstructions', e.target.value)}
            className='w-full px-4 py-3 border rounded-lg text-[#001B6C] focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-gray-100 h-24 resize-none'
          />
        </div>

        <div className='flex space-x-4'>
          <button
            onClick={prevStep}
            className='w-1/2 py-3 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-400 focus:outline-none transition-colors'
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            className='w-1/2 py-3 bg-[#007BFF] text-white font-bold rounded-md hover:bg-[#0056b3] focus:outline-none focus:ring-4 focus:ring-[#0056b3] transition-colors'
          >
            Submit & Checkout →
          </button>
        </div>
      </div>
    </div>
  ), [formData, handleInputChange, prevStep, handleSubmit]);

  // Progress indicator component - also memoized
  const ProgressIndicator = useMemo(() => (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`w-4 h-4 rounded-full cursor-pointer transition-colors ${
            step <= currentStep ? 'bg-[#007BFF]' : 'bg-gray-300'
          }`}
          onClick={() => saveStepAndNavigate(step)}
        />
      ))}
    </div>
  ), [currentStep, saveStepAndNavigate]);

  // Show loading state while sessionStorage data is being loaded
  if (!isLoaded) {
    return (
      <div className='font-space items-center flex flex-col mt-[5em] pb-[8em] min-h-screen'>
        <div className='flex flex-col items-center justify-center min-h-[400px]'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-[#007BFF]'></div>
          <p className='mt-4 text-[#001B6C]'>Loading form...</p>
        </div>
      </div>
    );
  }

  const renderCurrentStep = (): JSX.Element => {
    switch(currentStep) {
      case 1:
        return SenderDetailsForm;
      case 2:
        return ReceiverDetailsForm;
      case 3:
        return PackageDetailsForm;
      default:
        return SenderDetailsForm;
    }
  };

  return (
    <div className='font-space items-center flex flex-col mt-[5em] pb-[8em] min-h-screen'>
      <h1 className='font-[400] text-[96px] text-[#007BFF]'>
        Find an <span className='text-[#001B6C] font-[700]'>Uption</span>
      </h1>
      <p className='font-[400] text-[30px] text-[#001B6C] w-[736px] text-center'>
        Looking to deliver something, fill out the form below and find the best delivery service that fits your budget and needs.
      </p>
      
      {renderCurrentStep()}
      {ProgressIndicator}
    </div>
  );
};

export default MultiStepDeliveryForm;