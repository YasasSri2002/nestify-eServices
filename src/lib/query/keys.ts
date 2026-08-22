/**
 * Centralized Query Keys Factory
 * Following Clean Architecture and TanStack Query best practices.
 * Eliminates magic strings and ensures type-safe cache invalidation.
 */
export const queryKeys = {
  categories: {
    all: ['categories'] as const,
  },
  bookings: {
    all: ['bookings'] as const,
    byProvider: (page: number, size: number) =>
      ['bookings', 'provider', { page, size }] as const,
    byClient: (page: number = 0, size: number = 10) =>
      ['bookings', 'client', { page, size }] as const,
    userCount: (userId: string) =>
      ['bookings', 'count', userId] as const,
  },
  gigs: {
    all: ['gigs'] as const,
    active: (page: number = 0, size: number = 10) =>
      ['gigs', 'active', { page, size }] as const,
    byId: (id: string) => ['gigs', id] as const,
    countActive: ['gigs', 'count-active'] as const,
    averageRating: (gigId: string) => ['gigs', gigId, 'average-rating'] as const,
  },
  providers: {
    all: (pageNumber: number = 0, pageSize: number = 10, keyword?: string) =>
      ['providers', 'all', { pageNumber, pageSize, keyword }] as const,
    popular: ['providers', 'popular'] as const,
    byId: (id: string) => ['providers', id] as const,
    count: ['providers', 'count'] as const,
  },
  reviews: {
    byGigId: (gigId: string) => ['reviews', 'gig', gigId] as const,
  },
  users: {
    current: ['users', 'me'] as const,
    byId: (id: string) => ['users', id] as const,
  },
} as const;
