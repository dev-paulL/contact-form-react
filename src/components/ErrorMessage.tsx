export default function ErrorMessage({ error }: { error?: string }) {
  /* Displayed under the Contact form input fields */
  return (
    <p className="errorMessage" role="alert">
      {error}
    </p>
  );
}
