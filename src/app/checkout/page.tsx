'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '@/store/auth'
import { useLanguage } from '@/contexts/LanguageContext'
import { formatCurrency, formatBengaliNumber } from '@/utils/currency'
import { ChevronLeftIcon, CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, getOriginalPrice, getProductDiscounts, getCouponDiscount, getFinalTotal, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const { language, t } = useLanguage()
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Payment form states
  const [paymentDetails, setPaymentDetails] = useState({
    // Card details
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
    // Banking details
    selectedBank: '',
    bankAccount: '',
    // Mobile wallet details
    mobileNumber: ''
  })
  
  const originalTotal = getOriginalPrice()
  const productDiscountsTotal = getProductDiscounts()
  const couponDiscount = getCouponDiscount()
  const finalTotal = getFinalTotal()
  const totalSavings = productDiscountsTotal + couponDiscount

  const paymentMethods = [
    {
      id: 'card',
      name: t('payment.card'),
      description: t('payment.card.desc'),
      icon: CreditCardIcon,
      image: '/images/card-payment.png'
    },
    {
      id: 'internet-banking',
      name: t('payment.internetBanking'),
      description: t('payment.internetBanking.desc'),
      icon: BanknotesIcon,
      image: '/images/internet-banking.png'
    },
    {
      id: 'bkash',
      name: t('payment.bkash'),
      description: t('payment.bkash.desc'),
      icon: null,
      image: '/images/bkash-logo.png'
    },
    {
      id: 'nagad',
      name: t('payment.nagad'),
      description: t('payment.nagad.desc'),
      icon: null,
      image: '/images/nagad-logo.png'
    }
  ]

  const validatePaymentDetails = () => {
    console.log('Validating payment details:', { selectedPayment, paymentDetails })
    
    switch (selectedPayment) {
      case 'card':
        if (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv || !paymentDetails.cardName) {
          return 'All card details are required (Card Number, Expiry, CVV, Cardholder Name)'
        }
        if (paymentDetails.cardNumber.replace(/\s/g, '').length < 13) {
          return 'Invalid card number'
        }
        if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiry)) {
          return 'Invalid expiry date format (MM/YY)'
        }
        if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
          return 'Invalid CVV'
        }
        break
        
      case 'internet-banking':
        if (!paymentDetails.selectedBank || !paymentDetails.bankAccount) {
          return 'Bank selection and account number are required'
        }
        if (paymentDetails.bankAccount.length < 8) {
          return 'Invalid bank account number'
        }
        break
        
      case 'bkash':
      case 'nagad':
        if (!paymentDetails.mobileNumber) {
          return `${selectedPayment === 'bkash' ? 'bKash' : 'Nagad'} mobile number is required`
        }
        // More flexible validation for Bangladeshi mobile numbers
        const cleanNumber = paymentDetails.mobileNumber.replace(/\s/g, '')
        if (cleanNumber.length !== 11) {
          return 'Mobile number must be 11 digits'
        }
        if (!cleanNumber.startsWith('01')) {
          return 'Mobile number must start with 01'
        }
        // Allow all Bangladeshi mobile prefixes: 013, 014, 015, 016, 017, 018, 019
        if (!/^01[3-9]\d{8}$/.test(cleanNumber)) {
          return 'Invalid Bangladeshi mobile number format'
        }
        break
        
      default:
        return 'Please select a payment method'
    }
    return null
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please login to place an order')
      router.push('/auth/login')
      return
    }

    if (!selectedPayment) {
      toast.error('Please select a payment method')
      return
    }

    const validationError = validatePaymentDetails()
    if (validationError) {
      console.log('Validation failed:', validationError)
      toast.error(validationError)
      return
    }

    console.log('Validation passed, placing order...')
    setIsProcessing(true)

    try {
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          paymentMethod: selectedPayment,
          paymentDetails,
          shippingAddress: user.addresses?.[0] || {},
          totalAmount: getFinalTotal(),
          couponCode: '',
          discount: 0
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order')
      }

      toast.success('Order placed successfully!')
      clearCart() // Clear the cart after successful order
      router.push(`/checkout/success?orderNumber=${data.order.orderNumber}`)
    } catch (error) {
      console.error('Order placement error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to place order')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">{t('checkout.emptyCart')}</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            {t('checkout.continueShopping')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Language Switcher */}
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>
      
      {/* Back to Cart */}
      <Link href="/cart" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ChevronLeftIcon className="h-5 w-5 mr-2" />
        {t('checkout.backToCart')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-black">{t('checkout.title')}</h1>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 ${
                  selectedPayment === method.id
                    ? 'border-blue-500 bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={() => setSelectedPayment(method.id)}
                    className="text-blue-600"
                  />
                  
                  <div className="flex items-center space-x-3 flex-1">
                    {method.icon ? (
                      <method.icon className="h-6 w-6 text-gray-400" />
                    ) : (
                      <div className="w-10 h-6 relative">
                        <Image
                          src={method.image}
                          alt={method.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium text-black">{method.name}</h3>
                      <p className="text-sm text-gray-700">{method.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Form based on selected method */}
          {selectedPayment === 'card' && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-lg space-y-4 border border-gray-200">
              <h3 className="font-medium text-black">{t('card.details')}</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    {t('card.number')} *
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => {
                      // Format card number with spaces
                      const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
                      if (value.replace(/\s/g, '').length <= 16) {
                        setPaymentDetails(prev => ({ ...prev, cardNumber: value }))
                      }
                    }}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gradient-to-r from-white to-gray-50 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      {t('card.expiry')} *
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentDetails.expiry}
                      onChange={(e) => {
                        // Format MM/YY
                        let value = e.target.value.replace(/\D/g, '')
                        if (value.length >= 2) {
                          value = value.substring(0, 2) + '/' + value.substring(2, 4)
                        }
                        setPaymentDetails(prev => ({ ...prev, expiry: value }))
                      }}
                      maxLength={5}
                      className="w-full p-3 border border-gray-300 rounded-md bg-gradient-to-r from-white to-gray-50 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      {t('card.cvv')} *
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={paymentDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '')
                        if (value.length <= 4) {
                          setPaymentDetails(prev => ({ ...prev, cvv: value }))
                        }
                      }}
                      maxLength={4}
                      className="w-full p-3 border border-gray-300 rounded-md bg-gradient-to-r from-white to-gray-50 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    {t('card.name')} *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={paymentDetails.cardName}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardName: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gradient-to-r from-white to-gray-50 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {selectedPayment === 'internet-banking' && (
            <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-lg space-y-4 border border-gray-200">
              <h3 className="font-medium text-black">{t('banking.selectBank')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Select Bank *
                  </label>
                  <select 
                    value={paymentDetails.selectedBank}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, selectedBank: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gradient-to-r from-white to-gray-50 text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    required
                  >
                    <option value="">{t('banking.chooseBank')}</option>
                    <option value="city-bank">{t('banking.cityBank')}</option>
                    <option value="dhaka-bank">{t('banking.dhakaBank')}</option>
                    <option value="dutch-bangla">{t('banking.dutchBangla')}</option>
                    <option value="eastern-bank">{t('banking.easternBank')}</option>
                    <option value="islami-bank">{t('banking.islamiBank')}</option>
                    <option value="sonali-bank">{t('banking.sonaliBank')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your account number"
                    value={paymentDetails.bankAccount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      setPaymentDetails(prev => ({ ...prev, bankAccount: value }))
                    }}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gradient-to-r from-white to-gray-50 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {(selectedPayment === 'bkash' || selectedPayment === 'nagad') && (
            <div className="bg-gradient-to-br from-gray-50 to-orange-50 p-6 rounded-lg space-y-4 border border-gray-200">
              <h3 className="font-medium text-black">
                {selectedPayment === 'bkash' ? t('payment.bkash') : t('payment.nagad')} {t('wallet.payment')}
              </h3>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  {t('wallet.mobileNumber')} *
                </label>
                <input
                  type="text"
                  placeholder="01XXXXXXXXX"
                  value={paymentDetails.mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    if (value.length <= 11) {
                      setPaymentDetails(prev => ({ ...prev, mobileNumber: value }))
                    }
                  }}
                  className={`w-full p-3 border rounded-md bg-gradient-to-r from-white to-gray-50 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all ${
                    paymentDetails.mobileNumber && paymentDetails.mobileNumber.length === 11 && paymentDetails.mobileNumber.startsWith('01')
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300'
                  }`}
                  required
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-600">
                    Enter your {selectedPayment === 'bkash' ? 'bKash' : 'Nagad'} registered mobile number
                  </p>
                  <p className="text-xs text-gray-500">
                    {paymentDetails.mobileNumber.length}/11
                  </p>
                </div>
                {paymentDetails.mobileNumber && paymentDetails.mobileNumber.length === 11 && paymentDetails.mobileNumber.startsWith('01') && (
                  <p className="text-xs text-green-600 mt-1">✓ Valid mobile number format</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-black">{t('checkout.orderSummary')}</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => {
                const itemOriginalPrice = item.originalPrice || item.price
                const itemDiscount = itemOriginalPrice - item.price
                const hasDiscount = itemDiscount > 0

                return (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-500 text-xs">IMG</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-black">{item.name}</h3>
                      <div className="flex items-center space-x-2">
                        {hasDiscount ? (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              {formatCurrency(itemOriginalPrice, language)}
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              {formatCurrency(item.price, language)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-medium">
                            {formatCurrency(item.price, language)}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">x {language === 'bn' ? formatBengaliNumber(item.quantity) : item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {hasDiscount ? (
                        <div>
                          <div className="text-sm text-gray-500 line-through">
                            {formatCurrency(itemOriginalPrice * item.quantity, language)}
                          </div>
                          <div className="font-medium text-green-600">
                            {formatCurrency(item.price * item.quantity, language)}
                          </div>
                        </div>
                      ) : (
                        <div className="font-medium">
                          {formatCurrency(item.price * item.quantity, language)}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Price Breakdown */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm text-black">
                <span>{t('order.originalPrice')}:</span>
                <span>{formatCurrency(originalTotal, language)}</span>
              </div>
              
              {productDiscountsTotal > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>{t('order.productDiscounts')}:</span>
                  <span>-{formatCurrency(productDiscountsTotal, language)}</span>
                </div>
              )}
              
              {couponDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>{t('order.couponDiscount')}:</span>
                  <span>-{formatCurrency(couponDiscount, language)}</span>
                </div>
              )}
              
              {totalSavings > 0 && (
                <div className="flex justify-between text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  <span>{t('order.totalSavings')}:</span>
                  <span>-{formatCurrency(totalSavings, language)}</span>
                </div>
              )}
              
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold text-black">
                  <span>{t('order.total')}:</span>
                  <span>{formatCurrency(finalTotal, language)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={!selectedPayment || isProcessing}
            className={`w-full py-3 px-4 rounded-md font-medium transition-all ${
              selectedPayment && !isProcessing
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing Order...</span>
              </div>
            ) : (
              t('checkout.placeOrder')
            )}
          </button>

          {!selectedPayment && (
            <p className="text-sm text-gray-500 text-center">
              {t('checkout.selectPayment')}
            </p>
          )}
          
          {selectedPayment && (
            <p className="text-sm text-blue-600 text-center">
              Please fill in all required payment details to complete your order
            </p>
          )}
        </div>
      </div>
    </div>
  )
}