export default function ErrorMessage({ error }: { error?: string }) {
  /* Displayed under the Contact form input fields */
  /* The alert role will notify the screen reader as soon as it appears */
  return (
    <p className="errorMessage">
      {error}
    </p>
  );
}
