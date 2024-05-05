import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { postRequest } from '@/config/request';
import { REQ_LIMIT } from '@/utils/constants';
import { JobResponse } from '@/types/type';
import { RootState } from '@/store/store';
import { addJobs } from '@/store/slice/jobSlice';
import { JobCard } from '@/components/JobCard/JobCard';
import { Spinner } from '@/components/Loader';
import { Filter } from '@/components/Filter';

import './Home.css';

export const Home = () => {
  const { jdList, filters, totalCount } = useSelector(
    (state: RootState) => state.jobs
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [filteredJdList, setFilteredJdList] = useState(jdList);

  const getAllJobs = async ({
    limit,
    offset,
  }: {
    offset: number;
    limit: number;
  }) => {
    setIsLoading(true);

    const reqBody = JSON.stringify({
      limit,
      offset,
    });

    try {
      const data: JobResponse = await postRequest({
        reqBody,
      });
      dispatch(addJobs(data));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (
      totalCount > jdList.length &&
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
    ) {
      setPage(prev => prev + 1);
    }
  }, [jdList.length, totalCount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    getAllJobs({ limit: REQ_LIMIT, offset: REQ_LIMIT * page });
  }, [page]);

  useEffect(() => {
    let list = jdList.slice();

    if (filters.companyName) {
      list = list.filter(job =>
        job.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      );
    }
    if (filters.roles.length > 0) {
      list = list.filter(job =>
        filters.roles.some(role =>
          job.jobRole.toLowerCase().includes(role.toLowerCase())
        )
      );
    }

    if (filters.minExperience || Number(filters.minExperience) === 0) {
      list = list.filter(job => {
        if (
          typeof filters.minExperience === 'number' &&
          Number(filters.minExperience) === 0
        ) {
          return Number(job.minExp) <= Number(filters.minExperience);
        }
        if (!filters.minExperience || (!job.minExp && !job.maxExp)) return true;

        if (!job.minExp && job.maxExp) {
          return Number(job.maxExp) <= Number(filters.minExperience);
        }
        return Number(job.minExp) <= Number(filters.minExperience);
      });
    }

    if (filters.location.length > 0) {
      list = list.filter(job => {
        return filters.location.some(location => {
          if (location.toLowerCase() === 'remote') {
            return job.location.toLowerCase().includes(location.toLowerCase());
          } else if (location.toLowerCase() === 'hybrid') {
            return true;
          } else {
            return job.location.toLowerCase() !== 'remote';
          }
        });
      });
    }

    if (filters.minSalary || Number(filters.minSalary) === 0) {
      list = list.filter(job => {
        if (
          typeof filters.minSalary === 'number' &&
          Number(filters.minSalary) === 0
        ) {
          return Number(job.minJdSalary) >= Number(filters.minSalary);
        }
        if (!filters.minSalary || (!job.minJdSalary && !job.maxJdSalary))
          return true;
        if (!job.minJdSalary && job.maxJdSalary) {
          return Number(job.maxJdSalary) >= Number(filters.minSalary);
        }
        return Number(job.minJdSalary) >= Number(filters.minSalary);
      });
    }

    setFilteredJdList(list);
  }, [
    filters.companyName,
    filters.location,
    filters.minExperience,
    filters.minSalary,
    filters.roles,
    jdList,
  ]);

  return (
    <div className="home-wrapper">
      <Typography variant="h4" className="heading">
        Candidate Application Platform
      </Typography>
      <Filter />
      <Stack className="job-section">
        {filteredJdList.map(job => (
          <JobCard jobInfo={job} key={job.jdUid} />
        ))}
        {isLoading && (
          <div className="spinner">
            <Spinner />
          </div>
        )}
      </Stack>
    </div>
  );
};
