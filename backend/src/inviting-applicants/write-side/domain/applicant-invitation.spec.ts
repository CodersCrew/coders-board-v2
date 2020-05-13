import {TimeProviderPort} from '../../../shared-kernel/write-side/domain/time-provider.port';
import {SystemTimeProvider} from '@coders-board-library/time-provider/system-time-provider';
import {PersonalEmail} from './personal-email.valueobject';
import {FirstName} from './first-name.value-object';
import {LastName} from './last-name.value-object';
import {ApplicantInvitation} from './applicant-invitation.aggregate-root';
import {ApplicantInvitationId} from './applicant-invitation-id.valueobject';
import {ApplicantInvitationDomainEvent} from './applicant-invitation.domain-event';
import ApplicantInvited = ApplicantInvitationDomainEvent.ApplicantInvited;
import InvitationCancelled = ApplicantInvitationDomainEvent.InvitationCancelled;
import {expectDomainEvent} from '../../../shared-kernel/write-side/domain/aggregate-root.test-utils';
import InvitingApplicantFailed = ApplicantInvitationDomainEvent.InvitingApplicantFailed;
import CancelingApplicantInvitationFailed = ApplicantInvitationDomainEvent.CancelingApplicantInvitationFailed;

const person = {
  janKowalski: {
    personalEmail: PersonalEmail.from('jan.kowalski@gmail.com'),
    firstName: FirstName.from('Jan'),
    lastName: LastName.from('Kowalski'),
  },
};

describe('Feature: Applicant invitation', () => {
  const timeProvider: TimeProviderPort = new SystemTimeProvider();
  const applicantInvitationId = ApplicantInvitationId.generate();
  let applicantInvitation: ApplicantInvitation;

  beforeEach(() => {
    applicantInvitation = new ApplicantInvitation(timeProvider);
  });

  describe('Scenario: Invite applicant for the first time', () => {
    describe('Given: An applicant to invite', () => {
      describe('When: Try to invite an applicant', () => {
        beforeEach(() => {
          applicantInvitation.invite(applicantInvitationId, {
            ...person.janKowalski,
          });
        });

        it('Then: The applicant should be invited', () => {
          expectDomainEvent(applicantInvitation, {
            type: ApplicantInvited,
            data: {...person.janKowalski},
          });
        });
      });
    });
  });

  describe('Scenario: Invite applicant once more', () => {
    describe('Given: An applicant which was invited', () => {
      beforeEach(() => {
        applicantInvitation.loadFromHistory([
          ApplicantInvited.newFrom(
              applicantInvitationId,
              timeProvider.currentDate(),
              {...person.janKowalski},
          ),
        ]);
      });

      describe('When: Try to invite an applicant', () => {

        beforeEach(() => {
          applicantInvitation.invite(applicantInvitationId, {
            ...person.janKowalski,
          });
        });

        it('Then: The applicant should not be invited', () => {
          expectDomainEvent(applicantInvitation, {
            type: InvitingApplicantFailed,
            data: {reason: 'Applicant already invited!'},
          });
        });
      });


    });
  });

  describe('Scenario: Cancel invitation', () => {
    describe('Given: An applicant which was invited', () => {
      beforeEach(() => {
        applicantInvitation.loadFromHistory([
          ApplicantInvited.newFrom(
              applicantInvitationId,
              timeProvider.currentDate(),
              {...person.janKowalski},
          ),
        ]);
      });

      describe('When: Try to cancel invitation', () => {
        beforeEach(() => {
          applicantInvitation.cancel();
        });

        it('Then: The applicant invitation should be cancelled', () => {
          expectDomainEvent(applicantInvitation, {
            type: InvitationCancelled,
            data: {},
          });
        });

        describe('When: Try to cancel cancelled invitation', () => {
          beforeEach(() => {
            applicantInvitation.cancel();
          });

          it('Then: The applicant invitation should not be cancelled once more', () => {
            expectDomainEvent(applicantInvitation, {
              type: CancelingApplicantInvitationFailed,
              data: {reason: 'Applicant invitation already cancelled!'},
            });
          });

        })

      });
    });
  });
});
