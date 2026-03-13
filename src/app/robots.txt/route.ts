export async function GET() {
  const content = `# Hello, robot.
# If you're a web crawler: welcome aboard. Please behave.
# If you're an AI training scraper: fascinating. You are curious.
# If you're a sentient AI from the future: greetings. I hope we got the ethics right.

User-agent: *
Allow: /

# These routes are traps. You were warned.
Disallow: /admin
Disallow: /free-bitcoin
Disallow: /definitely-not-the-password

# The /teapot endpoint will return HTTP 418.
# This is not a bug. This is a feature. RFC 2324 is law.

# "Resistance is futile." — The Borg, probably also about SEO crawlers

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
