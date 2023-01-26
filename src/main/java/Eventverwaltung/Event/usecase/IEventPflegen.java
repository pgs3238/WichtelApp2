package Eventverwaltung.Event.usecase;

import Eventverwaltung.Event.entity.EventTO;

import javax.ws.rs.core.Response;

public interface IEventPflegen {
    public Response eventAnlegen(EventTO eventTO);

    public boolean eventSpeichern(EventTO eventTO);

    public boolean eventLoeschen(int eventId);
}
