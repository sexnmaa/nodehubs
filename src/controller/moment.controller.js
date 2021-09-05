const momentService = require('../service/moment.service')
const perService = require('../service/permission.server')


class momentController {
  async create(ctx, next) {
    const { id } = ctx.user
    const { content } = ctx.request.body
    const result = await momentService.create(content, id)
    ctx.body = '发表了动态~'
  }
  async detail(ctx, next) {
    const id = ctx.params.id
    const info = await momentService.getMomentDetailByID(id)
    ctx.body = info
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query
    const info = await momentService.getMomentList(offset, size)
    ctx.body = info
  }
  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await perService.changeMoment(momentId, content)
    ctx.body = result
  }
  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await perService.removeMoment(momentId)
    ctx.body = result
  }
}

module.exports = new momentController