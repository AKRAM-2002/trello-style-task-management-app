import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '../../../server/models/User';
import jwt from 'jsonwebtoken';
import { loginSuccess } from 'store/authSlice'; // Import your Redux action

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.name,
      email: user.email,
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // Extract user ID from token and dispatch to Redux store
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decodedToken as any).id;

    // You need a way to dispatch this action on the client-side
    // If using Next.js API routes, you might need to handle this dispatch in a separate client-side function

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
