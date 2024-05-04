export interface JobInfo {
  companyName: string;
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp: number | null;
  maxJdSalary: number;
  minExp: number | null;
  minJdSalary: number | null;
  salaryCurrencyCode: string;
}

export interface JobResponse {
  jdList: JobInfo[];
  totalCount: number;
}
