const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Basic .env loader
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim().replace(/^"|"$/g, '');
    }
  });
}


async function main() {
  const email = 'jethrojerrybj@gmail.com';
  const password = 'Seun5757@';
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('render.com') ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();
    console.log(`Connected to database. Seeding test user: ${email}...`);

    // Check if user exists
    const res = await client.query('SELECT id FROM "User" WHERE email = $1', [email]);
    
    if (res.rows.length > 0) {
      console.log('User exists, updating...');
      await client.query(
        'UPDATE "User" SET plan = $1, "activePlanPurchased" = $2, "passwordHash" = $3 WHERE email = $4',
        ['PREMIUM', true, password, email]
      );
    } else {
      console.log('Creating new user...');
      await client.query(
        'INSERT INTO "User" (id, email, name, "passwordHash", plan, "activePlanPurchased", "isAdmin", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())',
        ['test-user-id-' + Date.now(), email, 'Test Administrator', password, 'PREMIUM', true, true]
      );
    }

    console.log('Test user seeded successfully!');
  } catch (err) {
    console.error('Error seeding user:', err);
  } finally {
    await client.end();
  }
}

main();
