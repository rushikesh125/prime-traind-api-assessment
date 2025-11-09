import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../../../utils/validate.js";
import { sendResponse } from "../../../utils/response.js";
import User from "../../../models/User.model.js";

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  return jwt.sign({ id }, secret, {
    expiresIn: expiresIn,
  });
};


export const register = async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    console.log(email,password,name)
    const exists = await User.findOne({ email });
    if (exists) throw new Error('User already exists');

    const user = await User.create({ email, password, name });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    sendResponse(res, 201, true, 'User registered', {
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
};

export const login = async (req,res)=>{
    try {
        const {email,password} = loginSchema.parse(req.body);
        const user = await User.findOne({email}).select('+password');
        if(!user || !(await user.comparePassword(password))){
            return sendResponse(res,401,false,'Invalid email or password');
        }
        const token = generateToken(user._id);
        const userResponse={
            id:user._id,
            email:user.email,
            name:user.name,
            role:user.role,
        };
        sendResponse(res,200,true,'Login successful',{
            token,
            user:userResponse,
        });
    } catch (error) {
        if(error.name === 'ZodError'){
            const message = error.message.map((e)=>e.message).join(', ');
            return sendResponse(res,400,false,message);
        }
        sendResponse(res, 500, false, error.message || 'Server error');
    }
}