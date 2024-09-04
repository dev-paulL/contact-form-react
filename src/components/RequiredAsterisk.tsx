export default function RequiredAsterisk() {
  /* I implemented the required fields "*" as :after pseudo-elements but screen-readers were saying "First Name Asterisk" 
     "Last Name Asterisk". I gave the required inputs an aria-required=true attribute so they are notified, and sighted users 
     are notified with the  <RequiredAsterisk /> that is hidden for screen-readers." */
  return (
    <span className="requiredAsterisk" aria-hidden="true">
      *
    </span>
  );
}
