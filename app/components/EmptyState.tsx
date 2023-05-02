interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[25vh] sm:h-[31vh] md:h-[28vh] lg:h-[45vh]">
      <div className="text-2xl font-bold ">{title}</div>
      <div className="font-light text-neutral-600">{subtitle}</div>
    </div>
  );
};
export default EmptyState;
