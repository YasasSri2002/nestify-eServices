"use client";

import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { BriefcaseBusiness, House } from "lucide-react";

import ClientForm from "@/app/register/Client";
import ProviderForm from "@/app/register/Provider";
import NavBar from "@/components/ui/navbar";

type RegistrationRole = "client" | "provider";

const roleAnimations: Record<RegistrationRole, string> = {
  client: "/animation/real_estate.lottie",
  provider: "/animation/Building_and_Construction.lottie",
};

export default function RegisterPage() {
  const [role, setRole] = useState<RegistrationRole>("client");

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-surface-ice-100 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-[2rem] border border-neutral-200 bg-surface-snow shadow-[0_24px_80px_rgba(10,25,47,0.12)] lg:min-h-[760px] lg:grid-cols-[0.82fr_1.18fr]">
          <aside
            className="relative flex min-h-64 items-center justify-center overflow-hidden bg-primary-900 p-6 sm:min-h-80 lg:min-h-full lg:p-10"
            aria-label={role === "client" ? "Home services illustration" : "Service provider illustration"}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-28 -top-32 h-80 w-80 rounded-full border-[54px] border-accent-400/15"
            />
            <DotLottieReact
              key={role}
              src={roleAnimations[role]}
              loop
              autoplay
              className="relative w-full max-w-xl"
            />
          </aside>

          <section className="flex items-center px-6 py-10 sm:px-10 lg:px-14 lg:py-14" aria-labelledby="register-heading">
            <div className="mx-auto w-full max-w-2xl">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">Create an account</p>
                <h2 id="register-heading" className="mt-3 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
                  How will you use Nestify?
                </h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  Choose an account type. You can complete your profile after signing in.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-2 rounded-2xl bg-surface-ice-100 p-1.5" role="tablist" aria-label="Account type">
                <button
                  type="button"
                  role="tab"
                  id="client-registration-tab"
                  aria-controls="registration-role-panel"
                  aria-selected={role === "client"}
                  onClick={() => setRole("client")}
                  className={`flex min-h-14 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 ${
                    role === "client"
                      ? "bg-surface-snow text-primary-900 shadow-[0_4px_16px_rgba(10,25,47,0.10)]"
                      : "text-neutral-600 hover:text-primary-900"
                  }`}
                >
                  <House className={`h-4 w-4 ${role === "client" ? "text-accent-600" : "text-neutral-400"}`} aria-hidden="true" />
                  I need a service
                </button>
                <button
                  type="button"
                  role="tab"
                  id="provider-registration-tab"
                  aria-controls="registration-role-panel"
                  aria-selected={role === "provider"}
                  onClick={() => setRole("provider")}
                  className={`flex min-h-14 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 ${
                    role === "provider"
                      ? "bg-surface-snow text-primary-900 shadow-[0_4px_16px_rgba(10,25,47,0.10)]"
                      : "text-neutral-600 hover:text-primary-900"
                  }`}
                >
                  <BriefcaseBusiness className={`h-4 w-4 ${role === "provider" ? "text-accent-600" : "text-neutral-400"}`} aria-hidden="true" />
                  I provide services
                </button>
              </div>

              <div
                id="registration-role-panel"
                className="mt-8"
                role="tabpanel"
                aria-labelledby={`${role}-registration-tab`}
              >
                {role === "client" ? <ClientForm /> : <ProviderForm />}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
