"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProviderDto } from "@/dto/ProviderDto";
import ProviderCard from "@/components/ui/providerCard";
import {ProviderWithJobs} from "@/dto/response/ProviderJob"

const images =[
  "https://avatar.iran.liara.run/public/girl",
  "https://avatar.iran.liara.run/public/boy",
  "https://avatar.iran.liara.run/public/boy?username=Scott",
  "https://avatar.iran.liara.run/public/boy?username=Maria",
  "https://avatar.iran.liara.run/username?username=nayanja+nipunsara",
  "https://avatar.iran.liara.run/username?username=[firstname+lastname]",
  "https://avatar.iran.liara.run/username?username=[firstname+lastname]",
  "https://avatar.iran.liara.run/username?username=[firstname+lastname]"
]

export default function ProvidersList() {
  const [providers, setProviders] = useState<ProviderWithJobs[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
      
        // Fetch providers once
        const response = await axios.get<ProviderWithJobs[]>(
          "http://localhost:8080/api/v1/providers/top5"
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
        {providers.map((provider,index) => (
          <ProviderCard key={provider.providerDto.email} provider={provider}  images={images[index % images.length]}/>
        ))}
      </div>
    </div>
  );
}
