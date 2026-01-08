import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
  try {
    const { email, password, username } = await request.json();
    
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, password, and username are required' },
        { status: 400 }
      );
    }
    
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAuth.auth.signUp({
      email,
      password,
    });
    
    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }
    
    // Create user record in database
    const { error: dbError } = await supabase
      .from('users')
      .insert({
        id: authData.user!.id,
        email,
        username,
        role: 'observer',
        status: 'pending'
      });
    
    if (dbError) {
      return NextResponse.json(
        { error: 'Failed to create user record' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      message: 'User registered successfully',
      user: { id: authData.user!.id, email, username }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
