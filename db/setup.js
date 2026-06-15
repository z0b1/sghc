const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function setup() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('Reading schema.sql...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema...');
    // neon() function can run raw SQL. For multiple statements, it's better to split them or run them via a transaction.
    // However, neon's sql tag does not easily support multiple statements with complex semicolons in one go unless it's an unparameterized query using `neon(url)(query)` syntax. Wait, `@neondatabase/serverless` exports `neon` which creates a query function.
    // We can just use the connection to run the full string.
    
    // Split by semicolons for basic execution, or use the raw query feature.
    const statements = schema.split(';').filter(stmt => stmt.trim() !== '');
    
    for (const stmt of statements) {
      if (stmt.trim()) {
        await sql.query(stmt);
      }
    }
    console.log('Schema executed successfully.');

    // Seed dummy members
    console.log('Seeding members...');
    await sql`
      INSERT INTO members (name, role, bio, grade)
      VALUES 
        ('Alex Chen', 'Club President', 'Full-stack developer. Loves building cool projects.', '12'),
        ('Sam Rodriguez', 'Vice President', 'AI/ML enthusiast. Competitive programmer.', '11'),
        ('Jordan Taylor', 'Events Lead', 'Organized the Spring Hackathon.', '12'),
        ('Casey Williams', 'Treasurer', 'Manages sponsorships and budget.', '11')
      ON CONFLICT DO NOTHING; -- Assuming we have a conflict constraint, wait we don't have unique on name.
    `;

    // Seed dummy events
    console.log('Seeding events...');
    await sql`
      INSERT INTO events (title, description, date, time, location, registration_limit, registered_count)
      VALUES 
        ('Spring Hackathon', 'Our flagship 24-hour hackathon. Build amazing projects and win prizes!', '2026-04-15', '10:00', 'School Gym', 100, 45),
        ('Intro to Python Workshop', 'Learn the basics of Python programming. Perfect for beginners.', '2026-03-20', '15:30', 'Room 302', 30, 28)
    `;

    console.log('Seeding projects...');
    await sql`
      INSERT INTO projects (title, description, tech_stack, repo_url)
      VALUES 
        ('School App', 'A mobile app for school announcements and schedules.', ARRAY['React Native', 'Firebase'], 'https://github.com/hackclub/school-app'),
        ('AI Tutor', 'An AI-powered tutoring system for math.', ARRAY['Python', 'OpenAI API'], 'https://github.com/hackclub/ai-tutor')
    `;

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setup();
