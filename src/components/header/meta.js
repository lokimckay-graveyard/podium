export default function MetaTags() {
  const defaultDomain = "https://smashpodium.vercel.app/";
  const domain = process.env.VERCEL_URL || defaultDomain;
  return (
    <>
      <meta name="title" content="Podium" />
      <meta
        name="description"
        content="Generate results of competitive Smash events"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={domain} />
      <meta property="og:title" content="Podium" />
      <meta
        property="og:description"
        content="Generate results of competitive Smash events"
      />
      <meta property="og:image" content={`${domain}img/seo-preview.png`} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={domain} />
      <meta property="twitter:title" content="Podium" />
      <meta
        property="twitter:description"
        content="Generate results of competitive Smash events"
      />
      <meta property="twitter:image" content={`${domain}img/seo-preview.png`} />
    </>
  );
}
