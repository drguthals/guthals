import { PrismaClient } from '@prisma/client'
import { content } from '../app/_components/data/content-data'
const prisma = new PrismaClient()

async function main() {
  for( const item of content) {
    await prisma.content.upsert({
      where: { key: item.key },
      update: {
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        year: item.year,
        role: item.role,
        image: item.image,
        exturl: item.exturl,
        type: item.type,
        status: item.status
      }, 
      create: {
        key: item.key,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        year: item.year,
        role: item.role,
        image: item.image,
        exturl: item.exturl,
        type: item.type,
        status: item.status
      },
    })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })