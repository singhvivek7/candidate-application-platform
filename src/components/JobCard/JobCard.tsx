import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { JobInfo } from '@/types/type';
import { capitalize } from '@/utils/helperFunction';

import './JobCard.css';

interface Props {
  jobInfo: JobInfo;
}

export const JobCard = ({
  jobInfo: {
    companyName,
    jdLink,
    jobDetailsFromCompany,
    jobRole,
    location,
    logoUrl,
    maxExp,
    maxJdSalary,
    minJdSalary,
    minExp,
    salaryCurrencyCode,
  },
}: Props) => {
  const [open, setOpen] = useState(false);
  const descriptionElementRef = useRef<HTMLElement>(null);

  const salary = [];
  const exp = [];

  if (minJdSalary) {
    salary.push(minJdSalary);
  }
  if (maxJdSalary) {
    salary.push(maxJdSalary);
  }

  if (minExp) {
    exp.push(minExp);
  }
  if (maxExp) {
    exp.push(maxExp);
  }

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        className="dialog"
        open={open}
        onClose={() => setOpen(false)}
        scroll="paper"
        aria-labelledby="job-description-title"
        aria-describedby="job-description-description">
        <DialogTitle id="job-description-title" className="title">
          Job Description
        </DialogTitle>
        <DialogContent dividers>
          <div className="line-item">
            <Typography variant="body1">About Company:</Typography>
            <Typography variant="body1">
              {companyName} - {capitalize(location)}
            </Typography>
          </div>
          <DialogContentText
            id="job-description-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className="line-item">
            <Typography variant="body1"> About Role:</Typography>
            <Typography variant="body1">{jobDetailsFromCompany}</Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Card className="job-card">
        <CardHeader
          avatar={
            <Avatar aria-label="logo" src={logoUrl}>
              {companyName.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={
            <Typography className="title" color="text.secondary">
              {companyName}
            </Typography>
          }
          subheader={
            <>
              <Typography variant="body2" color="text.secondary">
                {capitalize(jobRole)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="location">
                {capitalize(location)}
              </Typography>
            </>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" className="salary">
            Estimated Salary: {salaryCurrencyCode} {salary.join(' - ')} LPA
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {jobDetailsFromCompany.slice(0, 400)}
          </Typography>
          <Stack className="show-more-button-wrapper">
            <Button
              className="show-more-button"
              onClick={() => setOpen(true)}
              variant="text">
              Show more
            </Button>
          </Stack>
        </CardContent>

        <CardActions className="actions">
          <Stack sx={{ width: '100%' }}>
            {exp.length > 0 && (
              <>
                <Typography color="text.secondary" className="min-exp-text">
                  Minimum Experience
                </Typography>
                <Typography>{exp.join(' - ')} years</Typography>
              </>
            )}
            <Button
              href={jdLink}
              target="_blank"
              aria-label="easy apply"
              variant="contained"
              className="button">
              ⚡ Easy Apply
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};
