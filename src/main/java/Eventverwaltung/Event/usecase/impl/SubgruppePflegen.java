package Eventverwaltung.Event.usecase.impl;

import Eventverwaltung.Event.dao.EventDAO;
import Eventverwaltung.Event.dao.SubgruppeDAO;
import Eventverwaltung.Event.entity.SubgruppeTO;
import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Event.entity.internal.Subgruppe;
import Eventverwaltung.Event.usecase.ISubgruppePflegen;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

//TODO do i want to keep the function to remove subgroups? Rename Subgroups?

@Path("/subgruppen")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class SubgruppePflegen implements ISubgruppePflegen {

    @Inject
    SubgruppeDAO subgruppeDAO;
    @Inject
    EventDAO eventDAO;

    @RolesAllowed({"admin", "owner"})
    @POST
    @Path("/create")
    @Override
    public Response subgruppeAnlegen(SubgruppeTO subgruppeTO) {
        Subgruppe aSubgruppe = subgruppeTO.toSubgruppe();
        if (subgruppeDAO.save(aSubgruppe)) {
            Event event = eventDAO.find(aSubgruppe.getEventID());
            event.getSubgruppen().add(aSubgruppe);
            eventDAO.update(event);

            return Response.ok().build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

    }

    /*public void subgruppeLoeschen(SubgruppeTO subgruppeTO){
        Subgruppe aSubgruppe = subgruppeTO.toSubgruppe();
        subgruppeDAO.delete(aSubgruppe);
    }*/
}

