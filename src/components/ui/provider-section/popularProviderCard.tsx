import Link from "next/link";
import Image from "next/image";
import { ProviderWithCategory } from "@/dto/response/ProviderWithCategoryDto";
import DynamicIcon from "@/components/utill/DynamicIcons";

export default function PopularProviderCard({
  provider,
}: {
  readonly provider: ProviderWithCategory;
}) {
  const { providerDto, categoriesSet, reviews, avgRate } = provider;

  const userName = providerDto.userName || "Service Provider";
  const formattedName =
    providerDto.firstName && providerDto.lastName
      ? `${providerDto.firstName} ${providerDto.lastName}`
      : userName.charAt(0).toUpperCase() + userName.slice(1);

  const getExpertiseBadge = (expertise?: string) => {
    const norm = (expertise || "General").toLowerCase();
    if (norm.includes("clean")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (norm.includes("plumb")) {
      return "bg-sky-50 text-sky-700 border-sky-200";
    }
    if (norm.includes("electr")) {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    if (norm.includes("garden")) {
      return "bg-teal-50 text-teal-700 border-teal-200";
    }
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  const formattedExperience = providerDto.experience
    ? String(providerDto.experience).toLowerCase().includes("year")
      ? providerDto.experience
      : `${providerDto.experience}+ yrs exp`
    : "Verified Pro";

  const displayRating =
    avgRate != null && avgRate > 0 ? Number(avgRate).toFixed(1) : "5.0";
  const reviewCount = reviews ?? 0;

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-[#EAF2F1] shadow-[0_4px_16px_rgba(10,25,47,0.06)] hover:shadow-[0_16px_36px_rgba(10,25,47,0.12)] hover:-translate-y-1.5 transition-all duration-300 w-full sm:w-[22rem] max-w-sm overflow-hidden">
      {/* Top Banner Accent */}
      <div className="relative h-20 bg-gradient-to-r from-[#DBEAFE] via-[#EAF2F1] to-[#D1E3E2] p-3 flex justify-between items-start">
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-2xs backdrop-blur-xs ${getExpertiseBadge(
            providerDto.expertise
          )}`}
        >
          {providerDto.expertise || "General"}
        </span>

        {providerDto.isVerified && (
          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-xs text-emerald-700 text-[11px] font-medium px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
            <DynamicIcon name="BiBadgeCheck" className="w-3.5 h-3.5 text-emerald-600" />
            Verified
          </span>
        )}
      </div>

      {/* Profile Avatar & Info */}
      <div className="px-5 pt-0 pb-4 flex-1 flex flex-col">
        {/* Avatar centered over banner */}
        <div className="relative -mt-10 mb-3 flex justify-center">
          <div className="relative w-18 h-18 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-slate-100">
            <Image
              src="/user.jpg"
              alt={`${formattedName}'s avatar`}
              width={72}
              height={72}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Name and Location */}
        <div className="text-center mb-2">
          <h3 className="font-semibold text-[17px] text-[#1E293B] group-hover:text-[#1D4ED8] transition-colors truncate">
            {formattedName}
          </h3>
          <p className="text-[12px] text-[#64748B] flex items-center justify-center gap-1 mt-0.5">
            <DynamicIcon name="FiMapPin" className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{providerDto.address || "Sri Lanka"}</span>
          </p>
        </div>

        {/* Rating and Social Proof */}
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/70 shadow-2xs">
            <DynamicIcon name="FaStar" className="w-3 h-3 text-[#F59E0B]" />
            <span className="text-[12px] font-bold text-slate-800">
              {displayRating}
            </span>
            <span className="text-[11px] text-slate-500 font-normal">
              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        {/* Bio / Description snippet */}
        {providerDto.shortDescription ? (
          <p className="text-[13px] text-[#475569] text-center line-clamp-2 mb-3 italic leading-relaxed px-1">
            &ldquo;{providerDto.shortDescription}&rdquo;
          </p>
        ) : (
          <p className="text-[13px] text-slate-400 text-center line-clamp-2 mb-3 leading-relaxed px-1">
            Trusted household professional with top client satisfaction.
          </p>
        )}

        {/* Category Specializations */}
        {categoriesSet && categoriesSet.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5 justify-center">
              {categoriesSet.slice(0, 3).map((category) => (
                <span
                  key={category.id}
                  className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/80"
                >
                  {category.name}
                </span>
              ))}
              {categoriesSet.length > 3 && (
                <span className="inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                  +{categoriesSet.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Key Stats Chips */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-slate-100">
          <div className="bg-[#F8FAFC] rounded-xl p-2 text-center border border-slate-100/80">
            <span className="text-[11px] uppercase tracking-wide text-slate-400 font-medium block">
              Experience
            </span>
            <span className="text-[13px] font-semibold text-slate-700">
              {formattedExperience}
            </span>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-2 text-center border border-slate-100/80">
            <span className="text-[11px] uppercase tracking-wide text-slate-400 font-medium block">
              Jobs Done
            </span>
            <span className="text-[13px] font-semibold text-slate-700">
              {providerDto.jobCount ?? 0} completed
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="p-4 pt-0">
        <Link
          href={`/providers/details/${providerDto.id}`}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#1D4ED8] text-slate-700 hover:text-white border border-slate-200 hover:border-[#1D4ED8] font-medium text-sm transition-all duration-200 shadow-2xs group-hover:shadow-sm active:scale-98"
        >
          <span>View Profile</span>
          <DynamicIcon
            name="FaArrowRight"
            className="w-3 h-3 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}