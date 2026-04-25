package Eventverwaltung.Event.dao;

import Eventverwaltung.Event.entity.internal.Subgruppe;
import Eventverwaltung.Teilnehmer.dao.GenericDAO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Transactional
@ApplicationScoped
public class SubgruppeDAO extends GenericDAO<Subgruppe> {

    @Inject
    public SubgruppeDAO(EntityManager em){
        super(em, Subgruppe.class);
    }

    public boolean addUserToSubgruppe(User user, Subgruppe subgruppe){
        try {
            subgruppe.getUser().add(user);
            user.getSubgruppe().add(subgruppe);
            em.merge(user);
            return update(subgruppe);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean removeUserFromSubgruppe(User user, Subgruppe sub){
        sub.getUser().remove(user);
        return update(sub);
    }
}

