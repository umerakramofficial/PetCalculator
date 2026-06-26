import React, { useEffect } from 'react';

interface SchemaProps {
  type: 'FAQ' | 'Article' | 'Organization';
  data: any;
}

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schemas?: SchemaProps[];
  keywords?: string[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&h=630&fit=crop',
  schemas,
  keywords
}) => {
  useEffect(() => {
    // Title
    document.title = `${title} | Pet Calculator`;

    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', `${title} | Pet Calculator`);

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Open Graph Image
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', ogImage);

    // Open Graph Type
    let ogT = document.querySelector('meta[property="og:type"]');
    if (!ogT) {
      ogT = document.createElement('meta');
      ogT.setAttribute('property', 'og:type');
      document.head.appendChild(ogT);
    }
    ogT.setAttribute('content', ogType);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const currentUrl = canonicalUrl || window.location.href;
    canonical.setAttribute('href', currentUrl);

    // Clean up existing dynamic schemas
    const existingSchemas = document.querySelectorAll('script[data-seo-schema]');
    existingSchemas.forEach(el => el.remove());

    // Inject new schemas
    if (schemas && schemas.length > 0) {
      schemas.forEach((schema, idx) => {
        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-seo-schema', `schema-${idx}`);
        
        let schemaObject: any = {};
        if (schema.type === 'FAQ') {
          schemaObject = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': schema.data.map((faq: { question: string; answer: string }) => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
              }
            }))
          };
        } else if (schema.type === 'Article') {
          schemaObject = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': schema.data.title,
            'image': schema.data.image,
            'author': {
              '@type': 'Person',
              'name': schema.data.authorName
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Pet Calculator',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&h=150&fit=crop'
              }
            },
            'datePublished': schema.data.publishDate,
            'description': schema.data.excerpt
          };
        } else if (schema.type === 'Organization') {
          schemaObject = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Pet Calculator',
            'url': window.location.origin,
            'logo': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&h=150&fit=crop',
            'description': 'Smart Dog & Cat Care Calculator Suite'
          };
        }

        script.innerHTML = JSON.stringify(schemaObject);
        document.head.appendChild(script);
      });
    }

    // Keywords meta tags
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (keywords && keywords.length > 0) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords.join(', '));
    } else if (metaKeywords) {
      metaKeywords.remove();
    }
  }, [title, description, canonicalUrl, ogType, ogImage, schemas, keywords]);

  return null;
};
