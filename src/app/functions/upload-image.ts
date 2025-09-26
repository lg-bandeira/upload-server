import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { Either, makeLeft, makeRight } from '@/shared/either'
import { Readable } from 'node:stream'
import { z } from 'zod'
import { InvalidFileFormat } from './errors/invalid-file-format'

const uploadoImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type uploadImageInput = z.input<typeof uploadoImageInput>

const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']

export async function uploadImage(
  input: uploadImageInput
): Promise<Either<InvalidFileFormat, { url: string }>> {
  const { fileName, contentType, contentStream } = uploadoImageInput.parse(input)

  if (!allowedMimeTypes.includes(contentType)) {
    return makeLeft(new InvalidFileFormat())
  }

  //TODO: import image to CloudFlare R2

  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: fileName,
    remoteUrl: fileName,
  })

  return makeRight({ url: '' })
}
