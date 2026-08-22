'use client'
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

import { ServiceGigResponseDto } from "@/dto/response/ServiceGigResponseDto";
import DynamicIcon from '@/components/utill/DynamicIcons';
import { useRouter } from 'next/navigation';
import { useGigAverageRating } from '@/hooks/queries/useGigs';

export default function ServiceGigCard(
    { serviceGig, isEdit }: { readonly serviceGig: ServiceGigResponseDto , isEdit? : boolean }
) {

    const router = useRouter(); 

    const [activeMenu, setActiveMenu] = useState<string | null>();
    const menuRef = useRef<HTMLDivElement | null>(null);

    const { data: ratingData } = useGigAverageRating(serviceGig.id);
    const averageRating = ratingData?.['average'] ?? '';
    const totalReviews = ratingData?.['total reviews'] ?? '';


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setActiveMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function getCategoryBadge(value?: string) {
        if (!value) return null;
        const mapping: Record<string, { bg: string; text: string }> = {
            cleaning:   { bg: 'bg-[#ECFDF5]', text: 'text-[#059669]' },
            plumbing:   { bg: 'bg-[#EFF6FF]', text: 'text-[#2563EB]' },
            electrical: { bg: 'bg-[#FEF9C3]', text: 'text-[#A16207]' },
            gardening:  { bg: 'bg-[#D1FAE5]', text: 'text-[#047857]' },
        };
        const style = mapping[value.toLowerCase()] ?? { bg: 'bg-[#F1F5F9]', text: 'text-[#475569]' };
        return (
            <span className={`${style.bg} ${style.text} text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg`}>
                {value}
            </span>
        );
    }

    return (
        <div className="group relative flex flex-col bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_2px_8px_rgba(10,25,47,0.06)] hover:shadow-[0_12px_32px_rgba(10,25,47,0.12)] hover:border-[#CBD5E1] transition-all duration-300 overflow-hidden">
            {/* ── Image Container ── */}
            <div className='relative aspect-[16/10] overflow-hidden bg-[#F1F5F9]'>
                {/* Edit-mode overlay */}
                {
                    isEdit && 
                    <div className="absolute inset-x-0 top-0 flex justify-between items-start px-3 pt-3 z-10">
                        {serviceGig.isActive ? (
                            <span className="inline-flex items-center gap-1 bg-[#ECFDF5]/95 backdrop-blur text-[#059669] text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" /> Active
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 bg-[#FEF2F2]/95 backdrop-blur text-[#DC2626] text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-lg shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" /> Inactive
                            </span>
                        )}
                         <button
                            onClick={() => setActiveMenu(activeMenu === serviceGig.id ? null : 
                                    serviceGig.id)}
                            className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur 
                                flex items-center justify-center hover:bg-white transition-colors 
                            shadow-sm cursor-pointer"
                        >
                            <DynamicIcon name='IoMdMore' className="w-4 h-4 text-[#475569]" />
                        </button>
                        {activeMenu === serviceGig.id && (
                            <div className="absolute right-3 top-11 w-36 bg-white rounded-xl border
                                 border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.12)] 
                                 overflow-hidden z-20"
                                 ref={menuRef}
                                 >
                            <button className="w-full flex items-center gap-2 px-3 py-2.5 
                                hover:bg-[#F8FAFC] transition-colors text-xs text-[#475569] cursor-pointer">
                                <DynamicIcon name='MdOutlineRemoveRedEye' 
                                    className="w-3.5 h-3.5 text-[#475569]" /> 
                                    Preview
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2.5 
                                hover:bg-[#F8FAFC] transition-colors text-xs text-[#1D4ED8] cursor-pointer">
                                <DynamicIcon name='MdOutlineModeEdit' 
                                    className="w-3.5 h-3.5 text-[#1D4ED8]" /> 
                                    Edit
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2.5 
                                hover:bg-[#FEF2F2] transition-colors text-[#DC2626] text-xs cursor-pointer">
                                <DynamicIcon name='FaRegTrashAlt' className="w-3.5 h-3.5" />
                                 Delete
                            </button>
                            </div>
                        )}
                    </div>
                    
                }
                <img src="/cleaning-poster.jpg" alt={serviceGig.title} className="w-full h-full object-cover 
                transition-transform duration-500 group-hover:scale-105" />

                {/* Price badge pinned to image bottom-right */}
                <div className="absolute bottom-3 right-3">
                    <div className="flex items-baseline gap-1 bg-[#0A192F]/85 backdrop-blur-sm text-white py-1.5 px-3 rounded-lg shadow-sm">
                        <span className="text-xs font-bold">{serviceGig.currency ?? 'LKR'} {serviceGig.basePrice ?? 0}</span>
                        <span className="text-[10px] text-[#94A3B8]">/ {serviceGig.priceType ?? 'Job'}</span>
                    </div>
                </div>
            </div>

            {/* ── Card Body ── */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-[#1E293B] line-clamp-2 leading-snug group-hover:text-[#1D4ED8] transition-colors">
                    {serviceGig.title}
                </h3>

                {/* Category + location */}
                <div className='flex flex-wrap items-center gap-2'>
                    {getCategoryBadge(serviceGig.category?.name)}
                    <span className='inline-flex items-center gap-1 text-[#475569] text-xs'>
                        <DynamicIcon name='FiMapPin' className='w-3.5 h-3.5'/>
                        {serviceGig.serviceLocation ?? 'Location not specified'}
                    </span>
                </div>

                {/* Ratings + bookings row */}
                <div className='flex items-center justify-between text-xs text-[#475569] pt-1'>
                    <div className='flex items-center gap-1'>
                        <DynamicIcon name='FaStar' className='w-3.5 h-3.5 text-[#F59E0B]'/>
                        <span className='font-semibold text-[#1E293B]'>{averageRating || '0'}</span>
                        <span>({totalReviews || '0'})</span>
                    </div>
                    <span>{serviceGig.totalBookingCount ?? 0} bookings</span>
                </div>

                {/* Divider */}
                <div className="mt-auto border-t border-[#F1F5F9] pt-3 flex items-center justify-between">
                    {/* Provider name */}
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6] flex items-center justify-center">
                            <span className="text-[9px] font-bold text-white uppercase">
                                {(serviceGig.provider?.firstName ?? serviceGig.provider?.userName ?? 'P').charAt(0)}
                            </span>
                        </div>
                        <span className="text-xs font-medium text-[#475569] truncate max-w-[100px]">
                            {serviceGig.provider?.userName ?? serviceGig.provider?.firstName ?? 'Provider'}
                        </span>
                    </div>

                    {/* View more link */}
                    <Link href={`/service-gigs/details/${serviceGig.id}`}
                        className='inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] hover:text-[#2563EB] group/link transition-colors'>
                        Details
                        <DynamicIcon name="MdArrowRightAlt" className='text-base transition-transform group-hover/link:translate-x-0.5' />
                    </Link>
                </div>

                {/* Edit-mode action buttons */}
                {
                    isEdit &&
                    <div className="flex gap-2 pt-3 border-t border-[#F1F5F9]">
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 
                            rounded-xl border border-[#E2E8F0] text-[#475569] 
                            hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-colors
                            text-xs font-semibold cursor-pointer
                            ">
                            <DynamicIcon name='MdOutlineRemoveRedEye' className="w-3.5 h-3.5" /> 
                            Preview
                        </button>
                        <button
                        onClick={() => router.push("")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                         bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white 
                         transition-colors text-xs font-semibold cursor-pointer"
                        
                        >
                        <DynamicIcon name='MdOutlineModeEdit' className="w-3.5 h-3.5" /> Edit
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}