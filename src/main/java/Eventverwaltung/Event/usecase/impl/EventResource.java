package Eventverwaltung.Event.usecase.impl;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.internal.Event;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

@Path("/api/events")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventResource {

    @Inject
    EntityManager em;

    @Context
    SecurityContext securityContext; // gives info about logged-in user

    @GET
    public List<EventTO> listEvents() {
        List<Event> events= em.createQuery("select e from Event e", Event.class).getResultList();
        return events.stream().map(Event::toEventTO).toList();
    }

    @GET
    @Path("/mine")
    @RolesAllowed({"user"})
    public List<EventTO> listMyEvents() {
        String userEmail = securityContext.getUserPrincipal().getName(); // currently logged in user

        List<Event> events = em.createNamedQuery("Event.findByOwner", Event.class)
                .setParameter("owner", userEmail)
                .getResultList();

        return events.stream().map(Event::toEventTO).toList();
    }
}
