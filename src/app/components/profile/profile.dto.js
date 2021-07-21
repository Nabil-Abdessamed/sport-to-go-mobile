export class ProfileDto {
  // avatar = "";
  fullname = "";
  phone = "";
  birthdate = new Date("2000-01-01");
  description = "";
  country = "";
  city = "";
  address = "";
  postalCode = "";
  latitude = null;
  longitude = null;
  emailVisible = true;
  phoneVisible = true;
  birthdateVisible = true;
  countryVisible = true;
  cityVisible = true;
  addressVisible = true;
  postalCodeVisible = true;
  locationVisible = true;

  constructor(partial = {}) {
    Object.assign(this, partial);
  }
}
