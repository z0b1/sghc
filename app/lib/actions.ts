"use server";

import { sql } from "./db";
import { revalidatePath } from "next/cache";

// -- MEMBERS --
export async function getMembers() {
  const result = await sql`SELECT * FROM members ORDER BY created_at DESC`;
  return result;
}

export async function addMember(member: { name: string; role: string; bio: string; grade?: string }) {
  await sql`
    INSERT INTO members (name, role, bio, grade) 
    VALUES (${member.name}, ${member.role}, ${member.bio}, ${member.grade || null})
  `;
  revalidatePath('/members');
}

export async function removeMember(id: string) {
  await sql`DELETE FROM members WHERE id = ${id}`;
  revalidatePath('/members');
}

// -- EVENTS --
export async function getEvents() {
  const result = await sql`SELECT * FROM events ORDER BY date ASC`;
  return result;
}

export async function addEvent(event: { title: string; description: string; date: string; time: string; location: string }) {
  await sql`
    INSERT INTO events (title, description, date, time, location)
    VALUES (${event.title}, ${event.description}, ${event.date}, ${event.time}, ${event.location})
  `;
  revalidatePath('/events');
}

export async function removeEvent(id: string) {
  await sql`DELETE FROM events WHERE id = ${id}`;
  revalidatePath('/events');
}

// -- PROJECTS --
export async function getProjects() {
  const result = await sql`
    SELECT p.*, m.name as author_name 
    FROM projects p 
    LEFT JOIN members m ON p.author_id = m.id 
    ORDER BY p.created_at DESC
  `;
  return result;
}

export async function addProject(project: { title: string; description: string; tech_stack: string[]; repo_url?: string }) {
  await sql`
    INSERT INTO projects (title, description, tech_stack, repo_url)
    VALUES (${project.title}, ${project.description}, ${project.tech_stack}, ${project.repo_url || null})
  `;
  revalidatePath('/projects');
}

export async function removeProject(id: string) {
  await sql`DELETE FROM projects WHERE id = ${id}`;
  revalidatePath('/projects');
}

// -- LEADERBOARD --
export async function getLeaderboard() {
  const result = await sql`
    SELECT l.points, m.name, m.id as member_id
    FROM leaderboard l
    JOIN members m ON l.member_id = m.id
    ORDER BY l.points DESC
  `;
  return result;
}
