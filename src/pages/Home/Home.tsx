import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postRequest } from '@/config/request';
import { REQ_LIMIT } from '@/utils/constants';
import { JobResponse } from '@/types/type';
import { RootState } from '@/store/store';
import { addJobs } from '@/store/slice/jobSlice';
import { JobCard } from '@/components/JobCard/JobCard';
import { Loader } from '@/components/Loader';

import './Home.css';

export const Home = () => {
  const { jdList } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [page] = useState(1);
  const [filteredJdList, setFilteredJdList] = useState(jdList);

  const getAllJobs = async ({
    limit,
    offset,
  }: {
    offset: number;
    limit: number;
  }) => {
    const reqBody = JSON.stringify({
      offset,
      limit,
    });

    setIsLoading(true);

    try {
      const data: JobResponse = await postRequest({ reqBody });
      dispatch(addJobs(data));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs({ limit: REQ_LIMIT, offset: REQ_LIMIT * page });
  }, [page]);

  useEffect(() => {
    setFilteredJdList(jdList);
  }, [jdList]);

  return (
    <div className="home-wrapper">
      <Loader isLoading={isLoading}>
        <Stack className="job-section">
          {filteredJdList.map(job => (
            <JobCard jobInfo={job} key={job.jdUid} />
          ))}
        </Stack>
      </Loader>
    </div>
  );
};
