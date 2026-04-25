package Eventverwaltung.Teilnehmer.dao;


import Eventverwaltung.Teilnehmer.entity.internal.UserEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import java.util.List;

@ApplicationScoped
public class UserEventDAO {

    @Inject
    EntityManager em;

    public List<UserEvent> findByEventId(int eventId) {
        TypedQuery<UserEvent> query = em.createQuery(
                "SELECT ue FROM UserEvent ue WHERE ue.id.eventId = :eventId",
                UserEvent.class
        );
        query.setParameter("eventId", eventId);
        return query.getResultList();
    }
}

