import { uploadImage } from '@/app/functions/upload-image'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/upload',
    {
      schema: {
        summary: 'Upload Image.',
        consumes: ['multipart/form-data'],
        response: {
          201: z.object({ uploadId: z.string() }),
          400: z.object({ message: z.string() }).describe('No File Provided.'),
        },
      },
    },
    async (request, reply) => {
      const uploadedFile = await request.file({
        limits: {
          fileSize: 1024 * 1024 * 2, //2 Mb
        },
      })

      if (!uploadedFile) {
        return reply.status(400).send({ message: 'No File Provided.' })
      }

      await uploadImage({
        fileName: uploadedFile.filename,
        contentType: uploadedFile.mimetype,
        contentStream: uploadedFile.file,
      })

      return reply.status(201).send({ uploadId: 'test' })
    }
  )
}
