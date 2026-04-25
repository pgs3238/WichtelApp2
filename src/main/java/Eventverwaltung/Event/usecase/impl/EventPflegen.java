package Eventverwaltung.Event.usecase.impl;

import Eventverwaltung.Event.dao.EventDAO;
import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Event.usecase.IEventPflegen;
import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import java.util.List;

//@Transactional
//@RequestScoped
@Path("/events")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class EventPflegen implements IEventPflegen {

    @Inject
    EventDAO eventDAO;

    @Inject
    UserDAO userDAO;
    @Context
    SecurityContext securityContext;

    @RolesAllowed({"admin", "user", "owner"})
    @POST
    @Path("/create")
    @Override
    public Response eventAnlegen(@Valid EventTO eventTO){
        Event aEvent = new Event();
        aEvent = eventTO.toEvent();
        aEvent.setOwner(securityContext.getUserPrincipal().getName());
        if (eventDAO.save(aEvent)) {
            User user = userDAO.findUserByEmail(securityContext.getUserPrincipal().getName());
            user.getRoles().add("Event" + aEvent.getEventId());
            user.getRoles().add("owner");
            userDAO.update(user);
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @RolesAllowed({"admin", "owner"})
    @POST
    @Path("/update")
    @Override
    public boolean eventSpeichern(@Valid EventTO eventTO){
        Event aEvent = eventDAO.find(eventTO.getEventId());
        aEvent.setEventId(eventTO.getEventId());
        aEvent.setName(eventTO.getName());
        aEvent.setRegeln(eventTO.getRegeln());
        aEvent.setEventDate(eventTO.getEventDate());
        aEvent.setOrt((eventTO.getOrt()));
        aEvent.setDeadline(eventTO.getDeadline());

        boolean result = eventDAO.update(aEvent);

        return result;
    }

    @RolesAllowed({"admin", "owner"})
    @POST
    @Path("/delete")
    @Override
    public boolean eventLoeschen(int eventId){
        Event aEvent = eventDAO.find(eventId);
        if (aEvent == null) {
            return Boolean.FALSE;
        } else {
            eventDAO.delete(aEvent);
            return Boolean.TRUE;
        }

    }

    @GET
    @Path("/allEvents")
    public Response Events() {
        List<EventTO> events = eventDAO.findAll().stream().map(Event::toEventTO).toList();
        if(events.isEmpty()){
            return Response.noContent().build();
        }
        return Response.ok(events).build();
    }

}

