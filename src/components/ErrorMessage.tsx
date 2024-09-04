export default function ErrorMessage({ error }: { error?: string }) {
  return <p className="errorMessage">{error}</p>;
}
