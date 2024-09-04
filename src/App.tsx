import { z } from "zod";
import "./App.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./components/ErrorMessage";
import { useState } from "react";
import MessageSentPopup from "./components/MessageSentPopup";
import { AnimatePresence } from "framer-motion";
import RequiredAsterisk from "./components/RequiredAsterisk";

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
  } = useForm<FormData>({ resolver: zodResolver(contactFormSchema) }); // @hookform/resolvers

  const onSubmit: SubmitHandler<FormData> = (data) => {
    /* When the form is validated and the user clicks the submit button, 
    shows the result in console (but they could be manipulated instead or sent to the server), 
    updates the isFormCompleted state that will trigger the toast success message to show for 3 seconds & reset the form */
    setIsFormCompleted(true);
    console.log(data);
    reset();
    setTimeout(() => {
      setIsFormCompleted(false);
    }, 3000);
  };

  return (
    <main>
      {/* <AnimatePresence> from framer-motion */}
      <AnimatePresence>{isFormCompleted && <MessageSentPopup />}</AnimatePresence>

      {/* The form comports multiple <fieldset> that improve accessibility. The inputs are grouped by category 
        The inputs could be refactored into a reusable component but since the form is relatively simple I decided not to*/}
      <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="contactFormTitle">
        <h1 id="contactFormTitle">Contact Us</h1>
        
        <fieldset>
          {/* Legends have the sr-only class & are "hidden" for sighted users, but the screen readers still have access to it */}
          <legend className="sr-only">Personal Information</legend>
          <div className="inlineInputs">
            <div>
              <label className="required" htmlFor="firstName">
                First Name <RequiredAsterisk />
              </label>
              {/* Each required input needs the aria-required attribute set to true to notify the visually impaired users.
              Its error message id has to be assigned to the aria-describedby attribute.  */}
              <input
                aria-required="true"
                aria-describedby="firstName-error"
                className={`text ${errors.firstName ? "inputError" : ""}`}
                id="firstName"
                {...register("firstName")} // react-hook-form
              />
              {errors.firstName && <ErrorMessage id="firstName-error" error={errors.firstName.message} />}
            </div>

            <div>
              <label className="required" htmlFor="lastName">
                Last Name <RequiredAsterisk />
              </label>
              <input
                aria-required="true"
                id="lastName"
                aria-describedby="lastName-error"
                className={`text ${errors.lastName ? "inputError" : ""}`}
                {...register("lastName")}
              />
              {errors.lastName && <ErrorMessage id="lastName-error" error={errors.lastName.message} />}
            </div>
          </div>

          <label className="required" htmlFor="email">
            Email Address <RequiredAsterisk />
          </label>
          <input
            aria-required="true"
            aria-describedby="email-error"
            id="email"
            type="email"
            className={`text ${errors.email ? "inputError" : ""}`}
            {...register("email")}
          />
          {errors.email && <ErrorMessage id="email-error" error={errors.email.message} />}
        </fieldset>

        <fieldset>
          <legend className="sr-only">Select One of the Following Queries</legend>

          <label className="required">
            Query Type <RequiredAsterisk />
          </label>
          <div className="inlineInputs">
            <div className="radioChoice">
              <input
                aria-required="true"
                aria-describedby="queryType-error"
                type="radio"
                id="generalEnquiry"
                value="generalEnquiry"
                {...register("queryType")}
              />
              <label htmlFor="generalEnquiry">General Enquiry</label>
            </div>

            <div className="radioChoice">
              <input
                aria-required="true"
                aria-describedby="queryType-error"
                type="radio"
                id="supportRequest"
                value="supportRequest"
                {...register("queryType")}
              />
              <label htmlFor="supportRequest">Support Request</label>
            </div>
            {errors.queryType && <ErrorMessage id="queryType-error" error={errors.queryType.message} />}
          </div>
        </fieldset>

        <fieldset>
          <legend className="sr-only">Message</legend>
          <label className="required" htmlFor="message">
            Message <RequiredAsterisk />
          </label>
          <textarea
            aria-required="true"
            aria-describedby="message-error"
            className={`text ${errors.message ? "inputError" : ""}`}
            id="message"
            {...register("message")}
          ></textarea>
          {errors.message && <ErrorMessage id="message-error" error={errors.message.message} />}

          <div className="checkboxWrapper">
            <input aria-required="true" type="checkbox" id="consent" {...register("consent")} aria-describedby="consent-error" />
            <label className="required" htmlFor="consent">
              I consent to being contacted by the team <RequiredAsterisk />
            </label>
          </div>
          {errors.consent && <ErrorMessage id="consent-error" error={errors.consent.message} />}
        </fieldset>

        <button type="submit" name="Send Message">Submit</button>

      </form>
    </main>
  );
}

export default App;
