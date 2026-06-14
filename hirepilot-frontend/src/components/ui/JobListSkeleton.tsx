import Skeleton from './Skeleton';

const JobListSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="flex flex-col gap-2">
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="p-3 rounded-2xl border border-white/60 dark:border-white/10 bg-white/70 dark:bg-[#1a1d23]/70 flex flex-col gap-2.5"
      >
        <div className="flex items-start gap-2.5">
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" height={22} />
            <Skeleton variant="text" width="35%" height={16} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Skeleton variant="text" width="100%" height={14} />
          <Skeleton variant="text" width="75%" height={14} />
        </div>

        <div className="flex gap-2 py-2.25 border-t border-b border-black/5 dark:border-white/5">
          <Skeleton variant="rounded" width={90} height={20} />
          <Skeleton variant="rounded" width={80} height={20} />
          <Skeleton variant="rounded" width={100} height={20} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-1.5">
            <Skeleton variant="rounded" width={70} height={22} />
            <Skeleton variant="rounded" width={50} height={22} />
          </div>
          <Skeleton variant="rounded" width={80} height={16} />
        </div>

        <div className="px-3 py-2 -mx-3 -mb-3 mt-1 border-t border-black/5 dark:border-white/5 bg-secondary/5 dark:bg-secondary/5 rounded-b-2xl">
          <Skeleton variant="text" width="40%" height={14} />
        </div>
      </div>
    ))}
  </div>
);

export default JobListSkeleton;
