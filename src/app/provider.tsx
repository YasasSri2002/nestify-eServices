"use client";

import { useEffect } from "react";
import axios from "axios";
import { ProviderDto } from "@/dto/ProviderDto";
import { LoginDto } from "@/dto/LoginDto";
import { LoginResponseDto } from "@/dto/response/LoginResponseDto";

export default function ProviderPage() {
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // Step 1: Login
        const login = await axios.post<LoginResponseDto>(
          "http://localhost:8080/admin/login",
          {
            username: "superadmin@gmail.com",
            password: "superadmin123$",
          }
        );

        // Step 2: Extract token
        const token = login.data.jwtToken;

        // Step 3: Fetch providers with auth header
        const response = await axios.get<ProviderDto[]>(
          "http://localhost:8080/api/v1/providers/all",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // Step 4: Print providers
        const providers = response.data;
        providers.forEach((provider) => {
          console.log(
            `Username: ${provider.email}, 
             Expertise: ${provider.expertise}, 
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
