import { defineCollection, z } from 'astro:content';

const settingsSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  nav: z.object({
    home: z.string(),
    sessions: z.string(),
    language: z.string()
  }),
  hero_cta: z.string(),
  purpose: z.object({
    paragraph: z.string(),
    bullets: z.array(z.string())
  }),
  how_it_works: z.array(z.string()),
  themes: z.array(
    z.object({
      title: z.string(),
      description: z.string()
    })
  ),
  organisers: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      email: z.string().optional()
    })
  ),
  registration_note: z.string(),
  hero_image: z.string(),
  gallery_images: z.array(z.string()).max(3).optional()
});

const sessionSchema = z.object({
  title: z.string(),
  date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  location: z.string(),
  theme: z.enum([
    'Industry Insights',
    'Employability',
    'Production & Composing',
    'Music Education'
  ]),
  language: z.enum(['EN', '中文', 'Bilingual']),
  capacity: z.number().default(15),
  registration_status: z.enum(['Open', 'Closed']),
  registration_url: z.string().url(),
  short_description: z.string(),
  session_leads: z.array(z.string())
});

export const collections = {
  settings_en: defineCollection({ type: 'data', schema: settingsSchema }),
  settings_cn: defineCollection({ type: 'data', schema: settingsSchema }),
  sessions_en: defineCollection({ type: 'content', schema: sessionSchema }),
  sessions_cn: defineCollection({ type: 'content', schema: sessionSchema })
};
