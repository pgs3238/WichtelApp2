package Eventverwaltung.Teilnehmer.usecase.impl;

import Eventverwaltung.Event.dao.EventDAO;
import Eventverwaltung.Event.dao.User_EventDAO;
import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Event.entity.internal.User_Event;
import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;
import Eventverwaltung.Teilnehmer.usecase.ITeilnehmerPflegen;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/teilnehmer")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TeilnehmerPflegen implements ITeilnehmerPflegen {

    @Inject
    User_EventDAO user_eventDAO;

    @Override
    public void teilnehmerAusEventEntfernen(UserTO teilnehmer, EventTO event){
        User_Event user_event = user_eventDAO.findOneResult(teilnehmer, event);
        user_eventDAO.delete(user_event);
    }

    @Override
    public void teilnehmerInEvent(UserTO teilnehmer, EventTO event){
        User_Event user_event = new User_Event(teilnehmer.toUser(), event.toEvent());
        user_eventDAO.save(user_event);
    }

    @Inject
    EventDAO eventDAO;
    @Inject
    UserDAO userDAO;

    @RolesAllowed({"admin", "owner"})
    @POST
    @Path("/einladen")
    @Override
    public Response teilnehmerEinladen(@QueryParam("email") String email, @QueryParam("eventID") int eventID) {
        Event event = eventDAO.find(eventID);
        User teilnehmer = userDAO.findUserByEmail(email);
        if (teilnehmer != null && eventDAO.addUserToEvent(teilnehmer, event)) {
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

    }

    @RolesAllowed({"admin", "owner"})
    @POST
    @Path("/ausladen")
    @Override
    public boolean teilnehemerLoeschen(@QueryParam("email") String email,@QueryParam("eventID") int eventID) {
        Event event = eventDAO.find(eventID);
        User teilnehmer = userDAO.findUserByEmail(email);
        if (teilnehmer == null) {
            return Boolean.FALSE;
        } else {
            eventDAO.removeUserFromEvent(teilnehmer, event);
            return Boolean.TRUE;
        }


    }

}
