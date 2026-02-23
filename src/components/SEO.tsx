import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  image = '/media/ica/infinity-kings-queens.jpg',
  url = 'https://side.icacheer.space'
}: SEOProps = {}) {
  const { t, i18n } = useTranslation();
  
  const siteTitle = title 
    ? `${title} | Infinity Cheer Allstars TSV Plattenhardt Filderstadt`
    : 'Infinity Cheer Allstars | Cheerleading TSV Plattenhardt Filderstadt';
  
  const siteDescription = description || t('seo.description', {
    defaultValue: 'Cheerleading in Filderstadt-Plattenhardt: Die Infinity Cheer Allstars im TSV Plattenhardt 1895 e.V. bieten professionelles Cheerleading-Training für alle Altersgruppen. Vom Nachwuchs bis zum Wettkampfteam – WE ARE ONE.'
  });
  
  const siteKeywords = keywords || t('seo.keywords', {
    defaultValue: 'Cheerleading Plattenhardt, Cheerleading Filderstadt, TSV Plattenhardt, Infinity Cheer Allstars, Cheerleading Stuttgart, Cheerleading Baden-Württemberg, Cheerleading Training, Cheerleading Verein, CCVD, Cheerleading Deutschland, Kindersport Filderstadt, Turnen Plattenhardt, Akrobatik Filderstadt'
  });

  const imageUrl = image.startsWith('http') ? image : `${url}${image}`;

  // Strukturierte Daten für Local Business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": url,
    "name": "Infinity Cheer Allstars",
    "alternateName": "Cheerleading TSV Plattenhardt",
    "description": siteDescription,
    "url": url,
    "telephone": "+49-176-74798642",
    "email": "cheerleader@tsvplattenhardt.de",
    "image": imageUrl,
    "logo": `${url}/media/icon/favicon.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Höhensporthalle Weilerhau",
      "addressLocality": "Filderstadt",
      "addressRegion": "Baden-Württemberg",
      "postalCode": "70794",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.6769",
      "longitude": "9.2203"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "15:30",
        "closes": "21:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/infinity_cheer_allstars/",
      "https://www.facebook.com/CheerleaderPlattenhardt/",
      "https://www.tiktok.com/@infinitycheerallstars",
      "https://www.tsvplattenhardt.de/cheerleading46a5e1b6"
    ],
    "parentOrganization": {
      "@type": "SportsOrganization",
      "name": "TSV Plattenhardt 1895 e.V.",
      "url": "https://www.tsvplattenhardt.de"
    },
    "memberOf": {
      "@type": "Organization",
      "name": "CCVD - Cheerleading und Cheersport Verband Deutschland",
      "url": "https://cheersport.de/"
    },
    "sport": "Cheerleading"
  };

  // Strukturierte Daten für Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "name": "Infinity Cheer Allstars",
    "legalName": "TSV Plattenhardt 1895 e.V. - Abteilung Cheerleading",
    "url": url,
    "logo": `${url}/media/icon/favicon.png`,
    "foundingDate": "2019",
    "foundingLocation": "Filderstadt-Plattenhardt, Germany",
    "slogan": "WE ARE ONE",
    "description": siteDescription,
    "areaServed": {
      "@type": "City",
      "name": "Filderstadt",
      "containedInPlace": {
        "@type": "State",
        "name": "Baden-Württemberg"
      }
    },
    "knowsAbout": [
      "Cheerleading",
      "Cheer Dance",
      "Gymnastik",
      "Akrobatik",
      "Teambuilding",
      "Wettkampfsport"
    ]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Filderstadt",
        "item": "https://www.filderstadt.de"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Plattenhardt",
        "item": url
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Cheerleading",
        "item": url
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Infinity Cheer Allstars",
        "item": url
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={i18n.language} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={i18n.language === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:site_name" content="Infinity Cheer Allstars" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Infinity Cheer Allstars, TSV Plattenhardt" />
      <meta name="geo.region" content="DE-BW" />
      <meta name="geo.placename" content="Filderstadt-Plattenhardt" />
      <meta name="geo.position" content="48.6769;9.2203" />
      <meta name="ICBM" content="48.6769, 9.2203" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
