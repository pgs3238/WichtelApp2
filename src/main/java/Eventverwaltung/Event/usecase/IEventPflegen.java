package Eventverwaltung.Event.usecase;

import Eventverwaltung.Event.entity.EventTO;

import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;

public interface IEventPflegen {
    public Response eventAnlegen(@Valid EventTO eventTO);

    public boolean eventSpeichern(@Valid EventTO eventTO);

    public boolean eventLoeschen(int eventId);
}

