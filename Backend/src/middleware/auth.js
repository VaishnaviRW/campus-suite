const jwt = require('jsonwebtoken');
const User = require('../models/User');
async function protect(req,res,next){
  try{
    const header=req.headers.authorization||'';
    if(!header.startsWith('Bearer ')) return res.status(401).json({message:'Authentication required'});
    const payload=jwt.verify(header.slice(7),process.env.JWT_SECRET);
    const user=await User.findById(payload.id).select('-password');
    if(!user) return res.status(401).json({message:'Account no longer exists'});
    req.user=user; next();
  }catch(e){ return res.status(401).json({message:'Invalid or expired token'}); }
}
function allowRoles(...roles){return (req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({message:'You do not have permission'});}
module.exports={protect,allowRoles};
