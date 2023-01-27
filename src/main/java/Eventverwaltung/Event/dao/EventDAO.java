package Eventverwaltung.Event.dao;

import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Teilnehmer.dao.GenericDAO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

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

    public Event find(int eventID){ return super.find(eventID); }

    public boolean addUserToEvent(User user, Event event){
        try {
            event.getUser().add(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean removeUserFromEvent(User user, Event event){
        event.getUser().remove(user);
        return update(event);
    }

}
