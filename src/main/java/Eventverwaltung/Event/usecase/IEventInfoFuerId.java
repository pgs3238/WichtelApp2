package Eventverwaltung.Event.usecase;

import Eventverwaltung.Event.entity.EventTO;

public interface IEventInfoFuerId {
    EventTO getEventFuerId(int eventId);
}
