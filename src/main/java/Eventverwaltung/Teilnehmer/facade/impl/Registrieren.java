package Eventverwaltung.Teilnehmer.facade.impl;

import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;
import Eventverwaltung.Teilnehmer.facade.IRegistrieren;

import javax.inject.Inject;

public class Registrieren implements IRegistrieren {

    @Inject
    UserDAO userDAO;


    @SuppressWarnings("unused")
    @Override
    public boolean userLoeschen(String email) {
        User aUser = userDAO.findUserByEmail(email);
        /* TODO System.out.println("User "+aUser.getEmail()+" gefunden zum Loeschen"); */
        if (aUser == null) {
            return Boolean.FALSE;
        } else {
            userDAO.delete(aUser);
            return Boolean.TRUE;
        }
    }

    @Override
    public void userAnlegen(UserTO userTO) {
        User aUser = new User();
        aUser = userTO.toUser();
        userDAO.save(aUser);

    }

    @Override
    public void userSpeichern(UserTO userTO) {
        System.out.println(userTO.toString());

        User aUser = userDAO.find(userTO.getUserID());
        aUser.setVorname(userTO.getVorname());
        aUser.setName(userTO.getName());
        aUser.setEmail(userTO.getEmail());
        aUser.setPassword(userTO.getPasswort());

        userDAO.update(aUser);

    }
}
