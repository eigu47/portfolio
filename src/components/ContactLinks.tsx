import { siteContent } from "~/content";

export default function ContactLinks({
  anchorClassName,
  iconClassName,
  includeIds = true,
  iconAriaHidden = false,
}: {
  anchorClassName?: string;
  iconClassName?: string;
  includeIds?: boolean;
  iconAriaHidden?: boolean;
}) {
  return (
    <>
      {siteContent.contacts.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          id={includeIds ? label : undefined}
          className={anchorClassName}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
        >
          <Icon className={iconClassName} aria-hidden={iconAriaHidden} />
        </a>
      ))}
    </>
  );
}
