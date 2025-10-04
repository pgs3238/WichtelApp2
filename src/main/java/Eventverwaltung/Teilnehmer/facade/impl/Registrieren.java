package Eventverwaltung.Teilnehmer.facade.impl;

import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;
import Eventverwaltung.Teilnehmer.facade.IRegistrieren;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/*
Register new User
with create user and delete user
 */
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
        //System.out.println("User "+aUser.getEmail()+" gefunden zum Loeschen");
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
    // @PermitAll
    @Override
    public boolean userSpeichern(@Valid UserTO userTO) {
        //System.out.println(userTO.toString());

        User aUser = userDAO.findUserByEmail(userTO.getEmail());
        aUser.setVorname(userTO.getVorname());
        aUser.setName(userTO.getName());
        aUser.setEmail(userTO.getEmail());
        aUser.setPassword(userTO.getPasswort());

       // System.out.println("Test1");

        boolean result = userDAO.update(aUser);

      //  System.out.println("Test2");

        return result;

    }
}
