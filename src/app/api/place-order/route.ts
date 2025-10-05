import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || null;
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { 
      items, 
      paymentMethod,
      paymentDetails,
      shippingAddress,
      totalAmount,
      couponCode,
      discount 
    } = await request.json();

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { error: 'Payment method is required' },
        { status: 400 }
      );
    }

    // Validate payment details based on method
    let isPaymentValid = false;
    let validationError = '';

    switch (paymentMethod) {
      case 'card':
        if (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv || !paymentDetails.cardName) {
          validationError = 'All card details are required (Card Number, Expiry, CVV, Cardholder Name)';
        } else if (paymentDetails.cardNumber.replace(/\s/g, '').length < 13) {
          validationError = 'Invalid card number';
        } else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiry)) {
          validationError = 'Invalid expiry date format (MM/YY)';
        } else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
          validationError = 'Invalid CVV';
        } else {
          isPaymentValid = true;
        }
        break;

      case 'internet-banking':
        if (!paymentDetails.bankAccount || !paymentDetails.selectedBank) {
          validationError = 'Bank selection and account number are required';
        } else if (paymentDetails.bankAccount.length < 8) {
          validationError = 'Invalid bank account number';
        } else {
          isPaymentValid = true;
        }
        break;

      case 'bkash':
      case 'nagad':
        if (!paymentDetails.mobileNumber) {
          validationError = `${paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} mobile number is required`;
        } else {
          const cleanNumber = paymentDetails.mobileNumber.replace(/\s/g, '');
          if (cleanNumber.length !== 11) {
            validationError = 'Mobile number must be 11 digits';
          } else if (!cleanNumber.startsWith('01')) {
            validationError = 'Mobile number must start with 01';
          } else if (!/^01[3-9]\d{8}$/.test(cleanNumber)) {
            validationError = 'Invalid Bangladeshi mobile number format';
          } else {
            isPaymentValid = true;
          }
        }
        break;

      default:
        validationError = 'Invalid payment method';
    }

    if (!isPaymentValid) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create new order
    const order = new Order({
      user: decoded.userId,
      orderNumber,
      items: items.map((item: any) => ({
        product: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
      shippingAddress: shippingAddress || {},
      payment: {
        method: paymentMethod,
        status: 'completed', // Since we validated payment details
        details: {
          // Store masked/safe payment details
          ...(paymentMethod === 'card' && {
            cardLast4: paymentDetails.cardNumber.slice(-4),
            cardName: paymentDetails.cardName
          }),
          ...(paymentMethod === 'internet-banking' && {
            bank: paymentDetails.selectedBank,
            accountLast4: paymentDetails.bankAccount.slice(-4)
          }),
          ...((paymentMethod === 'bkash' || paymentMethod === 'nagad') && {
            mobileLast4: paymentDetails.mobileNumber.slice(-4)
          })
        }
      },
      subtotal: totalAmount,
      shippingCost: totalAmount > 1000 ? 0 : 60, // Free shipping above 1000 BDT
      tax: (totalAmount * 0.05), // 5% VAT
      total: totalAmount + (totalAmount > 1000 ? 0 : 60) + (totalAmount * 0.05),
      couponCode: couponCode || null,
      discount: discount || 0,
      status: 'pending',
    });

    const savedOrder = await order.save();

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully',
      order: {
        id: savedOrder._id,
        orderNumber: savedOrder.orderNumber,
        total: savedOrder.total,
        status: savedOrder.status
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Order placement error:', error);
    return NextResponse.json(
      { error: 'Failed to place order' },
      { status: 500 }
    );
  }
}