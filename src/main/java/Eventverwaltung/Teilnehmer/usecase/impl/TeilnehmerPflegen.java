package Eventverwaltung.Teilnehmer.usecase.impl;

import Eventverwaltung.Event.dao.EventDAO;
import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;
import Eventverwaltung.Teilnehmer.usecase.ITeilnehmerPflegen;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Set;
import java.util.stream.Collectors;

@Path("/teilnehmer")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TeilnehmerPflegen implements ITeilnehmerPflegen {

    @Inject
    Validator validator;

    @Inject
    EventDAO eventDAO;
    @Inject
    UserDAO userDAO;

//    @RolesAllowed({"admin", "owner"})
//    @POST
//    @Path("/einladen")
//    @Override
//    public Response teilnehmerEinladen(@QueryParam("email") String email, @QueryParam("eventID") int eventID) {
//        Event event = eventDAO.find(eventID);
//        User teilnehmer = userDAO.findUserByEmail(email);
//        if (teilnehmer != null && eventDAO.addUserToEvent(teilnehmer, event)) {
//            return Response.ok().build();
//        } else {
//            return Response.status(Response.Status.BAD_REQUEST).build();
//        }
//
//    }

//    @RolesAllowed({"admin", "owner"})
    @POST
    @Path("/einladen")
    @Override
    public Response teilnehmerEinladen(@QueryParam("email") String email, @QueryParam("eventID") int eventID) {
        Event event = eventDAO.find(eventID);
        if (event == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event nicht gefunden").build();
        }
        User teilnehmer = userDAO.findUserByEmail(email);

        if (teilnehmer == null) {

            UserTO userTO = new UserTO(email);

            Set<ConstraintViolation<UserTO>> violations = validator.validate(userTO, UserTO.OnPartCreate.class);

            if (!violations.isEmpty()) {

                // Collect all error messages into a single string (or a list)
                String errorMessage = violations.stream()
                        .map(ConstraintViolation::getMessage)
                        .collect(Collectors.joining(", "));

                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(errorMessage)
                        .build();
            }

            User aUser = new User();
            aUser = userTO.toUser();
            System.out.println("Hier");

            if (userDAO.save(aUser)) {
                return Response.ok().build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

        }

        if (teilnehmer != null && eventDAO.addUserToEvent(teilnehmer, event)) {
            return Response.ok("Teilnehmer erfolgreich eingeladen").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Teilnehmer konnte nicht zum Event hinzugefügt werden").build();
        }

    }

    @RolesAllowed({"admin", "owner"})
    @POST
    @Path("/ausladen")
    @Override
    public Response teilnehemerLoeschen(@QueryParam("email") String email,@QueryParam("eventID") int eventID) {
        Event event = eventDAO.find(eventID);
        User teilnehmer = userDAO.findUserByEmail(email);
        if (teilnehmer != null && eventDAO.removeUserFromEvent(teilnehmer, event)) {
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }


    }

}

