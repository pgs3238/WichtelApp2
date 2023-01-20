package Eventverwaltung.Teilnehmer.entity.internal;

import Eventverwaltung.Teilnehmer.entity.UserTO;
import org.hibernate.annotations.NamedQuery;

import javax.persistence.*;

@Entity
@Table(name = "wichtel_user")
@NamedQuery(name= "User.findUserByEmail", query = "select u From User u Where u.email= :email")
@NamedQuery(name = "User.findTeilnehmerVonEvent", query = "select ue.user from User_Event ue WHERE ue.event = :event")
public class User {

    public static final String FIND_BY_EMAIL = "User.findUserByEmail";
    public static final String GET_TEILNEHMER_VON_EVENT = "User.findTeilnehmerVonEvent";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(unique = true)
    private String password;
    private String email;
    private String name;
    private String vorname;


    public User() {}

    public User(int id, String password, String email, String name, String vorname) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.name = name;
        this.vorname = vorname;
    }

    //Fehler da UserTO eine abstract class ist (warte auf rückfrage)
    public UserTO toUserTO() {
        //    UserTO userTO = new UserTO(this.id,this.name,this.vorname,this.email,this.password);
        return null;
    }

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

    private String getName() { return name; }

    public void setName(String name) { this.name = name; }

    private String getVorname() { return vorname; }

    public void setVorname(String vorname) { this.vorname = vorname; }


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
