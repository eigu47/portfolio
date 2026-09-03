import DebugOverlay from "~/components/canvas/DebugOverlay";
import { siteContent } from "~/content";
import { useDebugStore } from "~/utils/debugStore";

export default function Layout() {
  const debugOn = useDebugStore((state) => state.debugOn);
  if (debugOn) return <DebugOverlay />;
  return (
    <>
      <div className="after:bg-text-lo fixed bottom-0 mx-12 hidden flex-col gap-6 after:mx-auto after:mt-2 after:block after:h-20 after:w-[1px] sm:flex">
        {siteContent.contacts.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            id={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
          >
            <Icon className="stroke-text-lo hover:fill-accent focus:fill-accent block h-8 w-8 transition hover:-translate-y-0.5 focus:-translate-y-0.5" />
          </a>
        ))}
      </div>

      <div className="after:bg-text-lo fixed right-0 bottom-0 mx-12 hidden after:mx-auto after:mt-6 after:block after:h-20 after:w-[1px] sm:block">
        <a
          id="email"
          className="hover:text-accent focus:text-accent font-mono text-sm tracking-wider transition [writing-mode:vertical-rl] hover:-translate-y-0.5 focus:-translate-y-0.5"
          href={siteContent.mail.href}
        >
          {siteContent.mail.label}
        </a>
      </div>
    </>
  );
}
