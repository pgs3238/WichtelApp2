package Eventverwaltung.Event.usecase.impl;

import Eventverwaltung.Event.dao.EventDAO;
import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Event.usecase.IEventPflegen;

import javax.inject.Inject;

public class EventPflegen implements IEventPflegen {

    @Inject
    EventDAO eventDAO;

    @Override
    public void eventAnlegen(EventTO eventTO){
        Event aEvent = new Event();
        aEvent = eventTO.toEvent();
        eventDAO.save(aEvent);
    }

    @Override
    public void eventSpeichern(EventTO eventTO){
        Event aEvent = eventDAO.find(eventTO.getEventId());
        aEvent.setEventId(eventTO.getEventId());
        aEvent.setName(eventTO.getName());
        aEvent.setRegeln(eventTO.getRegeln());
        aEvent.setEventDate(eventTO.getEventDate());
        aEvent.setDeadline(eventTO.getDeadline());

        eventDAO.update(aEvent);
    }

    @Override
    public void eventLoeschen(EventTO eventTO){
        eventDAO.delete(eventTO.toEvent());
    }

}
