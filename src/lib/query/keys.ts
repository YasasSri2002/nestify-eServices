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
    byClient: (clientId: string = 'current') => ['bookings', 'client', clientId] as const,
    userCount: (userId: string) =>
      ['bookings', 'count', userId] as const,
  },
  gigs: {
    all: ['gigs'] as const,
    active: ['gigs', 'active'] as const,
    byId: (id: string) => ['gigs', id] as const,
    countActive: ['gigs', 'count-active'] as const,
    averageRating: (gigId: string) => ['gigs', gigId, 'average-rating'] as const,
  },
  providers: {
    all: (page: number = 0, size: number = 10) =>
      ['providers', 'all', { page, size }] as const,
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
