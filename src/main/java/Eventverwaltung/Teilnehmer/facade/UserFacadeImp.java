package Eventverwaltung.Teilnehmer.facade;

import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.User;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

//@Stateless in Quarkus =
@Transactional
@RequestScoped
public class UserFacadeImp implements IUserFacade {

    @Inject
    private UserDAO userDAO;

    @Override
    public User findUserByEmail(String email) {
        return userDAO.findUserByEmail(email);
    }
}
