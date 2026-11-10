const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const makeToken=(user)=>jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'1d'});
exports.signup=async(req,res)=>{
  const {name,email,password}=req.body;
  if(!name||!email||!password||password.length<8) return res.status(400).json({message:'Name, valid email and password (minimum 8 characters) are required'});
  const normalized=email.trim().toLowerCase();
  if(await User.findOne({email:normalized})) return res.status(409).json({message:'This email is already registered'});
  const count=await User.countDocuments();
  // Public signup cannot create privileged accounts. First account becomes admin.
  const role=count===0?'admin':'student';
  const user=await User.create({name,email:normalized,password:await bcrypt.hash(password,12),role});
  res.status(201).json({token:makeToken(user),user:{id:user._id,name:user.name,email:user.email,role:user.role}});
};
exports.login=async(req,res)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email:String(email||'').trim().toLowerCase()}).select('+password');
  if(!user||!await bcrypt.compare(password||'',user.password)) return res.status(401).json({message:'Invalid email or password'});
  res.json({token:makeToken(user),user:{id:user._id,name:user.name,email:user.email,role:user.role}});
};
exports.me=async(req,res)=>res.json({user:req.user});
