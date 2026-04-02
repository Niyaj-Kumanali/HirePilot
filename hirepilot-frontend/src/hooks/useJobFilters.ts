import { useState, useMemo, useEffect } from 'react';
import type Job from '../types/job';
import { jobList as defaultJobList } from '../data/jobs';

export type JobType = '' | Job['type'];
export type JobLevel = '' | Job['level'];

interface UseJobFiltersProps {
    jobs?: Job[];
    itemsPerPage?: number;
}

export const useJobFilters = ({ jobs = defaultJobList, itemsPerPage = 5 }: UseJobFiltersProps = {}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<JobType>('');
    const [filterLevel, setFilterLevel] = useState<JobLevel>('');
    const [filterLocation, setFilterLocation] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Dynamic Options derived from data
    // Use the 'jobs' prop for dynamic options if provided, otherwise use defaultJobList
    const jobTypes = useMemo(() => Array.from(new Set((jobs || defaultJobList).map(j => j.type))), [jobs]);
    const jobLevels = useMemo(() => Array.from(new Set((jobs || defaultJobList).map(j => j.level))), [jobs]);
    const locations = useMemo(() => Array.from(new Set((jobs || defaultJobList).map(j => j.location))), [jobs]);

    // Filtering Logic
    const filteredJobs = useMemo(() => {
        return jobs.filter((job: Job) => {
            const matchesSearch =
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesType = filterType === '' || job.type === filterType;
            const matchesLevel = filterLevel === '' || job.level === filterLevel;
            const matchesLocation = filterLocation === '' || job.location === filterLocation;

            return matchesSearch && matchesType && matchesLevel && matchesLocation;
        });
    }, [searchTerm, filterType, filterLevel, filterLocation, jobs]);

    // Reset to page 1 when filters change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentPage(1);
    }, [searchTerm, filterType, filterLevel, filterLocation]);

    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleReset = () => {
        setSearchTerm('');
        setFilterType('');
        setFilterLevel('');
        setFilterLocation('');
    };

    const activeFiltersCount = [filterType, filterLevel, filterLocation].filter(f => f !== '').length;

    return {
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
        filteredJobs,
        paginatedJobs,
        totalPages,
        handleReset,
        activeFiltersCount
    };
};
