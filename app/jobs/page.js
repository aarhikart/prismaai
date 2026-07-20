import Link from "next/link";
import { getJobs } from "@/lib/job-service";
// import { FooterSection } from "@/app/_components/landing/footer-section";
import { Header } from "@/app/_components/landing/header";
import Career from "./_components/career";





export const dynamic = "force-dynamic";




export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="bg-[#020618] space-lr">
      <Header />
      
     
         <Career />
   
         
      {/* <FooterSection /> */}
      
      {/* <FooterSection /> */}
    </main>
  );
}