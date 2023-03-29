export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 flex h-20 w-full items-center bg-slate-950/50 shadow-md backdrop-blur">
      <ul className="container mx-auto flex gap-10 text-slate-300">
        {NAVITEMS.map(({ name, href, className = "" }) => (
          <li key={name} className={className}>
            <a
              className="relative p-3 transition duration-300 after:absolute after:bottom-1 after:right-1/2 after:h-[2px] after:w-4/6 after:origin-center after:translate-x-1/2 after:scale-x-0 after:bg-emerald-400 after:transition hover:text-white hover:after:scale-x-100"
              href={href}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const NAVITEMS = [
  {
    name: "Home",
    href: "#",
    className: "grow",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Contact",
    href: "#contact",
  },
  {
    name: "Resume",
    href: "#resume",
  },
];
