const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: 'You need to provide a username!',
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: 'You need to provide a password!',
      unique: true,
      match: [/.+\@.+\..+/],
      trim: true
    },
    // thoughts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Thought'
    //   }
    // ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// create the User model using the UserSchema
const User = model('User', UserSchema);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// export the Pizza model
module.exports = User;