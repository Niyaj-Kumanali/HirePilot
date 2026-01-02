import { useState, useMemo } from 'react';
import './jobs.scss';
import type Job from '../../types/job';
import { jobList } from '../../data/jobs';
import JobsSearch from '../../components/SearchBar/SearchBar';
import JobDetails from './JobDetails/JobDetails';
import JobsSidebar from './JobsSidebar/JobsSidebar';
import { LayoutGrid, Filter, Bookmark } from 'lucide-react';
import EmptyState from '../../components/EmptyState/EmptyState';
import JobCard from './JobCard/JobCard';

type JobType = '' | Job['type'];
type JobLevel = '' | Job['level'];

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>(jobList);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<JobType>('');
  const [filterLevel, setFilterLevel] = useState<JobLevel>('');
  const [filterLocation, setFilterLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Dynamic Options derived from data
  const jobTypes = useMemo(() => Array.from(new Set(jobList.map(j => j.type))), []);
  const jobLevels = useMemo(() => Array.from(new Set(jobList.map(j => j.level))), []);
  const locations = useMemo(() => Array.from(new Set(jobList.map(j => j.location))), []);

  console.log(filterType)

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

  const handleSaveJob = (jobId: number) => {
    setJobs(prev => prev.map(job => (job.id === jobId ? { ...job, saved: !job.saved } : job)));
  };

  const handleOpenJob = (job: Job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterLevel('');
    setFilterLocation('');
  };

  const savedCount = jobs.filter(j => j.saved).length;
  const activeFilters = [filterType, filterLevel, filterLocation].filter(f => f !== '').length;

  return (
    <main className="jobs-page-wrapper">
      <div className="jobs-container">
        <header className="jobs-header-container">
          <div className="header-visual-bg"></div>

          <div className="header-content">
            <div className="header-badge">
              <span className="badge-dot"></span>
              New opportunities added today
            </div>

            <h1 className="jobs-title">
              Find Your <span>Dream Job</span>
            </h1>

            <p className="jobs-subtitle">
              Discover amazing opportunities and advance your career with HirePilot's curated job board for developers.
            </p>
          </div>
        </header>

        <div className="jobs-search-section">
          <JobsSearch placeHolder="Search jobs by title, company, or skills..." value={searchTerm} onChange={setSearchTerm} />
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


          <section className="jobs-list-container">
            {/* List Toolbar */}
            <div className="list-toolbar">
              <div className="result-stats">
                <LayoutGrid size={18} className="stats-icon" />
                <p className="stats-text">
                  Showing <span>{filteredJobs.length}</span> available position{filteredJobs.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="toolbar-actions">
                <button className="mobile-filter-trigger" onClick={() => setMobileFiltersOpen(true)}>
                  <Filter size={16} />
                  <span>Filters</span>
                </button>

                <div className="saved-jobs-pill">
                  <Bookmark size={16} fill={savedCount > 0 ? "#6366f1" : "none"} />
                  <span className="pill-label">Saved</span>
                  {savedCount > 0 && <span className="pill-badge">{savedCount}</span>}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="jobs-grid-wrapper">
              {filteredJobs.length > 0 ? (
                <div className="jobs-stack">
                  {filteredJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onSave={handleSaveJob}
                      onOpen={handleOpenJob}
                    />
                  ))}
                </div>
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