export default function SubmitButton({
  children,
  bg = "bg-primaryGreen",
  p = "p-3",
}) {
  return (
    <button className={`${bg} text-white ${p} rounded-3xl`}>{children}</button>
  );
}
