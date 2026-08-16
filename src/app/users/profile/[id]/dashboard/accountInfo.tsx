'use client';

import { useUserBookingCount } from '@/hooks/queries/useBookings';

export default function AccountInfo({
  createdDate,
  userId,
}: {
  createdDate: string;
  userId: string;
}) {
  const { data, isLoading } = useUserBookingCount(userId);
  const bookingCount = data?.['booking count'] ?? (typeof data === 'number' ? data : 0);

  return (
    <div>
      <div className="grid gap-5 bg-surface-snow p-5 rounded-2xl ">
        <div>
          <h1>Account Information</h1>
          <p>View your account information</p>
        </div>
        <div className="grid sm:grid-cols-2">
          <div className="sm:col-1 grid gap-5">
            <div className="grid gap-1">
              <h1>Member since</h1>
              <h1>{createdDate}</h1>
            </div>
            <div className="grid gap-1">
              <h1>Total bookings</h1>
              <h1>{isLoading ? '…' : bookingCount}</h1>
            </div>
          </div>
          <div className="sm:col-2 grid gap-5">
            <div className="grid gap-1">
              <h1>Account status</h1>
              <label
                htmlFor="status"
                className="border w-fit px-3 text-sm text-green-900 bg-green-300 rounded-md"
              >
                Active
              </label>
            </div>
            <div className="grid gap-1">
              <h1>Account type</h1>
              <h1>Customer</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}