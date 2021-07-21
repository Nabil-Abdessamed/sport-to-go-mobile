const date = new Date();

export class SessionDto {
  sport = "";
  hasOtherSport = false;
  other = "";
  dateStartAt = date;
  dateExpireAt = date;
  timeStartAt = date;
  description = "";
  price = "";
  country = "";
  city = "";
  address = "";
  latitude = null;
  longitude = null;
  image = null;
  filetype = null;
  ext = null;
  places = 0;
  durationHours = 0;
  durationMinutes = 0;
  hasRecurrence = false;
  monday = false;
  tuesday = false;
  wednesday = false;
  thursday = false;
  friday = false;
  saturday = false;
  sunday = false;
}
