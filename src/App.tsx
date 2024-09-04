import { z } from "zod";
import "./App.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./components/ErrorMessage";
import { useState } from "react";
import MessageSentPopup from "./components/MessageSentPopup";
import { AnimatePresence } from "framer-motion";
import RequiredAsterisk from "./components/RequiredAsterisk";
import ErrorWrapper from "./components/ErrorWrapper";

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
    updates the isFormCompleted state that will trigger the toast success message to show for 5 seconds & reset the form */
    setIsFormCompleted(true);
    console.log(data);
    reset();
    setTimeout(() => {
      setIsFormCompleted(false);
    }, 5000);
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
                autoComplete="given-name"
                required
                aria-describedby="firstName-error"
                className={`text ${errors.firstName ? "inputError" : ""}`}
                id="firstName"
                {...register("firstName")} // react-hook-form
              />
              <ErrorWrapper id="firstName-error">{errors.firstName && <ErrorMessage error={errors.firstName.message} />}</ErrorWrapper>
            </div>

            <div>
              <label className="required" htmlFor="lastName">
                Last Name <RequiredAsterisk />
              </label>
              <input
                autoComplete="family-name"
                required
                id="lastName"
                aria-describedby="lastName-error"
                className={`text ${errors.lastName ? "inputError" : ""}`}
                {...register("lastName")}
              />
              <ErrorWrapper id="lastName-error">{errors.lastName && <ErrorMessage error={errors.lastName.message} />}</ErrorWrapper>
            </div>
          </div>

          <label className="required" htmlFor="email">
            Email Address <RequiredAsterisk />
          </label>
          <input
            autoComplete="email"
            required
            aria-describedby="email-error"
            id="email"
            type="email"
            className={`text ${errors.email ? "inputError" : ""}`}
            {...register("email")}
          />
          <ErrorWrapper id="email-error">{errors.email && <ErrorMessage error={errors.email.message} />}</ErrorWrapper>
        </fieldset>

        <fieldset>
          <label className="required">
            Query Type <RequiredAsterisk />
          </label>
          <div className="inlineInputs">
            <div className="radioChoice">
              <input required aria-describedby="queryType-error" type="radio" id="generalEnquiry" value="generalEnquiry" {...register("queryType")} />
              <label htmlFor="generalEnquiry">General Enquiry</label>
            </div>

            <div className="radioChoice">
              <input required aria-describedby="queryType-error" type="radio" id="supportRequest" value="supportRequest" {...register("queryType")} />
              <label htmlFor="supportRequest">Support Request</label>
            </div>
            <ErrorWrapper id="queryType-error">{errors.queryType && <ErrorMessage error={errors.queryType.message} />}</ErrorWrapper>
          </div>
        </fieldset>

        <label className="required" htmlFor="message">
          Message <RequiredAsterisk />
        </label>
        <textarea
          required
          aria-describedby="message-error"
          className={`text ${errors.message ? "inputError" : ""}`}
          id="message"
          {...register("message")}
        ></textarea>
        <ErrorWrapper id="message-error">{errors.message && <ErrorMessage error={errors.message.message} />}</ErrorWrapper>

        <div className="checkboxWrapper">
          <input required type="checkbox" id="consent" {...register("consent")} aria-describedby="consent-error" />
          <label className="required" htmlFor="consent">
            I consent to being contacted by the team <RequiredAsterisk />
          </label>
        </div>
        <ErrorWrapper id="consent-error">{errors.consent && <ErrorMessage error={errors.consent.message} />}</ErrorWrapper>

        <button type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}

export default App;
