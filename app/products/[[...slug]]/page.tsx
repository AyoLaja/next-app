interface ProductPageProps {
  params: {
    slug: string[];
  };
  searchParams: {
    sortOrder: string;
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { slug } = await params;
  const { sortOrder } = await searchParams;

  return (
    <div>
      <h1>Product</h1>
      Product {slug} {sortOrder}
    </div>
  );
}
