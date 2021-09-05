const { postComment,replyComment, changeComment,removeComment } = require("../service/comment.service")

class commentController {
  async create(ctx, next) {
    const {id} = ctx.user
    const {content, momentId} = ctx.request.body
    const result = await postComment(momentId, content, id)
    ctx.body = result
  }
  async reply(ctx, next) {
    const {content, momentId } = ctx.request.body
    const {id} = ctx.user
    const {commentId} = ctx.params
    const result = await replyComment(momentId, content, id, commentId)
    ctx.body = result
  }
  async update(ctx, next) {
    const {commentId} = ctx.params
    const {content} = ctx.request.body
    const result = await changeComment(commentId, content)
    ctx.body = result
  }
  async remove(ctx, next) {
    const {commentId} = ctx.params
    const result = await removeComment(commentId) 
    ctx.body = result
  }
}
module.exports = new commentController()