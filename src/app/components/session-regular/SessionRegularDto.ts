export default class SessionRegularDto {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  places?: number;
  country?: string;
  city?: string;
  address?: string;
  dateStartAt?: any;
  dateExpireAt?: any;
  monday?: boolean;
  mondayTimeStart?: string;
  mondayTimeEnd?: string;
  tuesday?: boolean;
  tuesdayTimeStart?: string;
  tuesdayTimeEnd?: string;
  wednesday?: boolean;
  wednesdayTimeStart?: string;
  wednesdayTimeEnd?: string;
  thursday?: boolean;
  thursdayTimeStart?: string;
  thursdayTimeEnd?: string;
  friday?: boolean;
  fridayTimeStart?: string;
  fridayTimeEnd?: string;
  saturday?: boolean;
  saturdayTimeStart?: string;
  saturdayTimeEnd?: string;
  sunday?: boolean;
  sundayTimeStart?: string;
  sundayTimeEnd?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userEmail?: string;
  userFullname?: string;
  userPartnershipName?: string;
  userPartnershipType?: string;
  userId?: number;
  fileId?: number;
  filename?: string;
  filePath?: string;
  fileHeight?: number | string;
  fileWidth?: number | string;
  fileIsVertical?: boolean;
  latitude?: number;
  longitude?: number;

  constructor(partial?: Partial<SessionRegularDto>) {
    Object.assign(this, partial || {});
  }
}
