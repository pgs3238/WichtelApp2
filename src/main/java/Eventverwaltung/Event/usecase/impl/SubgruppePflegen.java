package Eventverwaltung.Event.usecase.impl;

import Eventverwaltung.Event.dao.SubgruppeDAO;
import Eventverwaltung.Event.entity.SubgruppeTO;
import Eventverwaltung.Event.entity.internal.Subgruppe;
import Eventverwaltung.Event.usecase.ISubgruppePflegen;

import javax.inject.Inject;

public class SubgruppePflegen implements ISubgruppePflegen {

    @Inject
    SubgruppeDAO subgruppeDAO;

    @Override
    public void subgruppeAnlegen(SubgruppeTO subgruppeTO){
        Subgruppe aSubgruppe = new Subgruppe();
        aSubgruppe = subgruppeTO.toSubgruppe();
        subgruppeDAO.save(aSubgruppe);
    }
}
