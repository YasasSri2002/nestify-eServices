'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import DynamicIcon from '@/components/utill/DynamicIcons';
import { UserUpdateData } from '@/types/user';
import { useUpdateUser } from '@/hooks/queries/useUsers';
import { ProviderPersonalInformation } from '@/types/provider';
import { useCategories } from '@/hooks/queries/useCategories';
import Swal from 'sweetalert2';

interface ProviderProfileProps {
  provider: ProviderPersonalInformation;
  providerId?: string;
  jobCount?: number;
  totalGigs?: number;
}

export default function ProviderPerosonalInformationForm({
  provider,
  providerId,
  jobCount = 0,
  totalGigs = 0,
}: ProviderProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: categories = [], isLoading: catLoading } = useCategories();
  const updateUserMutation = useUpdateUser();

  // Local state for interactive live preview
  const [formData, setFormData] = useState({
    firstName: provider.firstName || '',
    lastName: provider.lastName || '',
    username: provider.userName || '',
    contact: provider.contactNo || '',
    email: provider.email || '',
    address: provider.address || '',
    expertise: provider.expertise || '',
    experience: provider.experience ? String(provider.experience).replace(/\D/g, '') : '0',
    shortDescription: provider.shortDescription || '',
  });

  // Track initial state for reset on Cancel
  const [initialData, setInitialData] = useState(formData);

  const displayName = `${formData.firstName} ${formData.lastName}`.trim() || formData.username || 'Provider';
  const initials = (formData.firstName ? formData.firstName.charAt(0) : displayName.charAt(0)).toUpperCase();

  function handleCancel() {
    setFormData(initialData);
    setIsEditing(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userData: UserUpdateData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      contact: formData.contact.trim(),
      username: formData.username.trim(),
      address: formData.address.trim(),
    };

    try {
      await updateUserMutation.mutateAsync(userData);
      setInitialData(formData);
      setIsEditing(false);

      await Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your provider profile information has been saved successfully.',
        confirmButtonColor: '#1D4ED8',
        customClass: {
          popup: 'rounded-2xl border border-surface-ice-200 shadow-xl',
        },
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile.';
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: msg,
        confirmButtonColor: '#1D4ED8',
      });
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Top Hero Identity Card (Clean Surface Snow with Ice-200 Border) ── */}
      <div className="bg-surface-snow rounded-2xl border border-surface-ice-200 shadow-[0_4px_16px_rgba(10,25,47,0.06)] overflow-hidden">
        <div className="p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {/* Avatar with Sapphire Accent Tint & Edit Trigger */}
            <div className="relative group shrink-0">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-accent-100 text-accent-600 flex items-center justify-center font-bold text-2xl sm:text-3xl ring-4 ring-white shadow-xs select-none border border-accent-400/20">
                {initials}
              </div>
              {isEditing && (
                <div
                  title="Avatar upload"
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent-600 text-white flex items-center justify-center text-xs shadow-md border-2 border-white cursor-pointer hover:bg-accent-500 transition-colors"
                >
                  <DynamicIcon name="FaCamera" />
                </div>
              )}
            </div>

            {/* Provider Info */}
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-primary-900 tracking-tight truncate">
                  {displayName}
                </h1>
                {provider.isVerified && (
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success border border-success/30"
                    title="Verified Professional on Nestify"
                  >
                    <DynamicIcon name="BiBadgeCheck" className="w-3.5 h-3.5 text-success" />
                    Verified Pro
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap text-sm text-neutral-600">
                <span className="font-medium text-neutral-800">@{formData.username || 'provider'}</span>
                {formData.expertise && (
                  <>
                    <span className="text-neutral-300">•</span>
                    <span className="text-neutral-600 font-medium">{formData.expertise}</span>
                  </>
                )}
                {formData.address && (
                  <>
                    <span className="text-neutral-300">•</span>
                    <span className="text-neutral-500 flex items-center gap-1 truncate max-w-[200px]">
                      <DynamicIcon name="CiLocationOn" className="w-3.5 h-3.5 text-accent-600" />
                      {formData.address}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            {providerId && (
              <Link
                href={`/providers/details/${providerId}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-neutral-700 bg-surface-ice-100 hover:bg-surface-ice-200 border border-surface-ice-200 transition-colors"
                title="View your public listing"
              >
                <DynamicIcon name="FiExternalLink" className="w-3.5 h-3.5 text-accent-600" />
                <span className="hidden sm:inline">Public Profile</span>
              </Link>
            )}

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-accent-600 hover:bg-accent-500 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <DynamicIcon name="FiEdit2" className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-neutral-600 bg-surface-snow hover:bg-surface-ice-100 border border-neutral-200 transition-all active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="provider-profile-form"
                  disabled={updateUserMutation.isPending}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-accent-600 hover:bg-accent-500 text-white shadow-xs transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                >
                  {updateUserMutation.isPending ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                      <span>Saving…</span>
                    </>
                  ) : (
                    <>
                      <DynamicIcon name="FiCheck" className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Key Metrics Rail (Cool Bluish Ice-100 Surface with Ice-200 Dividers) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-surface-ice-200 divide-x divide-y sm:divide-y-0 divide-surface-ice-200 bg-surface-ice-100/70">
          <div className="p-3.5 sm:p-4 text-center sm:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Completed Jobs
            </p>
            <p className="text-base sm:text-lg font-bold text-primary-900 mt-0.5 tabular-nums">
              {jobCount}
            </p>
          </div>
          <div className="p-3.5 sm:p-4 text-center sm:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Trade Experience
            </p>
            <p className="text-base sm:text-lg font-bold text-primary-900 mt-0.5">
              {formData.experience ? `${formData.experience} Years` : 'Newly registered'}
            </p>
          </div>
          <div className="p-3.5 sm:p-4 text-center sm:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Active Listings
            </p>
            <p className="text-base sm:text-lg font-bold text-primary-900 mt-0.5 tabular-nums">
              {totalGigs}
            </p>
          </div>
          <div className="p-3.5 sm:p-4 text-center sm:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Status
            </p>
            <p className="text-base sm:text-lg font-bold text-success mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success inline-block animate-pulse" />
              Active
            </p>
          </div>
        </div>
      </div>

      {/* ── Form & Sidebar Layout ── */}
      <form id="provider-profile-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 1: Personal & Contact */}
            <div className="bg-surface-snow rounded-2xl border border-surface-ice-200 shadow-[0_4px_16px_rgba(10,25,47,0.06)] p-5 sm:p-6 space-y-5">
              <div className="border-b border-surface-ice-200 pb-3">
                <h2 className="text-base font-bold text-primary-900">Personal & Contact Details</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Your identity details and how clients and platform coordinators reach you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="block text-xs font-semibold text-neutral-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    disabled={!isEditing}
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none ${isEditing
                        ? 'bg-white border border-neutral-300 focus:border-accent-600 focus:ring-2 focus:ring-accent-500/20 text-neutral-900'
                        : 'bg-surface-ice-100/70 border border-transparent text-neutral-700 cursor-not-allowed'
                      }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="lastName" className="block text-xs font-semibold text-neutral-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    disabled={!isEditing}
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none ${isEditing
                        ? 'bg-white border border-neutral-300 focus:border-accent-600 focus:ring-2 focus:ring-accent-500/20 text-neutral-900'
                        : 'bg-surface-ice-100/70 border border-transparent text-neutral-700 cursor-not-allowed'
                      }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="username" className="block text-xs font-semibold text-neutral-700">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-neutral-400 text-sm select-none">
                      @
                    </span>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      disabled={!isEditing}
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl text-sm transition-all outline-none ${isEditing
                          ? 'bg-white border border-neutral-300 focus:border-accent-600 focus:ring-2 focus:ring-accent-500/20 text-neutral-900'
                          : 'bg-surface-ice-100/70 border border-transparent text-neutral-700 cursor-not-allowed'
                        }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact" className="block text-xs font-semibold text-neutral-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    required
                    disabled={!isEditing}
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+94 7X XXX XXXX"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none ${isEditing
                        ? 'bg-white border border-neutral-300 focus:border-accent-600 focus:ring-2 focus:ring-accent-500/20 text-neutral-900'
                        : 'bg-surface-ice-100/70 border border-transparent text-neutral-700 cursor-not-allowed'
                      }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-neutral-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    disabled
                    value={formData.email}
                    title="Email is managed via Keycloak authentication"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-surface-ice-100/70 border border-transparent text-neutral-500 cursor-not-allowed"
                  />
                  <p className="text-[11px] text-neutral-400">Account login email</p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="address" className="block text-xs font-semibold text-neutral-700">
                    Operating City / Base Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    disabled={!isEditing}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Colombo, Western Province"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none ${isEditing
                        ? 'bg-white border border-neutral-300 focus:border-accent-600 focus:ring-2 focus:ring-accent-500/20 text-neutral-900'
                        : 'bg-surface-ice-100/70 border border-transparent text-neutral-700 cursor-not-allowed'
                      }`}
                  />
                  <p className="text-[11px] text-neutral-400">Helps match nearby homeowners</p>
                </div>
              </div>
            </div>

            {/* Section 2: Professional Details & Pitch */}
            <div className="bg-surface-snow rounded-2xl border border-surface-ice-200 shadow-[0_4px_16px_rgba(10,25,47,0.06)] p-5 sm:p-6 space-y-5">
              <div className="border-b border-surface-ice-200 pb-3">
                <h2 className="text-base font-bold text-primary-900">Professional Credentials & Pitch</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Showcase your primary domain expertise, years of experience, and bio to prospective customers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="expertise" className="block text-xs font-semibold text-neutral-700">
                    Primary Trade / Category
                  </label>
                  <select
                    id="expertise"
                    name="expertise"
                    disabled={!isEditing}
                    value={formData.expertise}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none ${isEditing
                        ? 'bg-white border border-neutral-300 focus:border-accent-600 focus:ring-2 focus:ring-accent-500/20 text-neutral-900 cursor-pointer'
                        : 'bg-surface-ice-100/70 border border-transparent text-neutral-700 cursor-not-allowed'
                      }`}
                  >
                    <option value="">
                      {catLoading ? 'Loading categories…' : 'Select your primary trade'}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="experience" className="block text-xs font-semibold text-neutral-700">
                    Years of Experience
                  </label>
                  <div className="relative">
                    <input
                      id="experience"
                      name="experience"
                      type="number"
                      min={0}
                      max={50}
                      disabled={!isEditing}
                      value={formData.experience}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none ${isEditing
                          ? 'bg-white border border-neutral-300 focus:border-accent-600 focus:ring-2 focus:ring-accent-500/20 text-neutral-900'
                          : 'bg-surface-ice-100/70 border border-transparent text-neutral-700 cursor-not-allowed'
                        }`}
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-neutral-400 select-none">
                      years
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="shortDescription" className="block text-xs font-semibold text-neutral-700">
                    Professional Introduction / Bio
                  </label>
                  <span className="text-[11px] text-neutral-400 tabular-nums">
                    {formData.shortDescription.length}/300
                  </span>
                </div>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  rows={4}
                  maxLength={300}
                  disabled={!isEditing}
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Share a concise summary of your skills, equipment, reliability, and certifications..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none resize-none ${isEditing
                      ? 'bg-white border border-neutral-300 focus:border-accent-600 focus:ring-2 focus:ring-accent-500/20 text-neutral-900'
                      : 'bg-surface-ice-100/70 border border-transparent text-neutral-700 cursor-not-allowed'
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Sidebar Column (1/3) */}
          <div className="space-y-6">
            {/* Live Marketplace Card Preview (Cool Bluish Style) */}
            <div className="bg-surface-snow rounded-2xl border border-surface-ice-200 shadow-[0_4px_16px_rgba(10,25,47,0.06)] p-5 space-y-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Marketplace Discovery
                </p>
                <h3 className="text-sm font-bold text-primary-900 mt-0.5">Public Card Preview</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  How homeowners see you on the providers discovery directory.
                </p>
              </div>

              {/* Inner Preview Card with Surface Ice-100 Background */}
              <div className="p-4 rounded-xl border border-surface-ice-200 bg-surface-ice-100/80 shadow-2xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 border border-accent-400/30 flex items-center justify-center font-bold text-lg select-none shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-primary-900 text-sm truncate">{displayName}</p>
                      {provider.isVerified && (
                        <DynamicIcon name="BiBadgeCheck" className="w-3.5 h-3.5 text-success shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 truncate">
                      <span className="text-accent-600 font-semibold">{formData.expertise || 'Service Provider'}</span> • {formData.experience || '0'} yrs exp
                    </p>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {formData.shortDescription ||
                    'Ready to assist with home maintenance, repairs, and professional services.'}
                </p>

                <div className="pt-2 border-t border-surface-ice-200 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 flex items-center gap-1 truncate max-w-[130px]">
                    <DynamicIcon name="CiLocationOn" className="w-3.5 h-3.5 text-accent-600 shrink-0" />
                    {formData.address || 'Sri Lanka'}
                  </span>
                  <span className="text-accent-600 font-semibold flex items-center gap-1">
                    <DynamicIcon name="IoCheckmarkDoneOutline" className="w-3.5 h-3.5" />
                    {jobCount} jobs
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Checklist Card */}
            <div className="bg-surface-snow rounded-2xl border border-surface-ice-200 shadow-[0_4px_16px_rgba(10,25,47,0.06)] p-5 space-y-3.5">
              <h3 className="text-sm font-bold text-primary-900">Trust & Verification</h3>
              <p className="text-xs text-neutral-500">
                A verified badge and complete profile significantly increase booking acceptance rates.
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-neutral-700">
                  <DynamicIcon
                    name={formData.firstName && formData.lastName ? 'FiCheckCircle' : 'FiCircle'}
                    className={`w-4 h-4 ${formData.firstName && formData.lastName ? 'text-success' : 'text-neutral-300'
                      }`}
                  />
                  <span>Full name registered</span>
                </div>

                <div className="flex items-center gap-2 text-neutral-700">
                  <DynamicIcon
                    name={formData.contact ? 'FiCheckCircle' : 'FiCircle'}
                    className={`w-4 h-4 ${formData.contact ? 'text-success' : 'text-neutral-300'}`}
                  />
                  <span>Contact number verified</span>
                </div>

                <div className="flex items-center gap-2 text-neutral-700">
                  <DynamicIcon
                    name={formData.address ? 'FiCheckCircle' : 'FiCircle'}
                    className={`w-4 h-4 ${formData.address ? 'text-success' : 'text-neutral-300'}`}
                  />
                  <span>Operating location configured</span>
                </div>

                <div className="flex items-center gap-2 text-neutral-700">
                  <DynamicIcon
                    name={totalGigs > 0 ? 'FiCheckCircle' : 'FiCircle'}
                    className={`w-4 h-4 ${totalGigs > 0 ? 'text-success' : 'text-neutral-300'}`}
                  />
                  <span>Active services published ({totalGigs})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}