'use client';

import { useRef, useState } from 'react';
import { useCategories } from '@/hooks/queries/useCategories';
import DynamicIcon from '@/components/utill/DynamicIcons';
import { createGig, CreateGigPayload } from '@/app/api-calls/gig/route';
import Swal from 'sweetalert2';

// ─── Sri Lankan cities ─────────────────────────────────────────────────────────
const SERVICE_LOCATIONS = [
  'Akkaraipattu','Akuressa','Aluthgama','Ambalangoda','Ampara','Anuradhapura',
  'Athurugiriya','Avissawella','Badulla','Balangoda','Bandarawela','Batticaloa',
  'Bentota','Beruwala','Boralesgamuwa','Chavakachcheri','Chilaw','Colombo',
  'Dambulla','Dehiwala','Deniyaya','Ella','Embilipitiya','Eravur','Galle',
  'Gampaha','Gampola','Hambantota','Haputale','Hatton','Hikkaduwa','Homagama',
  'Horana','Ja-Ela','Jaffna','Kadawatha','Kalmunai','Kalutara','Katunayake',
  'Kattankudy','Kaduwela','Kandy','Kelaniya','Kegalle','Kesbewa','Kilinochchi',
  'Kuliyapitiya','Kurunegala','Maharagama','Mannar','Matale','Matara','Mawanella',
  'Medawachchiya','Minuwangoda','Monaragala','Moratuwa','Mount Lavinia','Mullaitivu',
  'Nawalapitiya','Negombo','Nikaweratiya','Nuwara Eliya','Panadura','Pelmadulla',
  'Piliyandala','Point Pedro','Polonnaruwa','Puttalam','Ragama','Rakwana',
  'Ratnapura','Seeduwa','Sigiriya','Sri Jayawardenepura Kotte','Talawakele',
  'Tangalle','Tissamaharama','Trincomalee','Valvettithurai','Vavuniya','Warakapola',
  'Wattala','Weligama','Wellawaya',
];

const TOTAL_STEPS = 3;

