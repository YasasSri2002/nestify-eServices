"use client";
import { useEffect } from "react";

import HeroSection from "./Hero";
import ServiceComponent from "./ServiceListComponent";
import ProvidersList from "./ProvidersList";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

import axios from "axios";




export default function Home() {


  const tokenURl = process.env.key_cloak_token_url;
  const clientId = process.env.key_cloak_client_id;
  const clientSecert =process.env.key_cloak_client_secret;
  const grantType= process.env.key_cloak_grant_type;
  const keycloakUsername = process.env.key_cloak_username;
  const keycloakpassword = process.env.keycloak_password;
   
  useEffect(()=>{
    async function getToken(
    clientId:any,clientSecert:any,grantType:any,keycloakUsername:any,keycloakpassword:any,tokenURl:any
  ){
    try{
     const response= await axios.post(
      'http://localhost:8090/realms/market-realm/protocol/openid-connect/auth', 
      {
        client_id: clientId,
        client_secret: clientSecert, 
        grant_type: grantType,              
        username: keycloakUsername,           
        password:  keycloakpassword,           
      },{
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
      
    );
    
    console.log("Access Token:", response.data.access_token);
    localStorage.setItem("access_token", response.data.access_token);

    }catch(error:any){
      console.error("Error getting token:", error.response?.data || error.message);
    throw error;
    }
  }
  getToken(clientId,clientSecert,grantType,keycloakUsername,keycloakpassword,tokenURl);
  },[])
 
  return (
    <>
      <NavBar/>
      <HeroSection/>
      <ServiceComponent/>
      <ProvidersList/>
      <Footer/>
    </>
  );
}
