const mongoose=require('mongoose');
const recordSchema=new mongoose.Schema({
  type:{type:String,required:true,index:true},
  data:{type:mongoose.Schema.Types.Mixed,required:true},
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{timestamps:true});
recordSchema.index({type:1,createdAt:-1});
module.exports=mongoose.model('Record',recordSchema);