const STEP_META = [
  { label: 'Details',   icon: 'FiFileText' },
  { label: 'Pricing',   icon: 'FiTag' },
  { label: 'Photos',    icon: 'FiCamera' },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  title: string;
  description: string;
  categoryId: string;
  basePrice: string;
  priceType: string;
  serviceLocation: string;
  currency: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CreateGigModal({ isOpen, onClose, onSuccess }: Props) {
  const { data: categories = [], isLoading: catLoading } = useCategories();
  const fileRef = useRef<HTMLInputElement>(null);

  const [step, setStep]     = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    categoryId: '',
    basePrice: '',
    priceType: 'per job',
    serviceLocation: '',
    currency: 'LKR',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});

  // ── helpers ──────────────────────────────────────────────────────────────
  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      setErrors(prev => ({ ...prev, [field]: '' }));
    };

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const allowed = files.slice(0, 5 - images.length);
    setImages(prev => [...prev, ...allowed]);
    setPreviews(prev => [...prev, ...allowed.map(f => URL.createObjectURL(f))]);
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeImage = (i: number) => {
    URL.revokeObjectURL(previews[i]);
    setImages(prev => prev.filter((_, idx) => idx !== i));
    setPreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  // ── validation ───────────────────────────────────────────────────────────
  const validateStep = (): boolean => {
    const errs: Partial<FormState> = {};
    if (step === 1) {
      if (!form.title.trim())       errs.title = 'Title is required.';
      if (!form.description.trim()) errs.description = 'Description is required.';
    }
    if (step === 2) {
      if (!form.categoryId)         errs.categoryId = 'Please select a category.';
      if (!form.basePrice || isNaN(Number(form.basePrice)) || Number(form.basePrice) <= 0)
        errs.basePrice = 'Enter a valid price.';
      if (!form.serviceLocation)    errs.serviceLocation = 'Please select a location.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  // ── submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload: CreateGigPayload = {
        title: form.title.trim(),
        description: form.description.trim(),
        categoryId: form.categoryId,
        basePrice: Number(form.basePrice),
        priceType: form.priceType,
        serviceLocation: form.serviceLocation,
        currency: form.currency,
      };

      const result = await createGig(payload);

      if (result.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Gig Created!',
          text: result.message,
          confirmButtonColor: '#2563EB',
        });
        handleClose();
        onSuccess?.();
      } else {
        Swal.fire({ icon: 'error', title: 'Failed', text: result.message });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong.' });
    } finally {
      setSubmitting(false);
    }
  };

  // ── reset & close ─────────────────────────────────────────────────────────
  const handleClose = () => {
    setStep(1);
    setForm({ title:'', description:'', categoryId:'', basePrice:'', priceType:'per job', serviceLocation:'', currency:'LKR' });
    setErrors({});
    previews.forEach(URL.revokeObjectURL);
    setImages([]);
    setPreviews([]);
    onClose();
  };

  if (!isOpen) return null;

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,25,47,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        {/* ── Modal Header ── */}
        <div className="relative border-b border-neutral-200 px-6 pt-6 pb-4 flex-shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <DynamicIcon name="IoIosClose" />
          </button>
          <h2 className="text-xl font-bold text-primary-900">Create New Gig</h2>
          <p className="text-neutral-500 text-sm mt-1">Step {step} of {TOTAL_STEPS} — {STEP_META[step - 1].label}</p>

          {/* Progress bar — the single accent moment */}
          <div className="mt-4 bg-neutral-200 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-accent-600 rounded-full transition-all duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* ── Step Tabs ── */}
        <div className="flex border-b border-neutral-100 flex-shrink-0">
          {STEP_META.map((s, i) => (
            <div
              key={s.label}
              className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-semibold border-b-2 transition-colors ${
                step === i + 1
                  ? 'border-accent-600 text-accent-600'
                  : step > i + 1
                  ? 'border-transparent text-primary-900'
                  : 'border-transparent text-neutral-400'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step > i + 1 ? 'bg-accent-600 text-white' : step === i + 1 ? 'bg-accent-600/10 text-accent-600' : 'bg-neutral-100 text-neutral-400'
              }`}>
                {step > i + 1 ? <DynamicIcon name="FiCheck" /> : i + 1}
              </span>
              {s.label}
            </div>
          ))}
        </div>

        {/* ── Step Content ── */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* STEP 1 — Title & Description */}
          {step === 1 && (
            <div className="grid gap-5">
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-neutral-700" htmlFor="gig-title">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="gig-title"
                  type="text"
                  value={form.title}
                  onChange={set('title')}
                  maxLength={80}
                  placeholder="e.g. Professional Deep Cleaning Service"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-surface-ice-100 outline-none transition-all
                    focus:ring-2 focus:ring-accent-600/30 focus:border-accent-600
                    ${errors.title ? 'border-red-400' : 'border-neutral-200'}`}
                />
                {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                <p className="text-xs text-neutral-400 text-right">{form.title.length}/80</p>
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-neutral-700" htmlFor="gig-desc">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="gig-desc"
                  value={form.description}
                  onChange={set('description')}
                  rows={6}
                  maxLength={500}
                  placeholder="Describe your service in detail. Include what's covered, tools used, and any special notes for clients..."
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-surface-ice-100 resize-none outline-none transition-all
                    focus:ring-2 focus:ring-accent-600/30 focus:border-accent-600
                    ${errors.description ? 'border-red-400' : 'border-neutral-200'}`}
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                <p className="text-xs text-neutral-400 text-right">{form.description.length}/500</p>
              </div>
            </div>
          )}

          {/* STEP 2 — Category, Price & Location */}
          {step === 2 && (
            <div className="grid gap-5">
              {/* Category */}
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-neutral-700" htmlFor="gig-cat">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="gig-cat"
                  value={form.categoryId}
                  onChange={set('categoryId')}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-surface-ice-100 outline-none transition-all
                    focus:ring-2 focus:ring-accent-600/30 focus:border-accent-600
                    ${errors.categoryId ? 'border-red-400' : 'border-neutral-200'}`}
                >
                  <option value="">
                    {catLoading ? 'Loading categories…' : 'Select a category'}
                  </option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId}</p>}
              </div>

              {/* Price row */}
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-neutral-700">
                  Base Price <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {/* Currency */}
                  <select
                    value={form.currency}
                    onChange={set('currency')}
                    className="rounded-xl border border-neutral-200 px-3 py-2.5 text-sm bg-surface-ice-100 outline-none focus:ring-2 focus:ring-accent-600/30 focus:border-accent-600 shrink-0"
                  >
                    <option value="LKR">LKR</option>
                    <option value="USD">USD</option>
                  </select>
                  {/* Amount */}
                  <input
                    id="gig-price"
                    type="number"
                    min={0}
                    step="0.01"
                    value={form.basePrice}
                    onChange={set('basePrice')}
                    placeholder="0.00"
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-sm bg-surface-ice-100 outline-none transition-all
                      focus:ring-2 focus:ring-accent-600/30 focus:border-accent-600
                      ${errors.basePrice ? 'border-red-400' : 'border-neutral-200'}`}
                  />
                  {/* Price type */}
                  <select
                    value={form.priceType}
                    onChange={set('priceType')}
                    className="rounded-xl border border-neutral-200 px-3 py-2.5 text-sm bg-surface-ice-100 outline-none focus:ring-2 focus:ring-accent-600/30 focus:border-accent-600 shrink-0"
                  >
                    <option value="per job">Per Job</option>
                    <option value="hourly">Hourly</option>
                    <option value="square meters">Per m²</option>
                  </select>
                </div>
                {errors.basePrice && <p className="text-xs text-red-500">{errors.basePrice}</p>}
              </div>

              {/* Location */}
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-neutral-700" htmlFor="gig-location">
                  Service Location <span className="text-red-500">*</span>
                </label>
                <select
                  id="gig-location"
                  value={form.serviceLocation}
                  onChange={set('serviceLocation')}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-surface-ice-100 outline-none transition-all
                    focus:ring-2 focus:ring-accent-600/30 focus:border-accent-600
                    ${errors.serviceLocation ? 'border-red-400' : 'border-neutral-200'}`}
                >
                  <option value="">Select a city</option>
                  {SERVICE_LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                {errors.serviceLocation && <p className="text-xs text-red-500">{errors.serviceLocation}</p>}
              </div>
            </div>
          )}

          {/* STEP 3 — Images */}
          {step === 3 && (
            <div className="grid gap-5">
              <div>
                <p className="text-sm font-semibold text-neutral-700 mb-1">
                  Upload Photos <span className="text-neutral-400 font-normal">(optional, up to 5)</span>
                </p>
                <p className="text-xs text-neutral-400 mb-4">Showcase your work. Good photos significantly increase booking rates.</p>

                {/* Previews */}
                {previews.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {previews.map((src, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-neutral-200 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-lg"
                        >
                          <DynamicIcon name="IoIosTrash" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload zone */}
                {images.length < 5 && (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-accent-600/30 rounded-2xl p-8 flex flex-col items-center justify-center gap-3
                      cursor-pointer hover:border-accent-600 hover:bg-accent-600/5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-accent-600/10 text-accent-600 flex items-center justify-center text-2xl">
                      <DynamicIcon name="FaUpload" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-neutral-700">Click to upload or drag &amp; drop</p>
                      <p className="text-xs text-neutral-400 mt-0.5">PNG, JPG up to 10 MB each</p>
                    </div>
                  </div>
                )}

                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageAdd} />
              </div>

              {/* Summary card */}
              <div className="rounded-xl border border-neutral-200 bg-surface-ice-100 p-4 grid gap-1.5">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-1">Summary</p>
                <p className="text-sm text-neutral-800 font-semibold">{form.title || '—'}</p>
                <p className="text-xs text-neutral-500 line-clamp-2">{form.description || '—'}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="text-xs bg-accent-600/10 text-accent-600 rounded-full px-2.5 py-0.5 font-medium">
                    {categories.find(c => c.id === form.categoryId)?.name || 'No category'}
                  </span>
                  <span className="text-xs bg-primary-900/10 text-primary-900 rounded-full px-2.5 py-0.5 font-medium">
                    {form.currency} {form.basePrice || '0'} / {form.priceType}
                  </span>
                  <span className="text-xs bg-neutral-100 text-neutral-600 rounded-full px-2.5 py-0.5 font-medium">
                    {form.serviceLocation || 'No location'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer actions ── */}
        <div className="flex-shrink-0 flex items-center justify-between gap-3 px-6 py-4 border-t border-neutral-100 bg-white">
          {step > 1 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-all active:scale-95"
            >
              <DynamicIcon name="FiArrowLeft" /> Back
            </button>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-all active:scale-95"
            >
              Cancel
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-sm transition-all shadow-xs active:scale-95"
            >
              Continue <DynamicIcon name="FiArrowRight" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-sm transition-all shadow-xs active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" /> Publishing…</>
              ) : (
                <><DynamicIcon name="FiCheck" /> Publish Gig</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
