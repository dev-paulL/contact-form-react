
export default function ErrorWrapper({children, id} : {children:any, id:string}) {
  return (
    <p id={id} aria-live='assertive'>{children}</p>
  )
}
