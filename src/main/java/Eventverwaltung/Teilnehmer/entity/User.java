package Eventverwaltung.Teilnehmer.entity;

import org.hibernate.annotations.NamedQuery;

import javax.persistence.*;

@Entity
@Table(name = "wichtel_user")
@NamedQuery(name= "User.findUserByEmail", query = "select u From User u Where u.email= :email")



public class User {

    public static final String FIND_BY_EMAIL = "User.findUserByEmail";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(unique = true)
    private String password;
    private String email;

    public User() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    @Override
    public int hashCode() {
        return getId();
    }

    @Override
    public boolean equals(Object obj) {
        if(obj instanceof User) {
            User user = (User) obj;
            return user.email.equals(getEmail());
        }
        return false;
    }
}
