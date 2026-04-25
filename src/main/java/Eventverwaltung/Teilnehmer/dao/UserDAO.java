package Eventverwaltung.Teilnehmer.dao;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Transactional
@RequestScoped
public class UserDAO extends GenericDAO<User> {

    @Inject
    public UserDAO(EntityManager em) {
        super(em, User.class);
    }

    public User findUserByEmail(String email) {
        return em.find(User.class,email);
    }


    public void delete(User aUser) {
        super.delete(aUser.getEmail(), User.class);
    }



    public Collection<User> findTeilnehmerByEvent(EventTO eventTO){
        Map<String, Object> eventParameter = new HashMap<>();
        eventParameter.put("event",eventTO.toEvent());

        return super.findListResult(User.GET_TEILNEHMER_VON_EVENT,eventParameter);
    }



}

