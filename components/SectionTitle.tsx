interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ title, subtitle, align = 'left' }: SectionTitleProps) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg leading-8 text-zinc-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}