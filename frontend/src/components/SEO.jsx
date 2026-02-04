import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "The Best Audio Visual Company in Kenya — StagePass Audio Visual Limited",
  description = "StagePass Audio Visual Limited is Kenya's leading events and audio-visual company — offering professional sound systems, event production, video conferencing, stage lighting, LED screens and technical event support in Nairobi and across Kenya.",
  keywords = "audio visual company Kenya, AV company Nairobi, event production Kenya, sound systems Kenya, stage lighting Kenya, video conferencing Kenya, event technology Kenya, professional event services Kenya",
  image = "https://stagepass.co.ke/uploads/StagePass-LOGO-y.png",
  url = "https://stagepass.co.ke",
  type = "website",
  structuredData = null,
  noindex = false,
  canonical = null,
}) => {
  const canonicalUrl = canonical || url;
  const fullTitle = title.includes('StagePass') ? title : `${title} | StagePass Audio Visual Limited`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="StagePass Audio Visual Limited" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="StagePass Audio Visual Limited" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@stagepass" />
      <meta name="twitter:creator" content="@stagepass" />

      {/* Additional SEO */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="KE-110" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="-1.2210922;36.8443046" />
      <meta name="ICBM" content="-1.2210922, 36.8443046" />
      <link rel="alternate" hreflang="en-KE" href={url} />
      <link rel="alternate" hreflang="x-default" href={url} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
