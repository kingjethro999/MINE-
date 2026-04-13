import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = 'jethrojerrybj@gmail.com'
  const password = 'Seun5757@'
  
  console.log(`Seeding test user: ${email}...`)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      plan: 'PREMIUM',
      activePlanPurchased: true,
      passwordHash: password, // Currently stored in plain text per auth.ts authorize logic
    },
    create: {
      email,
      name: 'Test Administrator',
      passwordHash: password,
      plan: 'PREMIUM',
      activePlanPurchased: true,
      isAdmin: true, // Making it admin too since it's for testing
    },
  })

  console.log('User created/updated successfully:')
  console.log(user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
