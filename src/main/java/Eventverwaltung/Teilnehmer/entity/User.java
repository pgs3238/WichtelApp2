package Eventverwaltung.Teilnehmer.entity;

import org.hibernate.annotations.NamedQuery;

import javax.persistence.*;

@Entity
@Table(name = "wichtel_user")
@NamedQuery(name="User.findUserByName", query="select u From User u Where u.username= :username")



public class User {

    public static final String FIND_BY_NAME = "User.findUserByName";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(unique = true)
    private String username;
    private String password;

    public User() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public int hashCode() {
        return getId();
    }

    @Override
    public boolean equals(Object obj) {
        if(obj instanceof User) {
            User user = (User) obj;
            return user.username.equals(getUsername());
        }
        return false;
    }
}
