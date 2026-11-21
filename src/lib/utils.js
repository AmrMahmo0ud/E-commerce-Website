// Format a number as US dollars with two decimals: 74.5 -> "$74.50".
export function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

// Soft tint behind each product photo, one per category (from the design).
// Kept as full class names so Tailwind can find them when it scans this file.
const categoryTints = {
  Electronics: "bg-[#E6EBF2]",
  Fashion: "bg-[#F0EBE3]",
  Home: "bg-[#F3E9E4]",
  Sports: "bg-[#E5EDE7]",
};

export function categoryTint(category) {
  return categoryTints[category] ?? "bg-zinc-100";
}
