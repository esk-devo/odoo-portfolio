import Marquee from "./ui/Marquee";
import { clients, clientsCaption, clientsLabel } from "../data/content";

// Logo tile when `logo` is set; otherwise initials badge + name.
function ClientTile({ client }) {
  return (
    <div className="flex h-14 items-center gap-3 rounded-2xl border border-border bg-surface px-4 sm:h-16 sm:px-5">
      {client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          loading="lazy"
          className="h-7 w-auto max-w-[140px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:invert-[.85]"
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-soft font-display text-xs font-semibold text-primary-tx"
          >
            {client.initials}
          </span>
          <span className="whitespace-nowrap font-display text-base font-semibold tracking-[-0.01em] text-text">
            {client.name}
          </span>
        </>
      )}
    </div>
  );
}

export default function ClientsMarquee() {
  return (
    <section aria-labelledby="clients-caption" className="bg-bg py-10 sm:py-12">
      <p
        id="clients-caption"
        className="px-4 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-muted sm:text-sm"
      >
        {clientsCaption}
      </p>
      <div className="mx-auto mt-6 max-w-[1440px]">
        <Marquee
          items={clients}
          getKey={(c) => c.name}
          label={clientsLabel}
          renderItem={(c) => <ClientTile client={c} />}
        />
      </div>
    </section>
  );
}
