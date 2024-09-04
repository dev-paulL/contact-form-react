import { z } from "zod";
import "./App.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./components/ErrorMessage";
import { useState } from "react";
import MessageSentPopup from "./components/MessageSentPopup";
import { AnimatePresence } from "framer-motion";

const errorRequired = "This field is required";
const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: errorRequired }),
  lastName: z.string().min(1, { message: errorRequired }),
  email: z.string().email("Please enter a valid email address").min(1, { message: errorRequired }),
  queryType: z.enum(["generalEnquiry", "supportRequest"], { message: "Please select a query type" }),
  message: z.string().min(1, { message: errorRequired }),
  consent: z.boolean().refine((value) => value === true, { message: "To submit this form, please consent to being contacted" }),
});

type FormData = z.infer<typeof contactFormSchema>;

function App() {
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsFormCompleted(true);
    console.log(data);
    reset();
    setTimeout(() => {
      setIsFormCompleted(false);
    }, 3000); 
  };

  return (
    <main>
      <AnimatePresence>{isFormCompleted && <MessageSentPopup />}</AnimatePresence>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Contact Us</h1>

        <fieldset>
          <legend>Personal Information</legend>
          <div className="inlineInputs">
            <div>
              <label className="required" htmlFor="firstName">
                First Name
              </label>
              <input className={`text ${errors.firstName ? "inputError" : ""}`} id="firstName" {...register("firstName")} />
              {errors.firstName && <ErrorMessage error={errors.firstName.message} />}
            </div>

            <div>
              <label className="required" htmlFor="lastName">
                Last Name
              </label>
              <input id="lastName" className={`text ${errors.lastName ? "inputError" : ""}`} {...register("lastName")} />
              {errors.lastName && <ErrorMessage error={errors.lastName.message} />}
            </div>
          </div>

          <label className="required" htmlFor="email">
            Email Address
          </label>
          <input id="email" type="email" className={`text ${errors.email ? "inputError" : ""}`} {...register("email")} />
          {errors.email && <ErrorMessage error={errors.email.message} />}
        </fieldset>

        <fieldset>
          <legend>Select One of the Following Queries</legend>

          <label className="required">Query Type</label>
          <div className="inlineInputs">
            <div className="radioChoice">
              <input type="radio" id="generalEnquiry" value="generalEnquiry" {...register("queryType")} />
              <label htmlFor="generalEnquiry">General Enquiry</label>
            </div>

            <div className="radioChoice">
              <input type="radio" id="supportRequest" value="supportRequest" {...register("queryType")} />
              <label htmlFor="supportRequest">Support Request</label>
            </div>
            {errors.queryType && <ErrorMessage error={errors.queryType.message} />}
          </div>
        </fieldset>

        <fieldset>
          <legend>Message</legend>
          <label className="required" htmlFor="message">
            Message
          </label>
          <textarea className={`text ${errors.message ? "inputError" : ""}`} id="message" {...register("message")}></textarea>
          {errors.message && <ErrorMessage error={errors.message.message} />}

          <div className="checkboxWrapper">
            <input type="checkbox" id="consent" {...register("consent")} />
            <label className="required" htmlFor="consent">
              I consent to being contacted by the team
            </label>
          </div>
          {errors.consent && <ErrorMessage error={errors.consent.message} />}
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App;
