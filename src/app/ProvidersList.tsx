"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProviderDto } from "@/dto/ProviderDto";
import ProviderCard from "@/components/ui/providerCard";

export default function ProvidersList() {
  const [providers, setProviders] = useState<ProviderDto[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // Login request
        const login = await axios.post("http://localhost:8080/admin/login", {
          username: "superadmin@gmail.com",
          password: "superadmin123$",
        });

        const token = login.data.jwtToken;

        // Fetch providers once
        const response = await axios.get<ProviderDto[]>(
          "http://localhost:8080/api/v1/providers/all",
          {
            headers: { Authorization: token },
          }
        );

        // ✅ Replace state (not append in a loop)
        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []); // ✅ empty dependency array ensures it runs once

  return (
    <div className="h-full">
      <h1 className="text-gray-900 text-4xl lg:text-6xl text-center my-10">
        Popular Providers
      </h1>

      <div className="flex flex-row flex-wrap justify-center gap-5">
        {providers.map((provider) => (
          <ProviderCard key={provider.email} provider={provider} />
        ))}
      </div>
    </div>
  );
}
