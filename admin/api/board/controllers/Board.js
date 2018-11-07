'use strict';

/**
 * Board.js controller
 *
 * @description: A set of functions called "actions" for managing `Board`.
 */

module.exports = {

  /**
   * Retrieve board records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.board.search(ctx.query);
    } else {
      return strapi.services.board.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a board record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.board.fetch(ctx.params);
  },

  /**
   * Count board records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.board.count(ctx.query);
  },

  /**
   * Create a/an board record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.board.add(ctx.request.body);
  },

  /**
   * Update a/an board record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.board.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an board record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.board.remove(ctx.params);
  }
};
