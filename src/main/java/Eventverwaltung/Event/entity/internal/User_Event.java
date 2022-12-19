package Eventverwaltung.Event.entity.internal;

/*
Diese Klasse dient dazu eine Beziehuing zwischen User und Event herzustellen
Es erstellt die Tabelle User_Event und legt Rollen eines Users in einem Event fest sowie
die Subgruppe zuteilen
 */

import Eventverwaltung.Teilnehmer.entity.internal.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

@Entity
@Table(name = "wichtel_user_event")
@NamedQuery(name = "User_Event.UserEventFuerUserUndEvent", query = "select ue FROM User_Event ue where ue.event = :event and ue.user = :user")
@NamedQuery(name = "User_Event.teilnehmerUndInfoFuerEventId", query = "select ue From User_Event ue Where ue.event= :event")
public class User_Event implements Serializable {

    public static final String GET_USEREVENT = "User_Event.UserEventFuerUserUndEvent";
    public static final String GET_TEILNEHMERINFO = "User_Event.teilnehmerUndInfoFuerEventId";

    public User_Event() {
    }

    public User_Event(User user, Event event, String rolle) {
        this.user = user;
        this.event = event;
        this.rolle = rolle;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int user_event_id;

    @ManyToOne
    @JoinColumn(name = "user_FK")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_FK")
    private Event event;

    @ManyToOne
    private Subgruppe subgruppe;

    @ManyToOne
    private User wichtel;

    @Column(name = "rolle")
    private String rolle;

    public int getUser_event_id() {
        return user_event_id;
    }

    public void setUser_event_id(int user_event_id) {
        this.user_event_id = user_event_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Subgruppe getSubgruppe() {
        return subgruppe;
    }

    public void setSubgruppe(Subgruppe subgruppe) {
        this.subgruppe = subgruppe;
    }

    public User getWichtel() {
        return wichtel;
    }

    public void setWichtel(User wichtel) {
        this.wichtel = wichtel;
    }

    public String getRolle() {
        return rolle;
    }

    public void setRolle(String rolle) {
        this.rolle = rolle;
    }
}
