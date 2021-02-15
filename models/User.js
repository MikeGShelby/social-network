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
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
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

// delete all thoughts associated with a user
// UserSchema.pre('remove', function(next) {
//   const Thought = mongoose.model('Thought');
//   Thought.remove({ _id: {$in: this.thoughts} }).then(() => next());
// });

// Or try this for deleting?
// UserSchema.pre( "deleteMany", { document: false, query: true }, async function (next) {
//     const docs = await this.model.find(this.getFilter());
//     const users = docs.map((item) => item._id);
//     await UserLink.deleteMany({ user: { $in: users } }); next();
// });

// export the Pizza model
module.exports = User;