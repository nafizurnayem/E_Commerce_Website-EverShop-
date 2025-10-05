import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || null;
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Fetch user's orders
    const orders = await Order.find({ user: decoded.userId })
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

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
      shippingAddress, 
      totalAmount, 
      paymentMethod, 
      couponCode, 
      discount 
    } = await request.json();

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create new order
    const order = new Order({
      user: decoded.userId,
      orderNumber,
      items: items.map((item: any) => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      shippingAddress,
      payment: {
        method: paymentMethod || 'card',
        status: 'pending'
      },
      subtotal: totalAmount,
      shippingCost: totalAmount > 50 ? 0 : 150,
      total: totalAmount,
      couponCode: couponCode || null,
      discount: discount || 0,
      status: 'pending',
    });

    await order.save();

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}