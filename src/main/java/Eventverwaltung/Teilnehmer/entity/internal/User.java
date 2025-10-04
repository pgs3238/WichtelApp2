package Eventverwaltung.Teilnehmer.entity.internal;

import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Event.entity.internal.Subgruppe;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.UserDefinition;
import io.quarkus.security.jpa.Username;
import org.hibernate.annotations.NamedQuery;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/*
Create User
Created tables
wichtel_user
wichtel_event_wichtel_user
wichtel_subgruppe_wichtel_user
 */
@Entity
@UserDefinition
@Table(name = "wichtel_user")
@NamedQuery(name= "User.findUserByEmail", query = "select u From User u Where u.email= :email")
//@NamedQuery(name = "User.findTeilnehmerVonEvent", query = "select ue.user from User_Event ue WHERE ue.event = :event")
@NamedQuery(name = "User.findTeilnehmnerVonEvent", query = "select u FROM User u, IN (u.event) e WHERE e.id=:id")
public class User {

    public static final String FIND_BY_EMAIL = "User.findUserByEmail";
    public static final String GET_TEILNEHMER_VON_EVENT = "User.findTeilnehmerVonEvent";

    @Password
    @Column(unique = true)
    private String password;

    @Id
    @Username
    private String email;
    private String name;
    private String vorname;
    @Roles @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<String>(List.of("user"));

    /*
    wichtel_event_wichtel_user
    All participants of a Wichtel
    //TODO Change this to add a value "radio" with start value = 0 -
       when email has been sent its turned to 1 -
       that way a check is in place, so that noone gets emails everytime the button is pressed
     */
    @ManyToMany(targetEntity = Event.class, fetch = FetchType.EAGER)
    @JoinTable(name = "wichtel_event_wichtel_user",
            joinColumns = @JoinColumn(name = "user_email"),
            inverseJoinColumns = @JoinColumn(name = "event_eventid"))
    private Set<Event> event = new HashSet<>();

    /*
    wichtel_subgruppe_wichtel_user
    All participants within a subgroup
     */
    @ManyToMany(targetEntity = Subgruppe.class, fetch = FetchType.EAGER)
    @JoinTable(name = "wichtel_subgruppe_wichtel_user",
            joinColumns = @JoinColumn(name = "user_email"),
            inverseJoinColumns = @JoinColumn(name = "subgruppe_subgruppeid"))
    private Set<Subgruppe> subgruppe = new HashSet<>();


    public User() {}

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

    public Set<Event> getEvent() {
        return event;
    }

    public void setEvent(Set<Event> event) {
        this.event = event;
    }

    public List<String> getRoles() { return roles; }

    public void setRoles(List<String> roles) { this.roles = roles; }





    public String getRole() {
        if (roles.contains("ADMIN")) {
            return "ADMIN";
        } else if (roles.contains("OWNER")) {
            return "OWNER";
        } else {
            return "USER";
        }
    }

    public void addRole(String role) {
        this.roles.add(role);
    }

    public void removeRole(String role) {
        this.roles.remove(role);
    }

    public Set<Subgruppe> getSubgruppe() {
        return subgruppe;
    }

    public void setSubgruppe(Set<Subgruppe> subgruppe) {
        this.subgruppe = subgruppe;
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
