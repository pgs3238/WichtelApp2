package Eventverwaltung.Event.dao;

import Eventverwaltung.Event.entity.internal.Subgruppe;
import Eventverwaltung.Teilnehmer.dao.GenericDAO;

import javax.inject.Inject;
import javax.persistence.EntityManager;

public class SubgruppeDAO extends GenericDAO<Subgruppe> {

    @Inject
    public SubgruppeDAO(EntityManager em){
        super(em, Subgruppe.class);
    }
}
