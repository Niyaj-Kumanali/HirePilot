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

import { JOB_SERVICE } from '../../api/services/jobApi';
import Loading from '../../components/Loading/Loading';

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
    activeFiltersCount
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

  if (isLoading) return <Loading />;

  return (
    <main className="min-h-screen relative before:fixed before:inset-0 before:bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.08)_0%,transparent_50%)] before:pointer-events-none before:z-0">
      <div className="relative z-1 pr-2 md:pr-2 lg:pr-2 pl-2 md:pl-0 lg:pl-0">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 items-start">
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

          <div className="flex flex-col min-w-0">
            <header className="text-center py-3 md:py-5">
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
              <div>
                {paginatedJobs.length > 0 ? (
                  <>
                    <div className="flex flex-col gap-2">
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
          </div>
        </div>
      </div>

      {selectedJob && (
        <JobDetails job={selectedJob} onClose={() => setOpenDialog(false)} open={openDialog} />
      )}
    </main>
  );
};

export default Jobs;
