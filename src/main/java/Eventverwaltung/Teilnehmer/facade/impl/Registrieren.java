package Eventverwaltung.Teilnehmer.facade.impl;

import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;
import Eventverwaltung.Teilnehmer.facade.IRegistrieren;

import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Set;
import java.util.stream.Collectors;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class Registrieren implements IRegistrieren {

    @Inject
    Validator validator;

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

//    @POST
//    @Path("/register")
//    @Override
//    public Response userAnlegen(@Valid UserTO userTO) {
//        User aUser = new User();
//        aUser = userTO.toUser();
//        System.out.println("Hier");
//
//        if (userDAO.save(aUser)) {
//            return Response.ok().build();
//        } else {
//            return Response.status(Response.Status.BAD_REQUEST).build();
//        }
////        try {
////            userDAO.save(aUser);
////            return Response.ok().build();
////        } catch (Exception e) {
////            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
////        }
//    }

    @POST
    @Path("/register")
    @Override
    public Response userAnlegen(UserTO userTO) {

        Set<ConstraintViolation<UserTO>> violations = validator.validate(userTO, UserTO.OnCreate.class);

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
//        try {
//            userDAO.save(aUser);
//            return Response.ok().build();
//        } catch (Exception e) {
//            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
//        }
    }

    @POST
    @Path("/registerUnregistered")
    @Override
    public Response unregistriertenUserAnlegen(UserTO userTO) {

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
//        try {
//            userDAO.save(aUser);
//            return Response.ok().build();
//        } catch (Exception e) {
//            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
//        }
    }


    @POST
    @Override
    public boolean userSpeichern(@Valid UserTO userTO) {
        User aUser = userDAO.findUserByEmail(userTO.getEmail());
        if (aUser == null) {
            aUser = new User();
        }
        aUser.setVorname(userTO.getVorname());
        aUser.setName(userTO.getName());
        aUser.setEmail(userTO.getEmail());
        aUser.setPassword(userTO.getPasswort());
        boolean result = userDAO.update(aUser);
        return result;

    }
}

