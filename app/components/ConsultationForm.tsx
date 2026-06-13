"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const consultationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  program: z.string().min(1, "Program is required"),
  country: z.string().min(1, "Country is required"),
  education: z.string().min(1, "Education level is required"),
  message: z.string().optional(),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms" })
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

const ConsultationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema)
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(`Thank you, ${data.name}! 🎓\n\nYour consultation request has been received. Our team will contact you shortly.`);
      } else {
        const errorData = (await response.json()) as { message?: string };
        console.error(
          "Failed to submit request: " +
          (errorData.message ?? "Please check your inputs.")
        );
      }
    } catch (error) {
      console.error(error);
      console.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="sec-form">
      <div className="container">
        <div className="form-wrap reveal">
          <div className="form-header">
            <div className="form-header-text">
              <h2>Free Consultation</h2>
              <p>Get personalized guidance from our education experts</p>
            </div>
            <div className="form-header-badge">
              <div className="num">5000+</div>
              <div className="lbl">Students Helped</div>
            </div>
          </div>

          <div className="form-body">
            <form id="consultation-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-grid">
                <div className="fg">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" {...register("name")} placeholder="Your full name" />
                  {errors.name && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "-0.2rem" }}>{errors.name.message}</p>}
                </div>

                <div className="fg">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" {...register("email")} placeholder="your@email.com" />
                  {errors.email && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "-0.2rem" }}>{errors.email.message}</p>}
                </div>

                <div className="fg">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" {...register("phone")} placeholder="+92 3XX XXXXXXX" />
                  {errors.phone && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "-0.2rem" }}>{errors.phone.message}</p>}
                </div>

                <div className="fg">
                  <label htmlFor="program">Interested Program *</label>
                  <select id="program" {...register("program")}>
                    <option value="">Select a program</option>
                    <option value="MBBS">MBBS Abroad</option>
                    <option value="BDS">BDS Abroad</option>
                    <option value="PhD">PhD in China</option>
                    <option value="Scholarship">Scholarship Programs</option>
                  </select>
                  {errors.program && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "-0.2rem" }}>{errors.program.message}</p>}
                </div>

                <div className="fg">
                  <label htmlFor="country">Preferred Country *</label>
                  <select id="country" {...register("country")}>
                    <option value="">Select country</option>
                    <option value="China">China</option>
                    <option value="Russia">Russia</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Any">Not sure yet</option>
                  </select>
                  {errors.country && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "-0.2rem" }}>{errors.country.message}</p>}
                </div>

                <div className="fg">
                  <label htmlFor="education">Current Education *</label>
                  <select id="education" {...register("education")}>
                    <option value="">Select level</option>
                    <option value="12th">FSc / A-Levels (12th)</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                  </select>
                  {errors.education && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "-0.2rem" }}>{errors.education.message}</p>}
                </div>
              </div>

              <div className="fg" style={{ marginBottom: "1.2rem" }}>
                <label htmlFor="message">Any specific questions or goals? (Optional)</label>
                <textarea id="message" {...register("message")} placeholder="E.g., I want to know about full scholarships in China..."></textarea>
              </div>

              <div className="form-check">
                <input type="checkbox" id="terms" {...register("terms")} />
                <label htmlFor="terms">I agree to receive updates via WhatsApp and Email regarding my application.</label>
                {errors.terms && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.terms.message}</span>}
              </div>

              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Get Free Consultation"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
