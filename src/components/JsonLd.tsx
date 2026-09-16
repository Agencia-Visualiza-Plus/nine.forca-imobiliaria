type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Os dados estruturados são gerados no servidor a partir de valores controlados.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
