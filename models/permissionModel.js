const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    permissions:[{
        permission_feature: String,
        permission_types: [String], // CRUD
    }]
});

module.exports = mongoose.model('Permission',permissionSchema);