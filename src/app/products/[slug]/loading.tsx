export default function ProductLoading() {
  return (
    <div className="container-page py-6 sm:py-10" aria-busy="true" aria-label="Loading product">
      <div className="h-3 w-40 animate-pulse rounded-full bg-cream-200" />
      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-[1199/1312] animate-pulse rounded-[2rem] bg-cream-200" />
        <div className="flex flex-col gap-5">
          <div className="h-3 w-48 animate-pulse rounded-full bg-cream-200" />
          <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-cream-200" />
          <div className="h-6 w-1/2 animate-pulse rounded-full bg-cream-200" />
          <div className="h-9 w-32 animate-pulse rounded-full bg-cream-200" />
          <div className="h-24 animate-pulse rounded-2xl bg-cream-200" />
          <div className="h-12 animate-pulse rounded-full bg-cream-200" />
        </div>
      </div>
    </div>
  );
}
