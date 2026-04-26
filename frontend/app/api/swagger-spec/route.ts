import { NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/swagger';

/**
 * Route API pour servir la spécification Swagger JSON.
 */
export async function GET() {
  return NextResponse.json(swaggerSpec);
}
