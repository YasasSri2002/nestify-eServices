
import PasswordUpdateFrom from "./passwordUpdateForm";
import TwoFactorDetails from "./twofactor";

export default function UserSecurityPage(){
    return( 
        <div className="m-5 grid gap-5">
            <PasswordUpdateFrom/>
            <TwoFactorDetails/>
        </div>
    );
}