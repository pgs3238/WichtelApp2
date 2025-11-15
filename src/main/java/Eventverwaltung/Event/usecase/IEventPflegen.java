package Eventverwaltung.Event.usecase;

import Eventverwaltung.Event.entity.EventTO;

import javax.validation.Valid;
import javax.ws.rs.core.Response;

public interface IEventPflegen {
    public Response eventAnlegen(@Valid EventTO eventTO);

    public boolean eventSpeichern(@Valid EventTO eventTO);

    public boolean eventLoeschen(int eventId);
}
