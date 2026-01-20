import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import './jobs.scss';
import type Job from '../../types/job';
import { jobList } from '../../data/jobs';
import JobDetails from './JobDetails/JobDetails';
import JobsSidebar from './JobsSidebar/JobsSidebar';
import { Filter } from 'lucide-react';
import EmptyState from '../../components/EmptyState/EmptyState';
import JobCard from './JobCard/JobCard';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';

type JobType = '' | Job['type'];
type JobLevel = '' | Job['level'];

const ITEMS_PER_PAGE = 5;

const Jobs = () => {
  const [jobs, _setJobs] = useState<Job[]>(jobList);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<JobType>('');
  const [filterLevel, setFilterLevel] = useState<JobLevel>('');
  const [filterLocation, setFilterLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  // Dynamic Options derived from data
  const jobTypes = useMemo(() => Array.from(new Set(jobList.map(j => j.type))), []);
  const jobLevels = useMemo(() => Array.from(new Set(jobList.map(j => j.level))), []);
  const locations = useMemo(() => Array.from(new Set(jobList.map(j => j.location))), []);

  // Optimized Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = filterType === '' || job.type === filterType;
      const matchesLevel = filterLevel === '' || job.level === filterLevel;
      const matchesLocation = filterLocation === '' || job.location === filterLocation;

      return matchesSearch && matchesType && matchesLevel && matchesLocation;
    });
  }, [searchTerm, filterType, filterLevel, filterLocation, jobs]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, filterLevel, filterLocation]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  const handleOpenJob = (job: Job) => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterLevel('');
    setFilterLocation('');
  };

  const activeFilters = [filterType, filterLevel, filterLocation].filter(f => f !== '').length;

  return (
    <main className="jobs-page-wrapper" >
      <div className="jobs-container" >
        <header className="jobs-header-container">
          <VisualHeader badge='New opportunities added today' title='Find Your' gradient_title='Dream Job' subtitle="Discover amazing opportunities and advance your career with HirePilot's curated job board for developers." />
        </header>
                    <div className="list-toolbar">


              <div className="toolbar-actions">
                <SearchBar placeHolder="Search jobs by title, company, or skills..." value={searchTerm} onChange={setSearchTerm} />
                <button className="mobile-filter-trigger" onClick={() => setMobileFiltersOpen(true)}>
                  <Filter size={16} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

        <div className="jobs-layout">


          <JobsSidebar
            jobTypes={jobTypes}
            jobLevels={jobLevels}
            locations={locations}
            filterType={filterType}
            filterLevel={filterLevel}
            filterLocation={filterLocation}
            onFilterTypeChange={setFilterType as any}
            onFilterLevelChange={setFilterLevel as any}
            onFilterLocationChange={setFilterLocation}
            onReset={handleReset}
            activeFilters={activeFilters}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          


          <section className="jobs-list-container" >
            {/* List Toolbar */}


            {/* Content Area */}
            <div className="jobs-grid-wrapper">
              {paginatedJobs.length > 0 ? (
                <>
                  <div className="jobs-stack">
                    {paginatedJobs.map(job => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onOpen={handleOpenJob}
                      />
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
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

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setOpenDialog(false)}
          open={openDialog}
        />
      )}
    </main>
  );
};

export default Jobs;