export interface VoterData {
  serialNo: string;
  name: string;
  guardianName: string;
  houseNo: string;
  houseName: string;
  genderAge: string;
  secId: string;
  partNo: string;
}

export type SortField = 'name' | 'houseName' | 'serialNo';
export type SortOrder = 'asc' | 'desc';
