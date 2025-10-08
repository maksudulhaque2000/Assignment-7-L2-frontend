import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');

  if (!path) {
    return NextResponse.json({ message: 'Path parameter is required' }, { status: 400 });
  }

  try {
    revalidatePath(path);
    console.log(`SUCCESS: Revalidated path: ${path}`);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error(`FAILED to revalidate path: ${path}`, error);
    return NextResponse.json({ message: 'Error revalidating', error }, { status: 500 });
  }
}