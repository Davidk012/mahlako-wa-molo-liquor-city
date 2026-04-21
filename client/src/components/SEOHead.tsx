import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Mahlako Wa Molo Liquor City - Premium Spirits, Wines & Beers',
  description = 'Your premier destination for premium spirits, fine wines, and craft beers in South Africa. WhatsApp ordering available. Located at 2019 Hlapo Roadway.',
  image = '/images/og-image.jpg',
  url = 'https://mahlakowamolo.co.za',
  type = 'website'
}) => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LiquorStore",
    "name": "Mahlako Wa Molo Liquor City",
    "description": description,
    "url": url,
    "telephone": "+27 00 000 0000",
    "email": "mahlakowamolo@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2019 Hlapo Roadway",
      "addressLocality": "Johannesburg",
      "addressRegion": "Gauteng",
      "postalCode": "0000",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -26.2041,
      "longitude": 28.0473
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/mahlakowamolo",
      "https://www.instagram.com/mahlakowamolo"
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, EFT",
    "currenciesAccepted": "ZAR"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mahlako Wa Molo Liquor City",
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/shop?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="liquor store, spirits, wine, beer, whiskey, vodka, rum, gin, Johannesburg, South Africa, alcohol, premium drinks, WhatsApp ordering" />
      <meta name="author" content="Mahlako Wa Molo Liquor City" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Mahlako Wa Molo Liquor City" />
      <meta property="og:locale" content="en_ZA" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@mahlakowamolo" />

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>

      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#d97706" />
      <meta name="msapplication-TileColor" content="#d97706" />
      <meta name="application-name" content="Mahlako Wa Molo Liquor City" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
