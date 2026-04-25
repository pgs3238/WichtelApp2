package Eventverwaltung.Event.dao;

import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Teilnehmer.dao.GenericDAO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

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
            if (event.getPartner().size() > 0) {
                return false;
            }
            event.getUser().add(user);
            user.getEvent().add(event);
            em.merge(user);

            return update(event);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean removeUserFromEvent(User user, Event event){
        try {
            if (event.getPartner().size() > 0) {
                return false;
            }
            event.getUser().remove(user);
            user.getEvent().remove(event);
            em.merge(user);
            return update(event);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}

