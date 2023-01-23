package Eventverwaltung.Teilnehmer.entity.internal;

import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.UserDefinition;
import io.quarkus.security.jpa.Username;
import org.hibernate.annotations.NamedQuery;

import javax.persistence.*;

@Entity
@UserDefinition
@Table(name = "wichtel_user")
@NamedQuery(name= "User.findUserByEmail", query = "select u From User u Where u.email= :email")
@NamedQuery(name = "User.findTeilnehmerVonEvent", query = "select ue.user from User_Event ue WHERE ue.event = :event")
public class User {

    public static final String FIND_BY_EMAIL = "User.findUserByEmail";
    public static final String GET_TEILNEHMER_VON_EVENT = "User.findTeilnehmerVonEvent";

    /*@Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "userseq")
    private Integer id;*/

    @Password
    @Column(unique = true)
    private String password;

    @Id
    @Username
    private String email;
    private String name;
    private String vorname;
    @Roles
    private String role = "user";


    public User() {}

    /*public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }*/

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = BcryptUtil.bcryptHash(password);
    }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    private String getName() { return name; }

    public void setName(String name) { this.name = name; }

    private String getVorname() { return vorname; }

    public void setVorname(String vorname) { this.vorname = vorname; }


    /*@Override
    public int hashCode() {
        return getId();
    }*/

    @Override
    public boolean equals(Object obj) {
        if(obj instanceof User) {
            User user = (User) obj;
            return user.email.equals(getEmail());
        }
        return false;
    }
}
