package Eventverwaltung.Event.dao;

import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Teilnehmer.dao.GenericDAO;

public class EventDAO extends GenericDAO<Event> {

    public EventDAO(){
        super(Event.class);
    }

    public void delete(Event event){
        super.delete(event.getEventId(),Event.class);
    }

    public void save(Event event){
        super.save(event);
    }
}
