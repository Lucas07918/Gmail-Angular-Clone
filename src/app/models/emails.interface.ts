export interface Emails {
  id: number;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
  sent: boolean;
  favorited: boolean;
  deleted: boolean;
}
