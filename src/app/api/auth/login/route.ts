import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { COOKIE_NAME, MAX_AGE } from '@/constants/constants';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (email !== 'admin@gmail.com' || password !== 'adminadmin') {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  const secret = process.env.JWT_secret || '';

  const token = sign(
    {
      email,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  });

  const response = {
    message: 'Authenticated!',
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Set-Cookie': serialized },
  });
}
