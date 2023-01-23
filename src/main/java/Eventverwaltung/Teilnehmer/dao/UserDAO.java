package Eventverwaltung.Teilnehmer.dao;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
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
        Map<String, Object> parameters = new HashMap<>();
        System.out.println("Email: "+email);
        parameters.put("email", email);

        return super.findOneResult(User.FIND_BY_EMAIL, parameters);
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
