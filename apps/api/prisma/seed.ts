import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await hash('123456', 1)

  const userOne = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@acme.com',
      avatarUrl: 'https://github.com/cesarneo.png',
      passwordHash,
    },
  })

  const userTwo = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  const userThree = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  await prisma.organization.create({
    data: {
      name: 'ACME Inc (Admin)',
      domain: 'acme.com',
      slug: 'acme-admin',
      avatarUrl: faker.image.avatarGitHub(),
      shouldAttachUsersByDomain: true,
      ownerId: userOne.id,
      members: {
        createMany: {
          data: [
            { userId: userOne.id, role: 'ADMIN' },
            { userId: userTwo.id, role: 'MEMBER' },
            { userId: userThree.id, role: 'MEMBER' },
          ],
        },
      },
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              slug: faker.lorem.slug(5),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              slug: faker.lorem.slug(5),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              slug: faker.lorem.slug(5),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThree.id,
              ]),
            },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'ACME Inc (Member)',
      slug: 'acme-member',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: userOne.id,
      members: {
        createMany: {
          data: [
            { userId: userOne.id, role: 'MEMBER' },
            { userId: userTwo.id, role: 'ADMIN' },
            { userId: userThree.id, role: 'MEMBER' },
          ],
        },
      },
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              slug: faker.lorem.slug(5),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              slug: faker.lorem.slug(5),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              slug: faker.lorem.slug(5),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThree.id,
              ]),
            },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'ACME Inc (Billing)',
      slug: 'acme-billing',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: userOne.id,
      members: {
        createMany: {
          data: [
            { userId: userOne.id, role: 'BILLING' },
            { userId: userTwo.id, role: 'ADMIN' },
            { userId: userThree.id, role: 'MEMBER' },
          ],
        },
      },
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              slug: faker.lorem.slug(5),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              slug: faker.lorem.slug(5),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              description: faker.lorem.paragraph(),
              slug: faker.lorem.slug(5),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                userOne.id,
                userTwo.id,
                userThree.id,
              ]),
            },
          ],
        },
      },
    },
  })
}

seed().then(() => console.log('Seeding complete!'))
