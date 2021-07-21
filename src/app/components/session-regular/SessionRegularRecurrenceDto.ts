export class SessionRegularRecurrenceDto {
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;

  constructor(partial?: Partial<SessionRegularRecurrenceDto>) {
    Object.assign(this, partial || {});
  }
}
