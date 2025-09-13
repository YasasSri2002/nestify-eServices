import ChooseCards from "./chooseCards"
import { ChooseCardDetails } from "./chooseCardsDetails"
export default function ChooseUs(){

    const data : ChooseCardDetails[] =   [
        {
            id: 1,
            iconName: "FiShield",
            topic:"Verified Providers",
            details:"All service providers are background-checked and verified for your peace of mind."
        },{
            id:2,
            iconName: "IoIosCard",
            topic:"Secure Payments",
            details:"Safe and secure payment processing with buyer protection guarantees."
        },
        {
            id:3,
            iconName: "FiClock",
            topic:"Quick Booking",
            details:"Book services instantly or schedule for later with our easy booking system."
        },
        {
            id:4,
            iconName: "FiMapPin",
            topic:"Local Experts",
            details:"Connect with trusted professionals in your local area who know your community."
        },
        {
            id:5,
            iconName: "CiStar",
            topic:"5-Star Ratings",
            details:"Read authentic reviews and ratings from real customers in your area."
        },
        {
            id:6,
            iconName: "CiHeadphones",
            topic:"24/7 Support",
            details:"Our customer support team is here to help you whenever you need assistance."
        }
    ]

    return(
        <>
        <div>
            <div className="p-10 grid justify-items-center gap-5">
                <h1 className="text-2xl text-black/80">Why Choose Us!</h1>
                <p className="text-center text-xl text-gray-800/80">We've built our platform with your safety, convenience, and satisfaction in mind. Here's what sets us apart from the rest.</p>
            </div>
            <div className="grid sm:flex sm:flex-wrap p-5 space-x-5 space-y-5">
                {data.map((entity)=>
                 <ChooseCards key={entity.id} details={entity} />
                )}
            </div>
        </div>
        </>
    )
}