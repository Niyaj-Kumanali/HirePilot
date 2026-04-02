import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type Job from '../../types/job';
import { Box, useTheme, alpha } from '@mui/material';
import { Briefcase, TrendingUp, MapPin } from 'lucide-react';

// Components & Hooks
import JobDetails from './JobDetails/JobDetails';
import JobsSidebar from './JobsSidebar/JobsSidebar';
import EmptyState from '../../components/EmptyState/EmptyState';
import JobCard from './JobCard/JobCard';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import Pagination from '../../components/Pagination/Pagination';
import JobToolbar from './JobToolbar/JobToolbar';
import { useJobFilters, type JobType, type JobLevel } from '../../hooks/useJobFilters';

// Mock API Service
import { JOB_SERVICE } from '../../api/services/jobApi';
import Loading from '../../components/Loading/Loading';

/**
 * The main page for browsing and filtering job opportunities.
 * 
 * It uses the mocked `JOB_SERVICE` for local data fetching
 * and the `useJobFilters` hook for complex filtering across job types, 
 * experience levels, and locations. 
 */
const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const theme = useTheme();

  // Fetch jobs using mock service
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

  // Memoize filter configuration
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
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', pr: { xs: 2, md: 2, lg: 2 }, pl: { xs: 2, md: 0, lg: 0 } }}>
        <Box component="header" sx={{ textAlign: 'center', py: { xs: 3, md: 5 } }}>
          <VisualHeader
            badge='New opportunities added today'
            title='Find Your'
            gradient_title='Dream Job'
            subtitle="Discover amazing opportunities and advance your career with HirePilot's curated job board for developers."
          />
        </Box>

        <JobToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onMobileFilterOpen={() => setMobileFiltersOpen(true)}
        />

        <Box sx={{ display: 'flex', gap: 4, alignItems: 'start', mt: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
          <JobsSidebar
            filters={filterConfigs}
            activeFilters={activeFiltersCount}
            onReset={handleReset}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, width: '100%' }}>
            <Box>
              {paginatedJobs.length > 0 ? (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {paginatedJobs.map((job: Job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onOpen={handleOpenJob}
                      />
                    ))}
                  </Box>
                  <Box sx={{ mt: 3.5 }}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </Box>
                </>
              ) : (
                <EmptyState
                  title="No jobs found"
                  description="We couldn't find any jobs matching your current filters. Try broadening your search criteria."
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setOpenDialog(false)}
          open={openDialog}
        />
      )}
    </Box>
  );
};

export default Jobs;