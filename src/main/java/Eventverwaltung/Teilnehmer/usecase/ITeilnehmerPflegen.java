package Eventverwaltung.Teilnehmer.usecase;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Teilnehmer.entity.UserTO;

import javax.ws.rs.core.Response;

public interface ITeilnehmerPflegen {
    void teilnehmerAusEventEntfernen(UserTO teilnehmer, EventTO event);

    void teilnehmerInEvent(UserTO teilnehmer, EventTO event);

    Response teilnehmerEinladen(String email, int eventID);

    boolean teilnehemerLoeschen(String email, int eventID);
}
