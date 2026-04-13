const { PrismaClient } = require('@prisma/client')
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
      passwordHash: password,
    },
    create: {
      email,
      name: 'Test Administrator',
      passwordHash: password,
      plan: 'PREMIUM',
      activePlanPurchased: true,
      isAdmin: true,
    },
  })

  console.log('User created/updated successfully:')
  console.log(JSON.stringify(user, null, 2))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
