const { neon } = require('@neondatabase/serverless');

async function alterEvents() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('Adding new columns to events table...');
    
    // Add columns using IF NOT EXISTS so it doesn't fail if already run
    await sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS duration TEXT;`;
    await sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS max_members_per_team INTEGER;`;
    await sql`ALTER TABLE events ADD COLUMN IF NOT EXISTS detailed_description TEXT;`;

    console.log('Successfully altered events table!');
  } catch (error) {
    console.error('Error altering table:', error);
  }
}

alterEvents();
