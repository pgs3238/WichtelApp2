package Eventverwaltung.Teilnehmer.facade.impl;

import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;
import Eventverwaltung.Teilnehmer.facade.IRegistrieren;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class Registrieren implements IRegistrieren {

    @Inject
    UserDAO userDAO;

    @POST
    @Path("/delete")
    @SuppressWarnings("unused")
    @Override
    public boolean userLoeschen(String email) {
        User aUser = userDAO.findUserByEmail(email);
        if (aUser == null) {
            return Boolean.FALSE;
        } else {
            userDAO.delete(aUser);
            return Boolean.TRUE;
        }
    }


    @POST
    @Path("/register")
    @Override
    public Response userAnlegen(@Valid UserTO userTO) {
        User aUser = new User();
        aUser = userTO.toUser();
        System.out.println("Hier");

        if (userDAO.save(aUser)) {
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @POST
    @Override
    public boolean userSpeichern(@Valid UserTO userTO) {
        User aUser = userDAO.findUserByEmail(userTO.getEmail());
        aUser.setVorname(userTO.getVorname());
        aUser.setName(userTO.getName());
        aUser.setEmail(userTO.getEmail());
        aUser.setPassword(userTO.getPasswort());
        boolean result = userDAO.update(aUser);
        return result;

    }
}

