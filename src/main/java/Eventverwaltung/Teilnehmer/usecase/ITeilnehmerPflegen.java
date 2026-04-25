package Eventverwaltung.Teilnehmer.usecase;

import jakarta.ws.rs.core.Response;

public interface ITeilnehmerPflegen {

    Response teilnehmerEinladen(String email, int eventID);

    Response teilnehemerLoeschen(String email, int eventID);
}

