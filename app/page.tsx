import AdmissionForm from "@/components/AdmissionForm";
import BackgroundAnimation from "@/components/BackgroundAnimation";

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <BackgroundAnimation />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 drop-shadow-sm">
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
          </p>
        </div>

        <AdmissionForm />
      </div>
    </main>
  );
}
