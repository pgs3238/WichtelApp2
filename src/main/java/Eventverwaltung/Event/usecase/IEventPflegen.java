package Eventverwaltung.Event.usecase;

import Eventverwaltung.Event.entity.EventTO;

public interface IEventPflegen {
    void eventAnlegen(EventTO eventTO);

    void eventSpeichern(EventTO eventTO);

    void eventLoeschen(EventTO eventTO);
}
