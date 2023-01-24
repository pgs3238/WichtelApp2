package Eventverwaltung.Event.dao;

import Eventverwaltung.Event.entity.internal.Subgruppe;
import Eventverwaltung.Teilnehmer.dao.GenericDAO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Transactional
@ApplicationScoped
public class SubgruppeDAO extends GenericDAO<Subgruppe> {

    @Inject
    public SubgruppeDAO(EntityManager em){
        super(em, Subgruppe.class);
    }

    public boolean addUserToSubgruppe(User user, Subgruppe sub){
        sub.getUsers().add(user);
        return update(sub);
    }

    public boolean removeUserFromSubgruppe(User user, Subgruppe sub){
        sub.getUsers().remove(user);
        return update(sub);
    }
}
