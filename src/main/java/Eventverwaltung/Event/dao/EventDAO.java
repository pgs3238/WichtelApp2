package Eventverwaltung.Event.dao;

import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Teilnehmer.dao.GenericDAO;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Transactional
@ApplicationScoped
public class EventDAO extends GenericDAO<Event> {

    @Inject
    public EventDAO(EntityManager em){
        super(em, Event.class);
    }

    public void delete(Event event){
        super.delete(event.getEventId(),Event.class);
    }

    public Event find(int eventid){ return super.find(eventid); }
}
