## Section 1. Company Information
- Company name: Adsrova
- Short name: Adsrova
- Business description: Adsrova is an online shopping platform in Bangladesh.
- Products/Services: Online shopping
- Service area: Across Bangladesh
- Mobile: 01711111111
- WhatsApp: 01711111111
- Facebook page: https://www.facebook.com/example
- Facebook group: https://www.facebook.com/groups/example
- Email: example@gmail.com
- Additional information: Not provided

## Content Rules
1. Treat Section 1 as the single source of truth for company branding, industry, services, contacts, and audience.
2. Automatically rewrite all public website content to match the company information, even if the previous project belongs to a different industry.
3. Update company names, descriptions, headings, images, alt text, navigation, CTAs, phone/WhatsApp links, social links, footer, and SEO metadata.
4. Remove outdated branding, unrelated services, and legacy content. Preserve existing functionality and architecture.
5. Do not invent products, prices, and business claims.
6. Adapt industry-specific pages and terminology. Keep irrelevant templates technically intact without publishing unrelated content.
7. Update CMS defaults and review existing published CMS records, which may retain old content.
8. Do not modify authentication, database schemas, dashboard functionality, or unrelated technical components.
9. Preserve responsive design, Next.js conventions, TypeScript compatibility, and existing UI functionality.
10. Section 1 is the only configurable section. Never require changes elsewhere in this prompt.

## Section 2. Pages and Components List to Update
- `src/app/action.ts`
- `src/app/layout.tsx`
- `src/app/loading.tsx`
- `src/app/manifest.ts`
- `src/app/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/[...pagePath]/page.tsx`
- `src/components/whatsapp/WhatsAppButton.tsx`