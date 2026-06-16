const { neon } = require('@neondatabase/serverless');

async function alterProjects() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('Altering projects table...');
    
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS devs TEXT;`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url TEXT;`;
    
    try {
      await sql`ALTER TABLE projects DROP COLUMN author_id;`;
    } catch (e) {
      console.log('author_id already dropped or error:', e.message);
    }

    console.log('Successfully altered projects table!');
  } catch (error) {
    console.error('Error altering table:', error);
  }
}

alterProjects();
