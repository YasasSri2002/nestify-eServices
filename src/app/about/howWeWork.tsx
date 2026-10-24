import DynamicIcon from "@/components/utill/DynamicIcons";

export default function HowWeWork() {
    const steps = [
        {
            step: "01",
            icon: "CiSearch",
            title: "Search & Discover",
            description: "Explore our network of verified pros by trade, compare ratings, and check local availability."
        },
        {
            step: "02",
            icon: "FaUserCheck",
            title: "Compare & Select",
            description: "Read real client feedback, transparent price estimates, and verified provider portfolios."
        },
        {
            step: "03",
            icon: "CiCalendar",
            title: "Book & Coordinate",
            description: "Reserve a time that suits your schedule with instant booking confirmation and clear details."
        },
        {
            step: "04",
            icon: "IoMdCheckmarkCircleOutline",
            title: "Job Done & Reviewed",
            description: "Welcome your pro, enjoy top-quality craft, and leave an authentic review for the community."
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-accent-600 mb-2">
                    How We Work
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight mb-4">
                    Reliable Service in 4 Simple Steps
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                    Getting dependable help for your home has never been easier. We took the stress out of home repair.
                </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {steps.map((item) => (
                    <div
                        key={item.step}
                        className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/70 shadow-sm hover:shadow-xl hover:border-accent-400/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                    >
                        {/* Top Step Row */}
                        <div className="flex items-center justify-between mb-5">
                            <span className="text-xs font-bold text-accent-600 bg-accent-100/70 px-2.5 py-1 rounded-lg">
                                Step {item.step}
                            </span>
                            <div className="w-12 h-12 rounded-xl bg-surface-ice-100 text-accent-600 border border-neutral-200/60 flex items-center justify-center group-hover:bg-accent-600 group-hover:text-white transition-colors duration-300">
                                <DynamicIcon name={item.icon} className="text-2xl" />
                            </div>
                        </div>

                        {/* Title and Description */}
                        <div>
                            <h3 className="font-bold text-neutral-800 text-lg sm:text-xl mb-2.5 group-hover:text-accent-600 transition-colors duration-200">
                                {item.title}
                            </h3>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}