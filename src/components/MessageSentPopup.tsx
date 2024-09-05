import { motion } from "framer-motion";
import IconSuccessCheck from "./icons/IconSuccessCheck";
export default function MessageSentPopup() {
  /* Animated "toast" message form submission success */
  /* Animated using framer-motion, I wanted to make it look like it's dropping from the top, I used the same animation as I used for the cart in my other project */
  return (
    <motion.div
      initial={{ opacity: 0, y: -200, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -200, x: "-50%" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="messageSentPopup"
      aria-live="assertive"
      aria-atomic="true"
      role="alert"
    >
      <div>
        <IconSuccessCheck /> <h2>Message Sent!</h2>
      </div>
      <p>Thanks for completing the form, we'll be in touch soon!</p>
    </motion.div>
  );
}
