package Eventverwaltung.Event.usecase.impl;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.internal.Event;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.SecurityContext;
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

