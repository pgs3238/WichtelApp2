package Eventverwaltung.Teilnehmer.facade.impl;

import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;
import Eventverwaltung.Teilnehmer.facade.IRegistrieren;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


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
    public boolean userLoeschen(@QueryParam("nummer") @Positive int nummer) {
        User aUser = userDAO.find(nummer);
       //  TODO System.out.println("User "+aUser.getEmail()+" gefunden zum Loeschen");
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
        System.out.println(userTO.toString());

        User aUser = userDAO.find(userTO.getUserID());
        aUser.setVorname(userTO.getVorname());
        aUser.setName(userTO.getName());
        aUser.setEmail(userTO.getEmail());
        aUser.setPassword(userTO.getPasswort());

        System.out.println("Test1");

        boolean result = userDAO.update(aUser);

        System.out.println("Test2");

        return result;

    }
}
