package Eventverwaltung.Teilnehmer.dao;

import Eventverwaltung.Teilnehmer.entity.internal.UnregisteredUser;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Transactional
@RequestScoped
public class UnregisteredUserDAO extends GenericDAO<UnregisteredUser> {

    @Inject
    public UnregisteredUserDAO(EntityManager em) {
        super(em, UnregisteredUser.class);
    }

    public UnregisteredUser findByEmail(String email) {
        return em.find(UnregisteredUser.class, email);
    }

    public void delete(UnregisteredUser unregisteredUser) {
        super.delete(unregisteredUser.getEmail(), UnregisteredUser.class);
    }
}
