package Eventverwaltung.Teilnehmer.dao;

import Eventverwaltung.Teilnehmer.entity.User;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;


@Transactional
@RequestScoped
public class UserDAO extends GenericDAO<User> {

    public UserDAO() {
        super(User.class);
    }

    public User findUserByEmail(String email) {
        Map<String, Object> parameters = new HashMap<String, Object>();
        System.out.println("Email: "+email);
        parameters.put("email", email);

        return super.findOneResult(User.FIND_BY_EMAIL, parameters);
    }

}
