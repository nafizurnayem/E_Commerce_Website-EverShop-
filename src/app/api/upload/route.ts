import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const folder: string = data.get('folder') as string || 'products';

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 5MB allowed.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${fileExtension}`;

    // Create folder if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Folder might already exist
    }

    const filePath = join(uploadDir, fileName);

    // Optimize image with Sharp
    let optimizedBuffer;
    try {
      optimizedBuffer = await sharp(buffer)
        .resize(1200, 1200, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: 85,
          progressive: true 
        })
        .toBuffer();
    } catch (error) {
      // If Sharp fails, use original buffer
      optimizedBuffer = buffer;
    }

    // Save the file
    await writeFile(filePath, optimizedBuffer);

    // Create thumbnail
    const thumbnailName = `thumb-${fileName}`;
    const thumbnailPath = join(uploadDir, thumbnailName);
    
    try {
      const thumbnailBuffer = await sharp(buffer)
        .resize(300, 300, { 
          fit: 'cover' 
        })
        .jpeg({ 
          quality: 80 
        })
        .toBuffer();
      
      await writeFile(thumbnailPath, thumbnailBuffer);
    } catch (error) {
      console.error('Error creating thumbnail:', error);
    }

    const fileUrl = `/uploads/${folder}/${fileName}`;
    const thumbnailUrl = `/uploads/${folder}/${thumbnailName}`;

    return NextResponse.json({
      url: fileUrl,
      thumbnail: thumbnailUrl,
      filename: fileName,
      size: optimizedBuffer.length,
      originalSize: file.size
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}