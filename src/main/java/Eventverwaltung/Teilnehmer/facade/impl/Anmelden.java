package Eventverwaltung.Teilnehmer.facade.impl;

import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.internal.User;
import Eventverwaltung.Teilnehmer.facade.IAnmelden;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

//@Stateless in Quarkus =
@Transactional
@RequestScoped
public class Anmelden implements IAnmelden {

    @Inject
    private UserDAO userDAO;

    @Override
    public User findUserByEmail(String email) {
        return userDAO.findUserByEmail(email);
    }

}

