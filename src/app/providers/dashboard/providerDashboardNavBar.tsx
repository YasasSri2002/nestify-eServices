'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import DynamicIcon from '@/components/utill/DynamicIcons';
import { useSessionUser, useLogout } from '@/hooks/queries/useAuth';
import { useProviderById } from '@/hooks/queries/useProviders';
import { useCurrentUser } from '@/hooks/queries/useUsers';
import Swal from 'sweetalert2';

interface NavTab {
  readonly label: string;
  readonly href: string;
  readonly icon: string;
  readonly exact?: boolean;
}

const NAV_TABS: NavTab[] = [
  {
    label: 'My Bookings',
    href: '/providers/dashboard',
    icon: 'FiCalendar',
    exact: true,
  },
  {
    label: 'My Gigs',
    href: '/providers/dashboard/my-gigs',
    icon: 'FiBriefcase',
  },
  {
    label: 'Profile Settings',
    href: '/providers/dashboard/profile',
    icon: 'FiUser',
  },
];

export default function ProviderDashboardNavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: session } = useSessionUser();
  const { data: currentUser } = useCurrentUser();
  const logoutMutation = useLogout();
  const { data: providerDetails } = useProviderById(session?.userId ?? '');

  const providerDto = providerDetails?.providerDto;
  const isVerified = Boolean(providerDto?.isVerified);

  const displayName =
    (providerDto?.firstName && providerDto?.lastName
      ? `${providerDto.firstName} ${providerDto.lastName}`
      : null) ||
    (currentUser?.firstName && currentUser?.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : null) ||
    providerDto?.userName ||
    currentUser?.username ||
    session?.userName ||
    session?.userEmail?.split('@')[0] ||
    'Provider';

  const isTabActive = (tab: NavTab) => {
    if (tab.exact) {
      return (
        pathname === '/providers/dashboard' ||
        pathname === '/providers/dashboard/my-bookings'
      );
    }
    return pathname.startsWith(tab.href);
  };

  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: 'Sign out of provider portal?',
      text: 'You will be returned to the home page.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1D4ED8',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Stay signed in',
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: 'Signing out...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await logoutMutation.mutateAsync(session?.userId);
      Swal.close();
      router.push('/');
      router.refresh();
    } catch {
      Swal.close();
      window.location.assign('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-surface-ice-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Left: Back Link & Portal Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-600 hover:text-accent-600 px-2.5 py-1.5 rounded-lg hover:bg-surface-ice-100 transition-colors"
              title="Return to marketplace"
            >
              <DynamicIcon name="FaArrowLeft" className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to site</span>
            </Link>

            <div className="h-5 w-px bg-neutral-200" aria-hidden="true" />

            <div className="flex items-center gap-2">
              <span className="font-bold text-primary-900 text-base sm:text-lg tracking-tight">
                Provider Portal
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-ice-100 p-1.5 rounded-2xl border border-surface-ice-200">
            {NAV_TABS.map((tab) => {
              const active = isTabActive(tab);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${active
                      ? 'bg-white text-accent-600 shadow-2xs font-semibold'
                      : 'text-neutral-600 hover:text-primary-900 hover:bg-white/60'
                    }`}
                >
                  <DynamicIcon name={tab.icon} className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: User Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center font-bold text-xs ring-2 ring-accent-400/30 shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-neutral-800 leading-none truncate max-w-[100px] sm:max-w-[140px]">
                    {displayName}
                  </p>
                  {isVerified && (
                    <span title="Verified Provider" className="inline-flex">
                      <DynamicIcon
                        name="BiBadgeCheck"
                        className="w-4 h-4 text-emerald-600 shrink-0"
                      />
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-700 hover:text-error hover:bg-error-bg/60 border border-neutral-200 transition-all cursor-pointer"
              title="Sign out"
            >
              <DynamicIcon name="CiLogout" className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-700 hover:bg-surface-ice-100 border border-neutral-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <DynamicIcon
                name={mobileMenuOpen ? 'FaTimes' : 'FaAlignJustify'}
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-3 border-t border-surface-ice-200 flex flex-col gap-1">
            {NAV_TABS.map((tab) => {
              const active = isTabActive(tab);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${active
                      ? 'bg-accent-100 text-accent-600 font-semibold'
                      : 'text-neutral-700 hover:bg-surface-ice-100'
                    }`}
                >
                  <DynamicIcon name={tab.icon} className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
