/** Decode URL-encoded slug from route params. */
export function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

/** Encode slug for use in href (handles Chinese and special chars). */
export function blogPostHref(slug: string): string {
  return `/blog/${encodeURIComponent(slug)}`;
}

/** Normalize slug from route params (page routes may pass encoded strings). */
export function resolveRouteSlug(rawSlug: string): string {
  return decodeSlug(rawSlug);
}

/** Encode category slug for href. */
export function blogCategoryHref(slug: string): string {
  return `/blog/category/${encodeURIComponent(slug)}`;
}
