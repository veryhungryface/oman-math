type KpiCardProps = {
  label: string;
  value: string;
  helper?: string;
};

export default function KpiCard({ label, value, helper }: KpiCardProps) {
  return (
    <div className="card kpi-card">
      <p className="detail-label">{label}</p>
      <p className="kpi-value">{value}</p>
      {helper ? <p className="subtext">{helper}</p> : null}
    </div>
  );
}
