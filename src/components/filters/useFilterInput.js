"use client";
import { useEffect, useEffectEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { filtersHref } from "@/lib/filters";

// Returns a function that updates some filters in the URL.
// replace (not push) so typing doesn't fill the back button's history.
export function useUpdateFilters(filters) {
  const router = useRouter();
  return (changes) => router.replace(filtersHref(filters, changes), { scroll: false });
}

// Text boxes that write to the URL after the user stops typing for `delay` ms.
// `values` is what the URL says now, as strings, e.g. { min: "10", max: "" }.
// All boxes are sent together, so typing min then max quickly keeps both.
// If the URL changes from somewhere else (a "Clear filters" link, the back
// button), the boxes follow it. When the change is the one these boxes just
// sent, they are left alone, so letters typed while the page updates aren't lost.
export function useFilterInputs(values, onCommit, delay = 400) {
  const urlKey = JSON.stringify(values);
  const [texts, setTexts] = useState(values);
  const [seenKey, setSeenKey] = useState(urlKey);
  const [sentKey, setSentKey] = useState(null);

  if (urlKey !== seenKey) {
    setSeenKey(urlKey);
    if (urlKey === sentKey) setSentKey(null);
    else setTexts(values);
  }

  const commit = useEffectEvent((next) => {
    setSentKey(JSON.stringify(next));
    onCommit(next);
  });

  useEffect(() => {
    const next = Object.fromEntries(
      Object.entries(texts).map(([key, text]) => [key, text.trim()]),
    );
    if (JSON.stringify(next) === urlKey) return;
    const timer = setTimeout(() => commit(next), delay);
    return () => clearTimeout(timer);
  }, [texts, urlKey, delay]);

  const setText = (key, text) => setTexts((prev) => ({ ...prev, [key]: text }));
  return [texts, setText];
}
