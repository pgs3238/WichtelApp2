package Eventverwaltung.Teilnehmer.usecase.impl;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.dao.UserEventDAO;
import Eventverwaltung.Teilnehmer.entity.UserEventTO;
import Eventverwaltung.Teilnehmer.usecase.ITeilnehmerFuerEvent;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.stream.Collectors;

@Path("/api/eventTeilnehmer")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TeilnehmerFuerEvent implements ITeilnehmerFuerEvent {

    @Inject
    UserDAO userDAO;

    @Inject
    UserEventDAO userEventDAO;

    @RolesAllowed({"admin", "owner"})
    @POST
    @Override
    public Collection<User> teilnehmerFuerEvent(EventTO event){
        Collection<User> users = userDAO.findTeilnehmerByEvent(event);
        return users;
    }

    @RolesAllowed({"user"})
    @GET
    @Path("/{eventId}")
    @Override
    public Collection<UserEventTO> userEventsFuerEvent(@PathParam("eventId") int eventId) {
        return userEventDAO.findByEventId(eventId)
                .stream()
                .map(ue -> new UserEventTO(
                        ue.getUser().getEmail(),
                        ue.getEvent().getEventId(),
                        ue.getRadio()
                ))
                .collect(Collectors.toList());
    }
}
