import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();
    
    const categories = await Category.find({ isActive: true })
      .populate('children')
      .sort({ sortOrder: 1, name: 1 })
      .lean();
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }
    
    const category = new Category(body);
    await category.save();
    
    // If this category has a parent, add it to parent's children
    if (category.parent) {
      await Category.findByIdAndUpdate(
        category.parent,
        { $addToSet: { children: category._id } }
      );
    }
    
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Category name or slug already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}