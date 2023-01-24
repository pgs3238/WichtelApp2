package Eventverwaltung.Teilnehmer.usecase.impl;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.usecase.ITeilnehmerFuerEvent;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Collection;

@Path("/eventTeilnehmer")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TeilnehmerFuerEvent implements ITeilnehmerFuerEvent {

    @Inject
    UserDAO userDAO;

    @POST
    @Override
    public Collection<User> teilnehmerFuerEvent(EventTO event){
        Collection<User> users = userDAO.findTeilnehmerByEvent(event);
        return users;
    }
}
