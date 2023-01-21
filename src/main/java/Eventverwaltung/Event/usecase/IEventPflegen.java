package Eventverwaltung.Event.usecase;

import Eventverwaltung.Event.entity.EventTO;

public interface IEventPflegen {
    public void eventAnlegen(EventTO eventTO);

    public void eventSpeichern(EventTO eventTO);

    public void eventLoeschen(EventTO eventTO);
}
