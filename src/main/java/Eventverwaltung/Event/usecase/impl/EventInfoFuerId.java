package Eventverwaltung.Event.usecase.impl;

import Eventverwaltung.Event.dao.EventDAO;
import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Event.usecase.IEventInfoFuerId;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;

//@Transactional
//@RequestScoped
public class EventInfoFuerId implements IEventInfoFuerId {

    @Inject
    EventDAO eventDAO;

    @RolesAllowed({"admin", "user", "owner"})
    @Override
    public EventTO getEventFuerId(int eventId){
        Event aEvent = eventDAO.find(eventId);
        return aEvent.toEventTO();
    }
}
