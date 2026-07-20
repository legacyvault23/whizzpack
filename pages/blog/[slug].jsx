import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BlogSlugRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.slug) router.replace('/blogs/' + router.query.slug);
  }, [router.query.slug]);
  return null;
}
