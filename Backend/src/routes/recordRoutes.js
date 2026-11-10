const router=require('express').Router();
const Record=require('../models/Record');
const {protect,allowRoles}=require('../middleware/auth');
const TYPES=['students','teachers','classes','courses','subjects','attendance','examinations','results','fees','assignments','submissions','announcements'];
router.use(protect);
router.param('type',(req,res,next,type)=>TYPES.includes(type)?next():res.status(404).json({message:'Unknown resource'}));
const visibleQuery=(type,user)=>{
  const query={type};
  if(user.role==='student' && type!=='announcements'){
    query.$or=[{'data.userId':String(user._id)},{'data.email':user.email},{'data.studentEmail':user.email}];
  }
  return query;
};
router.get('/:type',async(req,res)=>{try{
  const rows=await Record.find(visibleQuery(req.params.type,req.user)).sort({createdAt:-1});
  res.json(rows.map(r=>({_id:r._id,...r.data,createdAt:r.createdAt,updatedAt:r.updatedAt})));
}catch(e){res.status(500).json({message:'Could not load records'});}});
router.get('/:type/:id',async(req,res)=>{try{const r=await Record.findOne({_id:req.params.id,...visibleQuery(req.params.type,req.user)});if(!r)return res.status(404).json({message:'Record not found'});res.json({_id:r._id,...r.data});}catch(e){res.status(400).json({message:'Invalid record id'});}});
router.post('/:type',allowRoles('admin','teacher'),async(req,res)=>{try{const r=await Record.create({type:req.params.type,data:req.body,createdBy:req.user._id,updatedBy:req.user._id});res.status(201).json({_id:r._id,...r.data});}catch(e){res.status(400).json({message:e.message});}});
router.put('/:type/:id',allowRoles('admin','teacher'),async(req,res)=>{try{const r=await Record.findOneAndUpdate({_id:req.params.id,type:req.params.type},{$set:{data:req.body,updatedBy:req.user._id}},{new:true,runValidators:true});if(!r)return res.status(404).json({message:'Record not found'});res.json({_id:r._id,...r.data});}catch(e){res.status(400).json({message:e.message});}});
router.delete('/:type/:id',allowRoles('admin'),async(req,res)=>{const r=await Record.findOneAndDelete({_id:req.params.id,type:req.params.type});if(!r)return res.status(404).json({message:'Record not found'});res.json({message:'Deleted successfully'});});
module.exports=router;
