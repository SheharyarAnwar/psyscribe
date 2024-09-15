export interface ISession {
  _id: string;
  clientId: string;
  sessionDate: string;
  sessionTime: string;
  sessionType: string;
  createdAt: Date;
  updatedAt: Date;

  // Add other session properties as needed
}

export interface IClient {
  _id: string;
  firstName: string;
  lastName: string;
  createdBy: string;
  sessions: ISession[];
}
