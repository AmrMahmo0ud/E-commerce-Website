export default function EmptyState({ icon, title, message, action }) {
  return (
    <section className="flex flex-col items-center justify-center gap-3.5 rounded-xl border border-zinc-200 px-5 py-12 text-center md:min-h-100 md:gap-4 md:p-8">
      {icon && (
        <span
          aria-hidden="true"
          className="flex size-14 items-center justify-center rounded-full bg-zinc-100"
        >
          {icon}
        </span>
      )}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-lg font-semibold md:text-xl">{title}</h2>
        {message && <p className="text-[15px] text-zinc-600">{message}</p>}
      </div>
      {action}
    </section>
  );
}
