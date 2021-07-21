import lodash from "lodash";

const date1 = new Date();
const date2 = new Date();
date2.setHours(date2.getHours() + 1);

const itemType = {
  value: false,
  timeStartAt: date1,
  timeEndAt: date2,
  error: false,
};

export class Days {
  sunday = lodash.clone(itemType);
  monday = lodash.clone(itemType);
  tuesday = lodash.clone(itemType);
  wednesday = lodash.clone(itemType);
  thursday = lodash.clone(itemType);
  friday = lodash.clone(itemType);
  saturday = lodash.clone(itemType);
}
