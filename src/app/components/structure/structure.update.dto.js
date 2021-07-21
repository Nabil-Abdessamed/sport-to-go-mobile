export class StructureUpdateDto {
  partnershipName = "";
  siretNumber = "";
  country = "";
  city = "";
  address = "";
  postalCode = "";
  website = "";
  constructor({
    partnershipName = "",
    siretNumber = "",
    partnershipType = "COACH",
    address = "",
    country = "",
    city = "",
    postalCode = "",
    website = ""
  }) {
    this.partnershipName = partnershipName;
    this.siretNumber = siretNumber;
    this.partnershipType = partnershipType;
    this.address = address;
    this.country = country;
    this.city = city;
    this.postalCode = postalCode;
    this.website = website;
  }
}
