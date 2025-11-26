export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="48" stroke="#CFB998" strokeWidth="2" />
      <path d="M35 70V30H65M50 30V70" stroke="#1C1917" strokeWidth="4" strokeLinecap="round"/>
      <path d="M35 50H65" stroke="#1C1917" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25 50C25 35 35 25 50 25C65 25 75 35 75 50" stroke="#CFB998" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
