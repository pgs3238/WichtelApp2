package Eventverwaltung.Teilnehmer.usecase;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Teilnehmer.entity.UserEventTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import java.util.Collection;

public interface ITeilnehmerFuerEvent {

    Collection<User> teilnehmerFuerEvent(EventTO event);
    Collection<UserEventTO> userEventsFuerEvent(int eventId);
}
