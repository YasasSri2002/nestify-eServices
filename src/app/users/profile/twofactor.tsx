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
                    </div>
                    <button className="border border-red-500 text-red-500 px-4 text-sm h-6 rounded-md">Not Activated</button>
                </div>
                <div className="flex justify-between items-center">
                    <div className="grid gap-1">
                        <h1>Add Authenticator App</h1>
                        <h3 className="text-gray-600">Protect your Account with Authenticator app</h3>
                    </div>
                    <button className="border border-red-500 text-red-500 px-4 text-sm h-6 rounded-md">Set up</button>
                </div>

            </div>
        </div>
    );
}