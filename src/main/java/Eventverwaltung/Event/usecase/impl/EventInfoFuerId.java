package Eventverwaltung.Event.usecase.impl;

import Eventverwaltung.Event.dao.EventDAO;
import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Event.usecase.IEventInfoFuerId;

import javax.inject.Inject;

public class EventInfoFuerId implements IEventInfoFuerId {

    @Inject
    EventDAO eventDAO;

    @Override
    public EventTO getEventFuerId(int eventId){
        Event aEvent = eventDAO.find(eventId);
        return aEvent.toEventTO();
    }
}
