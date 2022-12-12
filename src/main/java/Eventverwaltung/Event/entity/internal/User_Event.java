package Eventverwaltung.Event.entity.internal;

/*
Diese Klasse dient dazu eine Beziehuing zwischen User und Event herzustellen
Es erstellt die Tabelle User_Event und legt Rollen eines Users in einem Event fest sowie
die Subgruppe zuteilen
 */

import Eventverwaltung.Teilnehmer.entity.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

@Entity
@Table(name = "wichtel_user_event")
@NamedQuery(name= "User_Event.teilnehmerFuerEventId", query = "select ue.user From User_Event ue Where ue.event= :event")
public class User_Event implements Serializable {

    public static final String GET_TEILNEHMER = "User_Event.teilnehmerFuerEventId";

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


}
