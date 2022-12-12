package Eventverwaltung.Event.dao;

import Eventverwaltung.Event.entity.internal.Subgruppe;
import Eventverwaltung.Teilnehmer.dao.GenericDAO;

public class SubgruppeDAO extends GenericDAO<Subgruppe> {

    public SubgruppeDAO(){
        super(Subgruppe.class);
    }

    @Override
    public void save(Subgruppe subgruppe) {
        super.save(subgruppe);
    }
}
