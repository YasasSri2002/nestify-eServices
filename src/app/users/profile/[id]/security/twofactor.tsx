export default function TwoFactorDetails(){
    return(
        <div>
            <div className="bg-white shadow-2xl rounded-2xl p-4 grid gap-3">
                <div>
                    <h1 className="xl:text-2xl text-gray-900">Two Factor Authentication</h1>
                    <h3 className="xl:text-xl text-gray-600">Add an extra layer of security for your account</h3>
                </div>
                <div className="flex justify-between items-center">
                    <div className="grid gap-1">
                        <h1>Two Factor Authentication</h1>
                        <h3 className="text-gray-600">Protect your Account with 2FA</h3>
                        <button className="bg-slate-950 text-white rounded-md px-4 py-1 my-2 active:bg-white 
                            active:text-slate-950">
                            Enable Two Factor
                        </button>
                    </div>
                    <label className="border border-red-500 text-red-500 px-4 text-sm h-6 rounded-md">Not Activated</label>
                </div>
                <div className="flex justify-between items-center">
                    <div className="grid gap-1">
                        <h1>Add Authenticator App</h1>
                        <h3 className="text-gray-600">Protect your Account with Authenticator app</h3>
                        <button className="bg-slate-950 text-white rounded-md px-4 py-1 my-2 active:bg-white 
                            active:text-slate-950 active:scale-75 active:duration-300 transition-all ">
                            Set up authentication app
                        </button>
                    </div>
                    <label className="border border-red-500 text-red-500 px-4 text-sm h-6 rounded-md">Not Activated</label>
                </div>

            </div>
        </div>
    );
}