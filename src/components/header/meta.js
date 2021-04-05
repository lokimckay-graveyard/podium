import Head from "next/head";

export default function MetaTags() {
  const domain = process.env.PODIUM_DOMAIN || "https://smashpodium.vercel.app/";
  return (
    <Head>
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
    </Head>
  );
}
