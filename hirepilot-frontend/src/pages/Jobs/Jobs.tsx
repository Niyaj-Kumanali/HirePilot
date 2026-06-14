import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type Job from '../../types/job';
import { Briefcase, TrendingUp, MapPin } from 'lucide-react';

import JobDetails from './JobDetails/JobDetails';
import JobsSidebar from './JobsSidebar/JobsSidebar';
import EmptyState from '../../components/EmptyState/EmptyState';
import JobCard from './JobCard/JobCard';
import VisualHeader from '../../components/ui/VisualHeader';
import Pagination from '../../components/ui/Pagination';
import JobToolbar from './JobToolbar/JobToolbar';
import { useJobFilters, type JobType, type JobLevel } from '../../hooks/useJobFilters';
import JobListSkeleton from '../../components/ui/JobListSkeleton';
import PageLayout from '../../Layout/MainLayout/PageLayout';

import { JOB_SERVICE } from '../../api/services/jobApi';

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarLocked, setIsSidebarLocked] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const sidebarFullContent = isSidebarLocked || isSidebarHovered;

  const toggleSidebarLock = () => setIsSidebarLocked(prev => !prev);

  const expandAndLockSidebar = () => {
    setIsSidebarHovered(true);
    setIsSidebarLocked(true);
  };

  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const data = await JOB_SERVICE.getJobs();
        setJobsData(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterLevel,
    setFilterLevel,
    filterLocation,
    setFilterLocation,
    currentPage,
    setCurrentPage,
    jobTypes,
    jobLevels,
    locations,
    paginatedJobs,
    totalPages,
    handleReset,
    activeFiltersCount,
    isFilterStale,
  } = useJobFilters({ jobs: jobsData });

  const filterConfigs = useMemo(
    () => [
      {
        label: 'Job Type',
        value: filterType,
        onChange: (val: string | number) => setFilterType(val as JobType),
        options: jobTypes,
        icon: Briefcase,
      },
      {
        label: 'Experience Level',
        value: filterLevel,
        onChange: (val: string | number) => setFilterLevel(val as JobLevel),
        options: jobLevels,
        icon: TrendingUp,
      },
      {
        label: 'Location',
        value: filterLocation,
        onChange: (val: string | number) => setFilterLocation(val as string),
        options: locations,
        icon: MapPin,
      },
    ],
    [filterType, filterLevel, filterLocation, jobTypes, jobLevels, locations, setFilterType, setFilterLevel, setFilterLocation]
  );

  const handleOpenJob = (job: Job) => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    setSelectedJob(job);
    setOpenDialog(true);
  };

  if (isLoading) return (
    <PageLayout
      sidebar={
        <div className="min-h-[calc(100vh-70px)] rounded-b-2xl border border-black/[0.04] dark:border-white/[0.06] bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-xl shadow-lg shadow-black/[0.02] dark:shadow-black/[0.2] overflow-hidden">
          <div className="min-h-[calc(100vh-70px)] flex flex-col">
            <div className="shrink-0 flex items-center justify-center px-3 py-2.5 border-b border-black/[0.04] dark:border-white/[0.06]">
              <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-[#2a2d35] animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-3">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 py-2">
                  <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-[#2a2d35] animate-pulse" />
                  <div className="w-14 h-3 rounded bg-gray-200 dark:bg-[#2a2d35] animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <header className="text-center py-6 md:py-8 space-y-3">
        <div className="w-[200px] h-7 mx-auto rounded-full animate-pulse bg-gray-200 dark:bg-[#2a2d35]" />
        <div className="w-[300px] h-10 mx-auto rounded animate-pulse bg-gray-200 dark:bg-[#2a2d35]" />
        <div className="w-[400px] h-5 mx-auto rounded animate-pulse bg-gray-200 dark:bg-[#2a2d35]" />
      </header>
      <div className="mb-4">
        <div className="w-full h-12 rounded-xl animate-pulse bg-gray-200 dark:bg-[#2a2d35]" />
      </div>
      <JobListSkeleton count={5} />
    </PageLayout>
  );

  return (
    <PageLayout
      sidebarWidth={sidebarFullContent ? 300 : 72}
      sidebar={
        <JobsSidebar
          filters={filterConfigs}
          activeFilters={activeFiltersCount}
          onReset={handleReset}
          mobileOpen={mobileFiltersOpen}
          onMobileClose={() => setMobileFiltersOpen(false)}
          showFullContent={sidebarFullContent}
          isLocked={isSidebarLocked}
          toggleLock={toggleSidebarLock}
          expandAndLock={expandAndLockSidebar}
          setIsHovered={setIsSidebarHovered}
        />
      }
    >
      <header className="text-center py-6 md:py-8">
        <VisualHeader
          badge='New opportunities added today'
          title='Find Your'
          highlight='Dream Job'
          subtitle="Discover amazing opportunities and advance your career with HirePilot's curated job board for developers."
        />
      </header>

      <JobToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onMobileFilterOpen={() => setMobileFiltersOpen(true)}
      />

      <section className="flex flex-col gap-3.5 w-full min-w-0 mt-3">
        {isFilterStale && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10 text-sm text-primary font-semibold">
            <span className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            Updating results…
          </div>
        )}
        <div>
          {paginatedJobs.length > 0 ? (
            <>
              <div className="flex flex-col gap-3">
                {paginatedJobs.map((job: Job) => (
                  <JobCard key={job.id} job={job} onOpen={handleOpenJob} />
                ))}
              </div>
              <div className="mt-3.5">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            </>
          ) : (
            <EmptyState
              title="No jobs found"
              description="We couldn't find any jobs matching your current filters. Try broadening your search criteria."
            />
          )}
        </div>
      </section>

      {selectedJob && (
        <JobDetails job={selectedJob} onClose={() => setOpenDialog(false)} open={openDialog} />
      )}
    </PageLayout>
  );
};

export default Jobs;
