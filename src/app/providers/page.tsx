
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/navbar";
import AllProvidersPage from "@/components/ui/provider-section/allProvidersPage";
import { Suspense } from "react";




export default function AllProviders() { 

  
  return (
    <>
      <NavBar />
        <Suspense fallback={<p>Loading....</p>}>
          <AllProvidersPage/>
        </Suspense>
      <Footer />  
    </>
  );
}