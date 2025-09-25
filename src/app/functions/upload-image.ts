import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { Readable } from 'node:stream'
import { z } from 'zod'

const uploadoImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type uploadImageInput = z.input<typeof uploadoImageInput>

const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']

export async function uploadImage(input: uploadImageInput) {
  const { fileName, contentType, contentStream } = uploadoImageInput.parse(input)
  if (!allowedMimeTypes.includes(contentType)) {
    throw new Error('Invalid file format')
  }

  //TODO: import image to CloudFlare R2

  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: fileName,
    remoteUrl: fileName,
  })
}
