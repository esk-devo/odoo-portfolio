import Logo from "./Logo";
import { focusRing } from "./ui/focus";
import { profile, footer } from "../data/content";

// Follows the theme (light in light mode). Stacked + centered on mobile.
export default function Footer() {
  const year = new Date().getFullYear();
  const { builtBy } = footer;

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-3 px-4 py-8 text-center text-base text-muted sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <Logo size={24} />
          <p>
            © {year} {profile.name}. {footer.rights}
          </p>
        </div>
        <p>
          {builtBy.label}{" "}
          <a
            href={builtBy.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded font-semibold text-primary-tx underline-offset-4 hover:underline ${focusRing}`}
          >
            {builtBy.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
