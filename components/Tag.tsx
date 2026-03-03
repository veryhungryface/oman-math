type TagProps = {
  label: string;
  tone?: "neutral" | "accent" | "soft";
};

export default function Tag({ label, tone = "neutral" }: TagProps) {
  return <span className={`tag tag-${tone}`}>{label}</span>;
}
