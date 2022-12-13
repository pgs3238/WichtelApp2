package Eventverwaltung.Event.usecase;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import java.util.Collection;

public interface ITeilnehmerFuerEvent {
    Collection<User> teilnehmerFuerEventId(EventTO event);
}
