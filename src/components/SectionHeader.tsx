type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  className?: string;
};

const SectionHeader = ({ eyebrow, title, className = '' }: SectionHeaderProps) => (
  <div className={`container section-header reveal ${className}`.trim()}>
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
  </div>
);

export default SectionHeader;
