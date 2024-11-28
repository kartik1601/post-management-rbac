import mongoose from 'mongoose';

const PermissionSchema = new mongoose.Schema({
    permission_name:{
        type:String,
        required:true,
    },
    is_default:{
        type:Number,
        default: 0,
    }
});

export default mongoose.model('Permission',PermissionSchema);