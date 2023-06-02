import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY?.split(String.raw`\n`).join('\n')
  }
})

const bucket = storage.bucket(process.env.BUCKET_NAME as string)

export { storage, bucket }
