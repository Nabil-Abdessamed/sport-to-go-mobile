export class StructureDto {
  fullname = "";
  email = "";
  password = "";
  phone = "+33";
  type = "PRO";
  partnershipName = "";
  siretNumber = "";
  partnershipType = "COACH";
  country = "";
  city = "";
  address = "";
  postalCode = "";
  website = "";
  partnership = "partnership1";
  partnership5 = false;
  partnership6 = false;
  chargeId = "";
  contractFile = "";
  contractName = "";
  registrationType = "PAID";
  freeCodeId = null;
  constructor({
    fullname = "",
    email = "",
    password = "",
    phone = "+33",
    type = "PRO",
    partnershipName = "",
    siretNumber = "",
    partnershipType = "COACH",
    address = "",
    country = "",
    city = "",
    postalCode = "",
    website = "",
    partnership = "partnership1",
    partnership5 = false,
    partnership6 = false,
    chargeId = "",
    contractFile = "",
    contractName = "",
    registrationType = "PAID",
    freeCodeId = null,
  }) {
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.type = type;
    this.partnershipName = partnershipName;
    this.siretNumber = siretNumber;
    this.partnershipType = partnershipType;
    this.address = address;
    this.country = country;
    this.city = city;
    this.postalCode = postalCode;
    this.website = website;
    this.partnership = partnership;
    this.partnership5 = partnership5;
    this.partnership6 = partnership6;
    this.chargeId = chargeId;
    this.contractFile = contractFile;
    this.contractName = contractName;
    this.registrationType = registrationType;
    this.freeCodeId = freeCodeId;
  }
}