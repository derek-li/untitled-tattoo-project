const { db } = require('@vercel/postgres')
const bcrypt = require('bcrypt')
const { users } = require('../seeds/users.js')

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        profile_image_url TEXT NOT NULL,
        bio TEXT NOT NULL,
        is_booking_open BOOLEAN NOT NULL,
        social_media TEXT[] NOT NULL,
        pages JSON[] NOT NULL
      );
    `

    console.log(`Created "users" table`)

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return client.sql`
          INSERT INTO users (id, name, email, password, profile_image_url, bio, is_booking_open, social_media, pages)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.profile_image_url}, ${user.bio}, ${user.is_booking_open}, ${user.social_media}, ${user.pages})
          ON CONFLICT (id) DO NOTHING;
        `
      })
    )
    

    console.log(`Seeded ${insertedUsers.length} users`)

    return {
      createTable,
      users: insertedUsers,
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seedUsers(client)

  await client.end()
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  )
})
