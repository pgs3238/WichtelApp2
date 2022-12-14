package Eventverwaltung.Teilnehmer.usecase;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Teilnehmer.entity.UserTO;

public interface ITeilnehmerPflegen {
    void teilnehmerAusEventEntfernen(UserTO teilnehmer, EventTO event);

    void teilnehmerInEvent(UserTO teilnehmer, EventTO event);
}
