export default function ErrorMessage({ error, id }: { error?: string; id: string }) {
  /* Displayed under the Contact form input fields */
  /* The alert role will notify the screen reader as soon as it appears */
  return (
    <p className="errorMessage" role="alert" aria-live="polite" id={id}>
      {error}
    </p>
  );
}
