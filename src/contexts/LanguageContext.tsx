'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'bn'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cart': 'Cart',
    'nav.checkout': 'Checkout',
    
    // Currency
    'currency.symbol': '৳',
    'currency.name': 'BDT',
    
    // Checkout Page
    'checkout.title': 'Payment Method',
    'checkout.backToCart': 'Back to Cart',
    'checkout.emptyCart': 'Your cart is empty',
    'checkout.continueShopping': 'Continue Shopping',
    'checkout.orderSummary': 'Order Summary',
    'checkout.placeOrder': 'Place Order',
    'checkout.selectPayment': 'Please select a payment method to continue',
    'checkout.selectPaymentAlert': 'Please select a payment method',
    'checkout.orderSuccess': 'Order placed successfully with',
    
    // Payment Methods
    'payment.card': 'Credit/Debit Card',
    'payment.card.desc': 'Pay with your credit or debit card',
    'payment.internetBanking': 'Internet Banking',
    'payment.internetBanking.desc': 'Pay through your bank account',
    'payment.bkash': 'bKash',
    'payment.bkash.desc': 'Pay with bKash mobile wallet',
    'payment.nagad': 'Nagad',
    'payment.nagad.desc': 'Pay with Nagad mobile wallet',
    
    // Card Form
    'card.details': 'Card Details',
    'card.number': 'Card Number',
    'card.expiry': 'Expiry Date',
    'card.cvv': 'CVV',
    'card.name': 'Cardholder Name',
    
    // Banking
    'banking.selectBank': 'Select Your Bank',
    'banking.chooseBank': 'Choose your bank',
    'banking.cityBank': 'City Bank',
    'banking.dhakaBank': 'Dhaka Bank',
    'banking.dutchBangla': 'Dutch Bangla Bank',
    'banking.easternBank': 'Eastern Bank',
    'banking.islamiBank': 'Islami Bank',
    'banking.sonaliBank': 'Sonali Bank',
    
    // Mobile Wallet
    'wallet.payment': 'Payment',
    'wallet.mobileNumber': 'Mobile Number',
    
    // Order Summary
    'order.originalPrice': 'Original Price',
    'order.productDiscounts': 'Product Discounts',
    'order.couponDiscount': 'Coupon Discount',
    'order.totalSavings': 'Total Savings',
    'order.total': 'Total',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.item': 'item',
    'cart.items': 'items',
    'cart.remove': 'Remove',
    'cart.updateQuantity': 'Update Quantity',
    'cart.proceedToCheckout': 'Proceed to Checkout',
    'cart.applyCoupon': 'Apply Coupon',
    'cart.couponCode': 'Coupon Code',
    'cart.apply': 'Apply',
    'cart.remove.coupon': 'Remove',
    'cart.couponApplied': 'Coupon Applied',
  },
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.cart': 'কার্ট',
    'nav.checkout': 'চেকআউট',
    
    // Currency
    'currency.symbol': '৳',
    'currency.name': 'টাকা',
    
    // Checkout Page
    'checkout.title': 'পেমেন্ট পদ্ধতি',
    'checkout.backToCart': 'কার্টে ফিরে যান',
    'checkout.emptyCart': 'আপনার কার্ট খালি',
    'checkout.continueShopping': 'কেনাকাটা চালিয়ে যান',
    'checkout.orderSummary': 'অর্ডার সামারি',
    'checkout.placeOrder': 'অর্ডার করুন',
    'checkout.selectPayment': 'অব্যাহত রাখতে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন',
    'checkout.selectPaymentAlert': 'অনুগ্রহ করে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন',
    'checkout.orderSuccess': 'সফলভাবে অর্ডার সম্পন্ন হয়েছে',
    
    // Payment Methods
    'payment.card': 'ক্রেডিট/ডেবিট কার্ড',
    'payment.card.desc': 'আপনার ক্রেডিট বা ডেবিট কার্ড দিয়ে পেমেন্ট করুন',
    'payment.internetBanking': 'ইন্টারনেট ব্যাংকিং',
    'payment.internetBanking.desc': 'আপনার ব্যাংক অ্যাকাউন্টের মাধ্যমে পেমেন্ট করুন',
    'payment.bkash': 'বিকাশ',
    'payment.bkash.desc': 'বিকাশ মোবাইল ওয়ালেট দিয়ে পেমেন্ট করুন',
    'payment.nagad': 'নগদ',
    'payment.nagad.desc': 'নগদ মোবাইল ওয়ালেট দিয়ে পেমেন্ট করুন',
    
    // Card Form
    'card.details': 'কার্ডের বিবরণ',
    'card.number': 'কার্ড নম্বর',
    'card.expiry': 'মেয়াদ উত্তীর্ণের তারিখ',
    'card.cvv': 'সিভিভি',
    'card.name': 'কার্ডধারীর নাম',
    
    // Banking
    'banking.selectBank': 'আপনার ব্যাংক নির্বাচন করুন',
    'banking.chooseBank': 'আপনার ব্যাংক বেছে নিন',
    'banking.cityBank': 'সিটি ব্যাংক',
    'banking.dhakaBank': 'ঢাকা ব্যাংক',
    'banking.dutchBangla': 'ডাচ বাংলা ব্যাংক',
    'banking.easternBank': 'ইস্টার্ন ব্যাংক',
    'banking.islamiBank': 'ইসলামী ব্যাংক',
    'banking.sonaliBank': 'সোনালী ব্যাংক',
    
    // Mobile Wallet
    'wallet.payment': 'পেমেন্ট',
    'wallet.mobileNumber': 'মোবাইল নম্বর',
    
    // Order Summary
    'order.originalPrice': 'মূল দাম',
    'order.productDiscounts': 'পণ্য ছাড়',
    'order.couponDiscount': 'কুপন ছাড়',
    'order.totalSavings': 'মোট সাশ্রয়',
    'order.total': 'মোট',
    
    // Cart
    'cart.title': 'শপিং কার্ট',
    'cart.item': 'আইটেম',
    'cart.items': 'আইটেমসমূহ',
    'cart.remove': 'সরান',
    'cart.updateQuantity': 'পরিমাণ আপডেট করুন',
    'cart.proceedToCheckout': 'চেকআউটে যান',
    'cart.applyCoupon': 'কুপন প্রয়োগ করুন',
    'cart.couponCode': 'কুপন কোড',
    'cart.apply': 'প্রয়োগ করুন',
    'cart.remove.coupon': 'সরান',
    'cart.couponApplied': 'কুপন প্রয়োগ করা হয়েছে',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}