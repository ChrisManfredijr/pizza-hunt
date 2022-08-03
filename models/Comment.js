const { Schema, model, Types } = require('mongoose');

const CommentSchema = new Schema(
    {
      writtenBy: {
        type: String
      },
      commentBody: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      // use ReplySchema to validate data for a reply
      replies: [ReplySchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

  CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });

const ReplySchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      replyBody: {
        type: String
      },
      writtenBy: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      }
    }
  );

  PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
  });


const Comment = model('Comment', CommentSchema);

module.exports = Comment;