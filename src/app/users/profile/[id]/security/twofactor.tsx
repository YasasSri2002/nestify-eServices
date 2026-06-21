export default function TwoFactorDetails() {
    return (
        <div>
            <div className="bg-white shadow-2xl rounded-2xl p-4 grid gap-3">
                <div>
                    <h1 className="xl:text-2xl text-neutral-800">Two Factor Authentication</h1>
                    <h3 className="xl:text-xl text-neutral-600">Add an extra layer of security for your account</h3>
                </div>
                <div className="flex justify-between items-center">
                    <div className="grid gap-1">
                        <h1 className="text-neutral-800">Two Factor Authentication</h1>
                        <h3 className="text-neutral-600">Protect your Account with 2FA</h3>
                        <button className="bg-accent-600 hover:bg-accent-500 text-white rounded-md px-4 py-1 my-2 active:bg-accent-500
                            active:scale-95 shadow-md shadow-accent-600">
                            Enable Two Factor
                        </button>
                    </div>
                    <label className="border border-error text-error px-4 text-sm h-6 rounded-md">Not Activated</label>
                </div>
                <div className="flex justify-between items-center">
                    <div className="grid gap-1">
                        <h1 className="text-neutral-800">Add Authenticator App</h1>
                        <h3 className="text-neutral-600">Protect your Account with Authenticator app</h3>
                        <button className="bg-accent-600 hover:bg-accent-500 text-white rounded-md px-4 py-1 my-2 
                        active:bg-accent-500 active:scale-95 shadow-md shadow-accent-600">
                            Set up authentication app
                        </button>
                    </div>
                    <label className="border border-error text-error px-4 text-sm h-6 rounded-md">Not Activated</label>
                </div>

            </div>
        </div>
    );
}