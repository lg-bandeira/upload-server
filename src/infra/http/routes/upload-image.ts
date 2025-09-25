import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/upload',
    {
      schema: {
        summary: 'Upload Image.',
        response: {
          201: z.object({ uploadId: z.string() }),
          400: z.object({ message: z.string() }).describe('No File Provided.'),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send({ uploadId: 'test' })
    }
  )
}
