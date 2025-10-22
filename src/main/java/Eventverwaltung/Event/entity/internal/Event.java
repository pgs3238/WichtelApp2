package Eventverwaltung.Event.entity.internal;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;

//TODO Clean up unused named queries when testing has finished

@Entity
@Table(name = "wichtel_event")
@NamedQuery(name = "User.Event", query = "select owner FROM User owner join Event we on owner.email=we.owner WHERE we.id=:id")
@NamedQuery(name = "User.Event.teilnehmer", query = "select u FROM User u, IN (u.event) e WHERE e.id=:id")
@NamedQuery(name = "Event.findByOwner", query = "SELECT e FROM Event e WHERE e.owner = :owner")
//@NamedQuery(name = "AlleEvents", query = "select '*' FROM wichtel_event")
//@NamedQuery(name = "User.Event.unregteilnehmer", query = "select u FROM User u, Event e WHERE u in e.user")
public class Event implements Serializable {

    public static final String GET_EVENTOWNER = "User.Event";
    public static final String GET_USERS = "User.Event.teilnehmer";
    public static final String GET_GASTE = "User.Event.unregteilnehmer";
    public static final String GET_SUBSIZE = "User.Event.grupsize";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "eventseq")
    private int EventId;
    private String name;
    private String regeln;
    private LocalDateTime deadline;

    private String ort;
    private LocalDateTime eventDate;


    @JoinColumn(referencedColumnName = "email", nullable = false, table = "wichtel_user")
    private String owner;

    @OneToMany(targetEntity = Subgruppe.class, cascade=CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Subgruppe> subgruppen;

    @ManyToMany(mappedBy = "event", targetEntity = User.class, fetch = FetchType.EAGER)
    private Set<User> user = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private Map<String, String> partner = new HashMap<>();

    public Event(int eventId, String name, String regeln, LocalDateTime deadline, String ort, LocalDateTime eventDate, String owner) {
        EventId = eventId;
        this.name = name;
        this.regeln = regeln;
        this.deadline = deadline;
        this.ort = ort;
        this.eventDate = eventDate;
        this.owner = owner;
    }


    public Event(){

    }


    public EventTO toEventTO(){
        EventTO eventTO = new EventTO();

        eventTO.setEventId(this.EventId);
        eventTO.setName(this.name);
        eventTO.setRegeln(this.regeln);
        eventTO.setEventDate(this.eventDate);
        eventTO.setOrt(this.ort);
        eventTO.setDeadline(this.deadline);
        eventTO.setOwner(this.owner);
        return eventTO;
    }

    public int getEventId() {
        return EventId;
    }

    public void setEventId(int eventId) {
        EventId = eventId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRegeln() { return regeln; }

    public void setRegeln(String regeln) {
        this.regeln = regeln;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public String getOrt() {
        return ort;
    }

    public void setOrt(String ort) {
        this.ort = ort;
    }

    public List<Subgruppe> getSubgruppen() {
        return subgruppen;
    }

    public void setSubgruppen(List<Subgruppe> subgruppen) {
        this.subgruppen = subgruppen;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public Set<User> getUser() {
        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }

    public Map<String, String> getPartner() {
        return partner;
    }

    public void setPartner(Map<String, String> partner) {
        this.partner = partner;
    }


}
