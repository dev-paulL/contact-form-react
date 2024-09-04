import { motion } from "framer-motion";
export default function MessageSentPopup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -200, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -200, x: "-50%" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="messageSentPopup"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div>
        <img src="../src/assets/images/icon-success-check.svg" alt="" aria-hidden="true" /> <h2>Message Sent!</h2>{" "}
      </div>
      <p>Thanks for completing the form, we'll be in touch soon!</p>
    </motion.div>
  );
}
