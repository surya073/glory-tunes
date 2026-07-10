import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.glorytunes.in"; // swap when domain is live
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function SEO({
  title = "Glory Tunes | Personalized Custom Songs",
  description = "Get a custom song made for your wedding, proposal, anniversary, or tribute. Personalized music gifts crafted with care by Glory Tunes.",
  path = "/",
  image = DEFAULT_IMAGE,
}) {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Glory Tunes" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}