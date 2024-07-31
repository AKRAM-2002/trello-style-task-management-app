import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import dbConnect from '@/lib/dbConnect';
import User from '../../../server/models/User';


export async function POST(request: NextRequest){
  try {
    await dbConnect();


    const reqBody = await request.json();
    const {fullname, email, password} = reqBody;
    
    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({email})

    if(user){
      return NextResponse.json({error: "User already exists"}, {status: 400})
    }

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser)

    return NextResponse.json({
      message: "User created successfully", 
      sucess: true,
      savedUser
    }
    )


  } catch (error: any) {
    return NextApiResponse.json(
      {error: error.message},
      {status: 500}
    )
  }
}