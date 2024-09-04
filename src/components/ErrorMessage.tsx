export default function ErrorMessage({ error, id }: { error?: string; id: string }) {
  return (
    <p className="errorMessage" role="alert" id={id}>
      {error}
    </p>
  );
}
