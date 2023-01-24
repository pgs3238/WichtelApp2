package Eventverwaltung.Event.usecase.impl;

import Eventverwaltung.Event.dao.SubgruppeDAO;
import Eventverwaltung.Event.entity.SubgruppeTO;
import Eventverwaltung.Event.entity.internal.Subgruppe;
import Eventverwaltung.Event.usecase.ISubgruppePflegen;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/subgruppen")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class SubgruppePflegen implements ISubgruppePflegen {

    @Inject
    SubgruppeDAO subgruppeDAO;

    @POST
    @Path("/create")
    @Override
    public void subgruppeAnlegen(SubgruppeTO subgruppeTO){
        Subgruppe aSubgruppe = subgruppeTO.toSubgruppe();
        subgruppeDAO.save(aSubgruppe);
    }

    /*public void subgruppeLoeschen(SubgruppeTO subgruppeTO){
        Subgruppe aSubgruppe = subgruppeTO.toSubgruppe();
        subgruppeDAO.delete(aSubgruppe);
    }*/
}
