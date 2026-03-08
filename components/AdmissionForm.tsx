"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { CheckCircle2, ChevronRight, GraduationCap, MapPin, User, Mail, Phone, Calendar, RotateCcw, Globe } from "lucide-react";
import { COURSE_GROUPS, STATES, COUNTRIES } from "../lib/constants";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be less than 50 characters.").regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces."),
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
  phone: z.string().min(1, "Phone number is required.").regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
  course: z.string().min(1, "Please select a course."),
  country: z.string().min(1, "Please select a country."),
  state: z.string().optional(),
  date: z.string().min(1, "Please select a date.").refine((val) => {
    const selectedDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Date cannot be in the past."),
}).superRefine((data, ctx) => {
  if (data.country && data.country !== "International" && !data.state) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a state.",
      path: ["state"],
    });
  }
});

type FormData = z.infer<typeof formSchema>;

export default function AdmissionForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    control,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedState = useWatch({
    control,
    name: "state",
  });

  const selectedCountry = useWatch({
    control,
    name: "country",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Something went wrong.");
      }

      setIsSubmitted(true);
      reset();

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error("[AdmissionForm] Submission error:", err);
      alert("Failed to submit your enquiry. Please try again.");
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-indigo-600 px-8 py-10 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path fill="#fff" d="M41.5,-63.5C53.7,-53.4,63.5,-40.5,69.5,-25.7C75.5,-10.9,77.7,5.8,73.4,20.8C69.1,35.8,58.3,49,44.9,58.5C31.5,68,15.8,73.8,0.1,73.6C-15.5,73.5,-31,67.5,-44.6,58.1C-58.2,48.7,-69.9,35.9,-75.4,21.1C-80.9,6.3,-80.2,-10.5,-73.4,-24.8C-66.6,-39.1,-53.7,-50.9,-40.1,-60.4C-26.5,-69.9,-13.2,-77.1,1.1,-78.6C15.4,-80.1,30.8,-75.9,41.5,-63.5Z" transform="translate(200 200)" />
          </svg>
        </div>
        <GraduationCap className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
        <h2 className="text-3xl font-bold tracking-tight mb-2">Admission Enquiry</h2>
        <p className="text-indigo-100 max-w-md mx-auto">Take the first step towards your future. Fill out the form below and our team will get in touch with you.</p>
      </div>

      <div className="p-8">
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Submitted!</h3>
            <p className="text-gray-600 max-w-sm">Thank you for your interest. We have received your details and will contact you shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" /> Full Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-gray-50 focus:bg-white outline-none`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" /> Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-gray-50 focus:bg-white outline-none`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" /> Phone Number
                </label>
                <input
                  id="phone"
                  {...register("phone")}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-gray-50 focus:bg-white outline-none`}
                  placeholder="9876543210"
                  maxLength={10}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" /> Preferred Date
                </label>
                <input
                  id="date"
                  type="date"
                  {...register("date")}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.date ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-gray-50 focus:bg-white outline-none`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="course" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-400" /> Select Course
              </label>
              <select
                id="course"
                {...register("course")}
                className={`w-full px-4 py-3 rounded-xl border ${errors.course ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-gray-50 focus:bg-white outline-none appearance-none`}
              >
                <option value="">Choose a course...</option>
                {COURSE_GROUPS.map((group, idx) => (
                  <optgroup key={idx} label={group.label}>
                    {group.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" /> Select Country
                </label>
                <select
                  id="country"
                  {...register("country")}
                  onChange={(e) => {
                    setValue("country", e.target.value, { shouldValidate: true });
                    if (e.target.value === "International") {
                      setValue("state", "");
                      clearErrors("state");
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.country ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-gray-50 focus:bg-white outline-none appearance-none`}
                >
                  <option value="">Choose a country...</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>

              {selectedCountry !== "International" && (
                <div className="space-y-2">
                  <label htmlFor="state" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" /> Select State
                  </label>
                  <select
                    id="state"
                    {...register("state")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.state ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-all duration-300 focus:-translate-y-1 focus:shadow-lg bg-gray-50 focus:bg-white outline-none appearance-none`}
                  >
                    <option value="">Choose a state...</option>
                    {STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setValue("country", "");
                  setValue("state", "");
                }}
                disabled={isSubmitting}
                className="w-full sm:w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <RotateCcw className="w-5 h-5" /> Clear
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-2/3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>
                    Submit Enquiry <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
