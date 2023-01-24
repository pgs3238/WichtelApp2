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

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

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

    @POST
    @Path("/einladen")
    @Override
    public boolean teilnehmerEinladen(@QueryParam("email") String email,@QueryParam("eventID") int eventID) {
        Event event = eventDAO.find(eventID);
        User teilnehmer = userDAO.findUserByEmail(email);
        return eventDAO.addUserToEvent(teilnehmer, event);

    }

    @POST
    @Path("/ausladen")
    @Override
    public boolean teilnehemerLoeschen(@QueryParam("email") String email,@QueryParam("eventID") int eventID) {
        Event event = eventDAO.find(eventID);
        User teilnehmer = userDAO.findUserByEmail(email);
        return eventDAO.removeUserFromEvent(teilnehmer, event);
    }

}
