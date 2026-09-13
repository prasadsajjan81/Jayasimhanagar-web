import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessDirectory, { type Business } from "@/components/BusinessDirectory";
import BusinessSubmissionForm from "@/components/BusinessSubmissionForm";
import { client } from "@/lib/sanity";
import { MessageCircle, PlusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Businesses & Ads | Jaishimhanagar",
  description: "Find trusted local businesses, services, hospitals, schools, and advertisements in Humnabad and Bidar.",
};

async function getBusinesses(): Promise<Business[]> {
  try {
    return await client.fetch(`*[_type == "business" && (status == "published" || !defined(status))] | order(featured desc, name asc) {
      _id, name, nameKn, category, description, address, locality, district, phone, whatsapp, mapsUrl, latitude, longitude, openingHours, featured
    }`);
  } catch (error) {
    console.error("Business directory fetch failed:", error);
    return [];
  }
}

export default async function BusinessesPage() {
  const businesses = await getBusinesses();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-red-600">Humnabad · Bidar</p>
            <h1 className="text-4xl font-black md:text-5xl">Businesses &amp; Ads</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">Find hospitals, restaurants, schools, shops, and trusted local services near you.</p>
          </div>
          <a href="#list-business" className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-black text-white hover:bg-red-700">
            <PlusCircle size={18} /> List your business
          </a>
        </div>
        <BusinessDirectory businesses={businesses} />
        <section id="list-business" className="mt-14 scroll-mt-24 rounded-3xl bg-slate-900 p-7 text-white md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-red-300">Grow locally</p>
              <h2 className="text-2xl font-black md:text-3xl">List your business</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">Share your business details with our newsroom. We will verify the information before publishing it in the directory or featuring it as an advertisement.</p>
            </div>
            <a href="#business-form" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white hover:bg-[#1ebe5b]"><MessageCircle size={18} /> Open listing form</a>
          </div>
          <div id="business-form" className="scroll-mt-24"><BusinessSubmissionForm /></div>
          <p className="mt-5 text-xs text-slate-400">After submitting, WhatsApp will open with your details. Our team will verify the information before publishing. Paid placements are labelled as Sponsored.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
