const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    genres: [{
        type: String
    }],
    themes: [{
        type: String
    }]
});

userSchema.statics = {
    create: async function(data){
        try{
            const emailExist = await this.findOne({email: data.email});
            const usernameExist = await this.findOne({username: data.username});
            if(emailExist || usernameExist){
                return 'exists';
            }else{
                const user = new this(data);
                await user.save();
                return 'saved';
            }
        }catch(err){
            return err;
        }
    },
    saveGenres: async function(data){
        try{
            await this.findOneAndUpdate(
                {username: data.username},
                {$set: {genres: data.genres}},
                {new: true}
            );
        }catch(err){
            return err;
        }
    },
    saveThemes: async function(data){
        try{
            await this.findOneAndUpdate(
                {username: data.username},
                {$set: {themes: data.themes}},
                {new: true}
            );
        }catch(err){
            return err;
        }
    }
}

module.exports = mongoose.model('User', userSchema);