const priceFormatter = new Intl.NumberFormat("en-LK", {
  style: "currency",
  currency: "LKR",
  currencyDisplay: "code",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-LK", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
}
