'use client'

import { useEffect } from "react";
import axios from "axios";
import { ProviderDto } from "@/dto/ProviderDto";

export default function ProviderPage() {
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get<ProviderDto[]>(
          "http://localhost:8080/api/v1/staff"
        );
        const providers = response.data;

        providers.forEach((provider) => {
          console.log(
            `Username: ${provider.username}, 
             Expertise: ${provider.experties}, 
             Rate: $${provider.hourlyRate}/hr`
          );
        });
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  return <></>;
}
